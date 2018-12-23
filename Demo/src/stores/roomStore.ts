import { observable, action, runInAction } from 'mobx';
import {
  TrackModeSession,
  RoomState,
  User as RTCUser,
  Track as RTCTrack,
  TrackBaseInfo,
  RecordConfig,
  deviceManager,
} from 'pili-rtc-web';
import userStore from './userStore';
import { RTC_APP_ID } from '../common/api';
import User from '../models/User';
import Track from '../models/Track';
import groupBy from 'lodash/groupBy';
import routerStore from './routerStore';
import { getToken } from '../common/api';
import { PublishRecordOptions, publishVideoConfigs, videoConfig } from '../common/config';
import store from 'store';
import { matchPath } from "react-router";

const match = matchPath<{roomid:string}>(window.location.pathname, {
  path: "/room/:roomid",
  exact: true,
  strict: false
});

export class RoomStore {

  @observable
  public id: string = match && match.params.roomid || '';

  @observable
  public token: string = '';

  @observable
  public appId: string = RTC_APP_ID;

  @observable.deep
  public users: Map<string, User> = new Map();

  public selectTracks: (RecordConfig | undefined)[] = [];

  @observable
  public selectVideoConfig: keyof publishVideoConfigs = '480p';

  @observable.deep
  public publishedTracks: Map<string, Track> = new Map();

  @observable.deep
  public subscribedTracks: Map<string, Track> = new Map();

  @observable
  public state: RoomState = RoomState.Idle;

  public session: TrackModeSession = new TrackModeSession();

  public publishedTrackInfos: Map<string, TrackBaseInfo> = new Map();

