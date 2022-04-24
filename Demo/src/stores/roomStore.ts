import { observable, action, runInAction, computed } from 'mobx';
import QNRTC, {
  QNConnectionState, QNTrack as RTCTrack,
  QNRemoteUser as RTCUser,
  QNRTCClient,
  QNRemoteTrack,
  QNConnectionDisconnectedInfo,
  QNConnectionDisconnectedReason,
  QNLocalTrack,
  QNRemoteVideoTrack,
  QNRemoteAudioTrack,
  QNLocalAudioTrackStats,
  QNLocalVideoTrackStats,
  QNScreenVideoTrack,
  QNLocalAudioTrack,
  QNLocalVideoTrack,
  QNVideoOptimizationMode
} from "qnweb-rtc";
import userStore from './userStore';
import { RTC_APP_ID } from '../common/api';
import User from '../models/User';
import Track from '../models/Track';
import groupBy from 'lodash/groupBy';
import routerStore from './routerStore';
import { getToken } from '../common/api';
import { publishVideoConfigs, videoConfig } from '../common/config';
import store from 'store';
import { matchPath } from "react-router";
import messageStore from './messageStore';

const match = matchPath<{ roomid: string; }>(window.location.pathname, {
  path: "/room/:roomid",
  exact: true,
  strict: false
});

export enum TrackCreateMode {
  "A" = "音频通话",
  "B" = "音视频通话",
  "C" = "音视频通话 + 屏幕共享",
  "D" = "屏幕共享 + 系统声音"
}

export class RoomStore {

  /** session.roomName */
  @observable
  public id: string = match && match.params.roomid || '';

  /** session.roomToken */
  @observable
  public token: string = '';

  /** appid */
  @observable
  public appId: string = RTC_APP_ID;

  /** 前后置摄像头 */
  @observable
  public facingMode: 'environment' | 'user' = 'user';

  /** 房间中的用户 */
  @observable.deep
  public users: Map<string, User> = new Map();

  /** 已选择要采集的 Track配置 */
  @observable
  public selectedTrackCreateMode: TrackCreateMode = TrackCreateMode.B;

  @observable
  public videoDeviceId?: string = undefined;

  @observable
  public audioDeviceId?: string = undefined;

  /** 已选择的清晰度 */
  @observable
  public selectVideoConfig: keyof publishVideoConfigs = '480p';

  /** 已发布的 Track */
  @observable.deep
  public publishedTracks: Map<string, Track> = new Map();

  /** 已订阅的 Track Map */
  @observable.deep
  public subscribedTracks: Map<string, Track> = new Map();

  /** 当前房间连接状态 */
  @observable
  public state: QNConnectionState = QNConnectionState.DISCONNECTED;

  /** 已发布的 AudioTrack */
  @computed
  public get publishedAudioTracks(): Track[] {
    return Array.from(this.publishedTracks.values())
      .filter(v => v.rtcTrack.isAudio());
  }

  /** 已发布的 VideoTrack(Camera) */
  @computed
  public get publishedCameraTracks(): Track[] {
    return Array.from(this.publishedTracks.values())
      .filter(v => v.rtcTrack.tag === 'camera');
  }

  /** 已发布的 VideoTrack(Screen) */
  public get publishedScreenTracks(): Track[] {
    return Array.from(this.publishedTracks.values())
      .filter(v => v.rtcTrack.tag === 'screen');
  }

  @action
  public setSelectedTrackCreateMode(mode: TrackCreateMode) {
    this.selectedTrackCreateMode = mode;
  }

  /** 切换已发布的 VideoTrack(Camera) Mute状态 */
  @action.bound
  public toggleMutePublishedCamera() {
    this.publishedCameraTracks.forEach(track => track.toggleMute());
  }

  /** 切换已发布的 VideoTrack(Screen) Mute状态 */
  @action.bound
  public toggleMutePublishedScreen() {
    this.publishedScreenTracks.forEach(track => track.toggleMute());
  }

  /** 切换前后置摄像头 */
  @action.bound
  public async toggleCameraFacingMode() {
    this.setFaceingMode(this.facingMode === 'user' ? 'environment' : 'user');
    await this.unpublish();
    const rtcTracks = await this.getSelectTracks();
    console.log("update video facingMode repub:", rtcTracks);
    await this.publish(rtcTracks);
  }
  /** 切换已发布的 AudioTrack Mute状态 */
  @action.bound
  public toggleMutePublishedAudio() {
    this.publishedAudioTracks.forEach(track => track.toggleMute());
  }

  /** 当前发布 Track 的实时状态，每隔 1 秒更新 */
  @observable
  public publishTracksReport: {
    audio: QNLocalAudioTrackStats | null;
    video: QNLocalVideoTrackStats | null;
    screen: QNLocalVideoTrackStats | null;
  } = { audio: null, video: null, screen: null };


  /** client */
  public session: QNRTCClient;

  /** 房间内已发布的 Tracks */
  public remoteTracks: Map<string, QNRemoteTrack> = new Map();

  /** 采集的 sdk 中的 Track 离开房间释放用 */
  public localTracks: QNLocalTrack[] = [];

  private statusInterval?: number;

  /** 播放失败的 tracks 存到这里，后续引导点击播放 */
  @observable
  public shouldResumedTracks: Track[] = [];

  @computed
  public get showResumePlayDialog(): boolean {
    return this.shouldResumedTracks.length !== 0;
  }

  constructor() {
    this.session = QNRTC.createClient();
    this.session.on('connection-state-changed', this.setState);
    this.session.on('user-joined', this.addUser);
    this.session.on('user-left', this.removeUser);
    // this.session.on('mute-tracks', this.updateTracksMute);

    const selectVideoConfig = store.get('selectVideoConfig') as keyof publishVideoConfigs;
    if (selectVideoConfig) {
      this.selectVideoConfig = selectVideoConfig;
    }

    const storeAppId = store.get("qnrtnAppID");
    if (storeAppId) {
      this.setAppId(storeAppId);
    }
    window.onbeforeunload = () =>  {
      try {
        this.leaveRoom();
      } catch {}
    }
  }

  @action
  setFaceingMode(type: 'user' | 'environment') {
    this.facingMode = type;
  }

  @action.bound
  addShouldResumedTracks(track: Track) {
    this.shouldResumedTracks.push(track);
  }

  @action
  clearShouldResumedTracks() {
    this.shouldResumedTracks = [];
  }

  @action.bound
  playShouldResumedTracks() {
    for (const t of this.shouldResumedTracks) {
      if (t.rtcTrack && t.rtcTrack.mediaElement) {
        t.rtcTrack.mediaElement.play();
      }
    }
    this.clearShouldResumedTracks();
  }
  
  @action
  public setId(roomId: string) {
    this.id = roomId;
  }

  @action
  public setToken(token: string) {
    this.token = token;
  }

  @action
  public setLocalTracks(tracks: QNLocalTrack[]) {
    this.localTracks = tracks;
  }

  @action
  public async fetchRoomToken(): Promise<string> {
    const userid = userStore.id;
    if (!userid || !this.id) return '';

    const token: string = await getToken(this.appId, this.id, userid);
    runInAction(() => {
      this.token = token;
    });
    return token;
  }

  @action.bound
  public setAppId(appid: string, isStore?: boolean) {
    this.appId = appid;
    if (isStore) {
      store.set("qnrtnAppID", appid);
    }
  }

  @action.bound
  public setState(state: QNConnectionState, info?: QNConnectionDisconnectedInfo): void {
    this.state = state;

    if (state !== QNConnectionState.DISCONNECTED) return;
    if (!info) return;
    switch (info.reason) {
      case QNConnectionDisconnectedReason.LEAVE: {
        return;
      }
      case QNConnectionDisconnectedReason.KICKED_OUT: {
        this.leaveRoom();
        messageStore.showAlert({
          show: true,
          title: '断开连接',
          content: `被踢出房间`,
        });
        return;
      }
      case QNConnectionDisconnectedReason.ERROR: {
        this.leaveRoom();
        messageStore.showAlert({
          show: true,
          title: '断开连接',
          content: `错误： ErrorCode: ${info.errorCode}, ErorMessage: ${info.errorMessage}`,
        });
        return;
      }
    }
  }

  @action.bound
  public async setVideoDeviceId(deviceId: string) {
    this.videoDeviceId = deviceId;
    await this.unpublish();
    // this.releaseLocalTracks()
    const rtcTracks = await this.getSelectTracks();
    console.log("update video deviceid repub:", rtcTracks);
    await this.publish(rtcTracks);
  }

  @action.bound
  public async setAudioDeviceId(deviceId: string) {
    this.audioDeviceId = deviceId;
    await this.unpublish();
    // this.releaseLocalTracks()
    const rtcTracks = await this.getSelectTracks();
    console.log("update audio deviceid repub:", rtcTracks);
    await this.publish(rtcTracks);
  }

  @action.bound
  private addUser(userID: string): void {
    const rtcuser = this.session.getRemoteUser(userID);
    if (!rtcuser) return;
    if (this.users.has(rtcuser.userID)) return;
    this.users.set(rtcuser.userID, new User(rtcuser));
  }

  @action.bound
  private removeUser(userID: string): void {
    this.users.delete(userID);
  }