  constructor() {
    this.session.on('room-state-change', this.setState);
    this.session.on('user-join', this.addUser);
    this.session.on('user-leave', this.removeUser);
    this.session.on('track-add', this.addTracks);
    this.session.on('track-remove', this.removeTracks);
    this.session.on('mute-tracks', this.updateTracksMute);
    this.session.on("disconnect", this.handleDisconnect);
    this.selectTracks[1] = PublishRecordOptions[1].config;
    this.selectTracks[0] = PublishRecordOptions[0].config;
    const selectVideoConfig = store.get('selectVideoConfig') as keyof publishVideoConfigs;
    if (selectVideoConfig) {
      this.selectVideoConfig = selectVideoConfig;
    }
    window.onbeforeunload = () => this.leaveRoom();
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
  public async fetchRoomToken(): Promise<string> {
    const userid = userStore.id;
    if (!userid || !this.id) return '';

    const token: string = await getToken(this.appId, this.id, userid);
    runInAction(() => {
      this.token = token;
    })
    return token;
  }

  @action.bound
  public setAppId(appid: string) {
    this.appId = appid
  }

  @action.bound
  public setState(state: RoomState): void {
    console.log("room state change", state);
    this.state = state;
  }

  @action.bound
  private addUser(user: RTCUser): void {
    if (this.users.has(user.userId)) return;
    this.users.set(user.userId, new User(user));
  }

  @action.bound
  private removeUser(user: RTCUser): void {
    this.users.delete(user.userId);
  }

  @action.bound
  private addTracks(tracks: TrackBaseInfo[]): void {
    const groupTracks = groupBy(tracks, 'userId');
    for (const userid of Object.keys(groupTracks)) {
      const tracks = groupTracks[userid];
      if (this.users.has(userid)) {
        const user = this.users.get(userid) as User;
        for (const track of tracks) {
          user.addPublishedTrackInfo(track);
          this.publishedTrackInfos.set(track.trackId as string, track);
        }
      }
    }
    this.subscribe(tracks.map( v => v.trackId) as string[]);
  }

  @action.bound
  private removeTracks(tracks: TrackBaseInfo[]): void {
    const groupTracks = groupBy(tracks, 'userId');
    for(const userid of Object.keys(groupTracks)) {
      const tracks = groupTracks[userid];
      if (this.users.has(userid)) {
        const user = this.users.get(userid) as User;
        for (const track of tracks) {
          const trackid = track.trackId;
          if (!trackid) return;
          user.tracks.delete(trackid)
          user.removePublishedTrackInfo(track);
          this.publishedTrackInfos.delete(trackid);
        }
      }
    }
  }


  @action.bound
  private updateTracksMute(tracks: any): void {
    for (const track of tracks) {
      const subTrack = this.subscribedTracks.get(track.trackId);
      if (subTrack) {
        console.log("set subTrack mute", subTrack, track.muted);
        subTrack.muted = track.muted;
        const user = this.users.get(subTrack.userId as string);
        if (user) {
          user.updateTrack(subTrack.trackId, subTrack);
        }
      }
    }
  }

  @action.bound
  private syncUserList(users: RTCUser[]): void {
    for (const userid of this.users.keys()) {
      if(!users.find((user) => user.userId === userid)) {
        this.users.delete(userid);
      }
    }
    for (const user of users) {
      if (!this.users.has(user.userId)) {
        this.users.set(user.userId, new User(user));
      }
      for (const track of user.publishedTrackInfo) {
        this.publishedTrackInfos.set(track.trackId as string, track);
      }
    }
  }

  @action
  public async joinRoom(token: string = this.token): Promise<void> {
    this.publishedTracks.forEach(t => t.rtcTrack.release());
    this.publishedTracks.clear();
    this.subscribedTracks.clear();
    this.publishedTrackInfos.clear();
    this.users.clear();
    if (!token) return;
    const users = await this.session.joinRoomWithToken(token);
    userStore.setId(this.session.userId as string);
    if (this.id !== this.session.roomName) {
      runInAction(() => {
        this.id = this.session.roomName as string;
      });
    }
    this.syncUserList(users);
  }

  @action
  public async publish(tracks: RTCTrack[] = []): Promise<void> {
    try {
      await this.session.publish(tracks);
      runInAction(() => {
        for (const track of tracks) {
          if (track.info.trackId) this.publishedTracks.set(track.info.trackId, new Track(track));
        }
      })
    } catch (e) {
      tracks.map(t => t.release());
      throw e;
    }
  }

  @action
  public muteTracks(trackids: string[], muted: boolean) {
    this.session.muteTracks(trackids.map(trackId =>({
      trackId,
      muted,
    })));
    for (const trackid of trackids) {
      const track = this.publishedTracks.get(trackid);
      if (!track) continue;
      track.updateTrack();
    }
  }
  @action.bound
  public setSelectVideoConfig(config: keyof publishVideoConfigs) {
    this.selectVideoConfig = config;
    store.set('selectVideoConfig', config);
  }

  @action
  public async unpublish(): Promise<void> {
    const tracks: string[] = Array.from(this.publishedTracks.keys());
    await this.session.unpublish(tracks);
    this.publishedTracks.forEach(t => t.rtcTrack.release());
    this.publishedTracks.clear();
  }

  @action 
  public async publishSelected(): Promise<void> {
    const tracks: RTCTrack[] = [];
    let videoCount = 0;
    let audioCount = 0;
    for (const config of this.selectTracks) {
      if (config) {
        if (config.video) {
          Object.assign(config.video, (videoConfig.find(v => v.key === this.selectVideoConfig) || videoConfig[0]).config.video )
        }
        const [ track ] = await deviceManager.getLocalTracks(config);
        if (track.info.kind === 'video' && videoCount === 0) {
          track.setMaster(true);
          videoCount++;
        }
        if (track.info.kind === 'audio' && audioCount === 0) {
          track.setMaster(true);
          audioCount++;
        }
        if (config.audio && config.audio.buffer) {
          track.setAudioBuffer((config.audio as any).audioBuffer as AudioBuffer);
          track.playAudioBuffer(true);
        }
        tracks.push(track);
      }
    }
    await this.publish(tracks);
  }

  @action
  public async subscribe(trackids: string[]): Promise<void> {
    let innerfunc ;
    const removePromise = new Promise<RTCTrack[]>((resovle, reject) => {
      innerfunc = (tracks: TrackBaseInfo[]) => {
        for (const track of tracks) {
          if (trackids.includes((track.trackId as string))) {
            const error = new Error('订阅失败，订阅的track已移除');
            reject(error);
          }
        }
      }
      this.session.on('track-remove', innerfunc);
    });
    try {
      const rtctracks = await Promise.race([removePromise, this.session.subscribe(trackids)]);
      if (innerfunc) {
        this.session.off('track-remove', innerfunc);
      }
      runInAction(() => {
        for (const rtctrack of rtctracks) {
          const track = new Track(rtctrack);
          this.subscribedTracks.set(rtctrack.info.trackId as string, track);
          const user = this.users.get(rtctrack.userId as string);
          if (user) {
            user.tracks.set(rtctrack.info.trackId as string, track);
          }
        }
      });
    } catch(e) {
      console.warn(e);
      throw e;
    }
  }


  @action
  public async subscribeAll(): Promise<void> {
    const trackids = Array.from(this.publishedTrackInfos.values())
      .map(v => v.trackId) as string[];
    console.log('trackids' + trackids);
    await this.subscribe(trackids);
  }

  @action
  public async unsubscribe(trackids: string[]): Promise<void> {
    await this.session.unsubscribe(trackids);
    runInAction(() => {
      for (const trackid of trackids) {
        const track = this.subscribedTracks.get(trackid);
        if (!track) { return ; }
        this.subscribedTracks.delete(trackid);
        const user = this.users.get(track.userId as string);
        if (!user) { return ; }
        user.tracks.delete(trackid);
      }
    });
  }

  @action
  public leaveRoom(): void {
    this.session.leaveRoom();
    this.publishedTracks.forEach(t => t.rtcTrack.release());
    this.publishedTracks.clear();
    this.subscribedTracks.clear();
    this.publishedTrackInfos.clear();
    this.users.clear();
    this.token = '';
    this.id = '';
    routerStore.push('/');
  }

  @action.bound
  private handleDisconnect(d: any): void {
    console.log('handleDiconnect', d);
    switch (d.code) {
      case 10006: {
        this.leaveRoom();
        return;
      }
      case 10004: {
        console.log("get 10004", this.publishedTracks, this.subscribedTracks);
        this.users.clear()
        this.joinRoom().then(() => {
          const rtcTracks = Array.from(this.publishedTracks.values()).map(t => t.rtcTrack);
          this.publishedTracks.clear();
          console.log("repub");
          return this.session.publish(rtcTracks);
        }).then(() => {

        }).catch(e => {
          console.log(e);
          this.leaveRoom();
        });
        return;
      }
      default: {
        this.leaveRoom();
        return;
      }
    }
  }
}

export default new RoomStore();