  @action.bound
  private addTracks(userID: string, tracks: QNRemoteTrack[]): void {
    if (this.users.has(userID)) {
      const user = this.users.get(userID) as User;
      for (const track of tracks) {
        user.addPublishedTrack(track);
        this.remoteTracks.set(track.trackID as string, track);
      }
    }
    this.subscribe(tracks.map(v => v.trackID) as string[]);
  }

  @action.bound
  private removeTracks(userID: string, tracks: QNRemoteTrack[]): void {
    if (this.users.has(userID)) {
      const user = this.users.get(userID) as User;
      for (const track of tracks) {
        user.removePublishedTrack(track);
        user.tracks.delete(track.trackID as string);
        this.remoteTracks.delete(track.trackID as string);
      }
    }
  }

  @action
  public async joinRoom(token: string = this.token, userData?: string, role?: string): Promise<void> {
    if (role !== "live-streaming") {
      this.session.on('user-published', this.addTracks);
      this.session.on('user-unpublished', this.removeTracks);
    }
    this.subscribedTracks.clear();
    this.remoteTracks.clear();
    this.users.clear();

    if (!token) return;
    await this.session.join(token, userData);
    // this.setAppId(this.session.appId as string);
    userStore.setIdNoStore(this.session.userID as string);
    if (this.id !== this.session.roomName) {
      runInAction(() => {
        this.id = this.session.roomName as string;
      });
    }
  }

  @action
  public async publish(tracks: QNLocalTrack[] = []): Promise<void> {
    try {
      await this.session.publish(tracks);
      runInAction(() => {
        for (const track of tracks) {
          if (track.trackID) this.publishedTracks.set(track.trackID, new Track(track));
        }
      });
      if (this.statusInterval) {
        window.clearInterval(this.statusInterval);
      }
      this.statusInterval = window.setInterval(this.updateTrackStatusReport, 1000);
    } catch (e) {
      tracks.map(t => t.destroy());
      throw e;
    }
  }

  @action
  public async unpublish(): Promise<void> {
    const tracks = Array.from(this.publishedTracks.values()).map(t => (t.rtcTrack as QNLocalTrack));
    await this.session.unpublish(tracks);
    tracks.forEach(t => t.destroy());
    this.publishedTracks.clear();
  }

  @action.bound
  public setSelectVideoConfig(config: keyof publishVideoConfigs) {
    this.selectVideoConfig = config;
    store.set('selectVideoConfig', config);
  }

  @action
  public async getSelectTracks(): Promise<QNLocalTrack[]> {
    const vConfig = videoConfig.find(c => c.key === this.selectVideoConfig);
    if (!vConfig) throw new Error("Invalid video config: " + this.selectVideoConfig);

    let tracks: QNLocalTrack[] = [];
    switch (this.selectedTrackCreateMode) {
      // 音频通话
      case TrackCreateMode.A: {
        tracks = [await QNRTC.createMicrophoneAudioTrack({ tag: "microphone", microphoneId: this.audioDeviceId })];
        break;
      }
      // 音视频通话
      case TrackCreateMode.B: {
        tracks = await QNRTC.createMicrophoneAndCameraTracks(
          { tag: "microphone", microphoneId: this.audioDeviceId },
          {
            tag: "camera",
            cameraId: this.videoDeviceId,
            facingMode: this.facingMode,
            encoderConfig: {
              width: vConfig.config.video!.width,
              height: vConfig.config.video!.height,
              frameRate: vConfig.config.video!.frameRate,
              bitrate: vConfig.config.video!.bitrate
            }
          }
        );
        break;
      }
      // 音视频 + 屏幕共享
      case TrackCreateMode.C: {
        tracks = [
          ...await QNRTC.createMicrophoneAndCameraTracks(
            { tag: "microphone", microphoneId: this.audioDeviceId },
            {
              tag: "camera",
              cameraId: this.videoDeviceId,
              facingMode: this.facingMode,
              encoderConfig: {
                width: vConfig.config.video!.width,
                height: vConfig.config.video!.height,
                frameRate: vConfig.config.video!.frameRate,
                bitrate: vConfig.config.video!.bitrate
              }
            }
          ),
          (await QNRTC.createScreenVideoTrack({
            encoderConfig: "1080p",
            screenVideoTag: "screen",
            optimizationMode: QNVideoOptimizationMode.DETAIL
          }) as QNScreenVideoTrack)
        ];
        break;
      }
      // 屏幕共享 + 系统声音
      case TrackCreateMode.D: {
        const ts = await QNRTC.createScreenVideoTrack({ 
          encoderConfig: "1080p",
          optimizationMode: QNVideoOptimizationMode.DETAIL,
          screenAudioTag: "system-audio", 
          screenVideoTag: "screen" 
        }, "auto");
        if (Array.isArray(ts)) {
          tracks = ts;
        } else {
          tracks = [ts];
        }
        break;
      }
    }

    this.handleTrackEnded(tracks);
    this.setLocalTracks([...this.localTracks, ...tracks]);
    return tracks;
  }

  @action
  public handleTrackEnded = async (tracks: QNLocalTrack[]) => {
    for (const track of tracks) {
      if (track.tag === "microphone") {
        track.on("ended", async () => {
          const tracks = [await QNRTC.createMicrophoneAudioTrack({ tag: "microphone" })];
          this.handleTrackEnded(tracks);
          this.setLocalTracks([...this.localTracks, ...tracks]);
          this.publish(tracks);
        });
      }
    }
  }

  /** 订阅 */
  @action
  public async subscribe(trackids: string[]): Promise<void> {
    let targetTracks: QNRemoteTrack[] = [];
    trackids.forEach(trackID => {
      const targetTrack = this.remoteTracks.get(trackID);
      if (targetTrack) {
        targetTracks.push(targetTrack);
      }
    });
    let innerfunc;
    const removePromise = new Promise<RTCTrack[]>((resovle, reject) => {
      innerfunc = (_: string, tracks: QNRemoteTrack[]) => {
        for (const track of tracks) {
          if (trackids.includes((track.trackID as string))) {
            const error = new Error('订阅失败，订阅的track已移除');
            reject(error);
          }
        }
      };
      this.session.on('user-unpublished', innerfunc);
    });
    try {
      const rtctracks = await Promise.race([removePromise, this.session.subscribe(targetTracks)]);
      if (innerfunc) {
        this.session.off('user-unpublished', innerfunc);
      }
      if (Array.isArray(rtctracks)) return;

      runInAction(() => {
        for (const rtctrack of [...rtctracks.videoTracks, ...rtctracks.audioTracks]) {
          const track = new Track(rtctrack);
          this.subscribedTracks.set(rtctrack.trackID as string, track);
          const user = this.users.get(rtctrack.userID as string);
          if (user) {
            user.tracks.set(rtctrack.trackID as string, track);
          }
        }
      });
    } catch (e) {
      console.warn(e);
      throw e;
    }
  }

  /** 取消订阅 */
  @action
  public async unsubscribe(trackids: string[]): Promise<void> {
    let targetTracks: QNRemoteTrack[] = [];
    trackids.forEach(trackID => {
      const targetTrack = this.remoteTracks.get(trackID);
      if (targetTrack) {
        targetTracks.push(targetTrack);
      }
    });
    await this.session.unsubscribe(targetTracks);
    runInAction(() => {
      for (const trackid of trackids) {
        const track = this.subscribedTracks.get(trackid);
        if (!track) { return; }
        this.subscribedTracks.delete(trackid);
        const user = this.users.get(track.userID as string);
        if (!user) { return; }
        user.tracks.delete(trackid);
      }
    });
  }

  @action
  releaseLocalTracks(): void {
    if (this.localTracks.length === 0) return;
    this.localTracks.forEach(t => {
      t.destroy();
    });
    this.localTracks = [];
  }

  /** 离开房间触发，释放所有房间内的 Track */
  @action
  public async leaveRoom(): Promise<void> {
    this.releaseLocalTracks();
    this.publishedTracks.forEach(t => (t.rtcTrack as QNLocalTrack).destroy());
    this.publishedTracks.clear();
    this.subscribedTracks.clear();
    this.remoteTracks.clear();
    this.users.clear();
    this.token = '';
    this.id = '';
    if (this.statusInterval) clearInterval(this.statusInterval);
    this.session.leave();
    routerStore.push('/');
  }

  // /** 每隔 1 秒获取当前发布 Track 的状态 */
  @action.bound
  private updateTrackStatusReport(): void {
    const publishedTracksList = Array.from(this.publishedTracks.values());

    const audioTrack = publishedTracksList.find(t => t.rtcTrack.isAudio());
    const videoTrack = publishedTracksList.find(t => t.tag === "camera");
    const screenTrack = publishedTracksList.find(t => t.tag === "screen");

    this.publishTracksReport.audio = null;
    if (audioTrack) {
      this.publishTracksReport.audio = (audioTrack.rtcTrack as QNLocalAudioTrack).getStats();
    }

    this.publishTracksReport.video = null;
    if (videoTrack) {
      this.publishTracksReport.video = (videoTrack.rtcTrack as QNLocalVideoTrack).getStats()[0];
    }

    this.publishTracksReport.screen = null;
    if (screenTrack) {
      this.publishTracksReport.screen = (screenTrack.rtcTrack as QNLocalVideoTrack).getStats()[0];
    }
  }

}

export default new RoomStore();
