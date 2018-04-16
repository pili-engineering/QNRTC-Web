import { User, Stream, RoomInfo } from 'pili-rtc-web';
import { observable, action, computed } from 'mobx';
import { ErrorStore } from './ErrorStore';
import { ConfigStore } from './ConfigStore';
import { asyncAction } from 'mobx-utils';
import { request } from '../utils';
import { piliRTC } from '../models';
import { API } from '../constants';


type State = 'idle' | 'pending' | 'success' | 'fail';

export class AppStore {
  public readonly errorStore: ErrorStore;

  public userColor: string;
  @observable
  public isLogin: boolean;
  @observable
  public isAdmin: boolean;

  @observable
  public muteAudio: boolean;
  @observable
  public muteVideo: boolean;
  @observable
  public publishState: State;
  @observable
  public subscription: Map<string, {
    subscribeState: State,
    userId: string,
    streamId: string | null,
    muteAudio?: boolean,
    muteVideo?: boolean,
    video?: HTMLVideoElement,
    videoReadyCb?: (video: HTMLVideoElement) => void,
  }>;


  @observable
  public roomName: string;
  @observable
  public roomToken?: string;
  @observable
  public roomInfo?: RoomInfo;

  @computed
  public get userId(): string {
    return this.config.userId;
  }

  @observable
  public config: ConfigStore;

  public constructor(errorStore: ErrorStore, configStore: ConfigStore) {
    this.isLogin = false;
    this.isAdmin = false;
    this.roomToken = null;
    this.roomInfo = piliRTC.roomInfo;

    this.muteAudio = false;
    this.muteVideo = false;
    this.publishState = 'idle';
    this.subscription = observable(new Map());

    this.errorStore = errorStore;
    this.config = configStore;
    if (this.config.userId) {
      this.isLogin = true;
    }

    piliRTC.on('user-join', user => this.updateUser(user, true));
    piliRTC.on('user-leave', user => this.updateUser(user, false));
    piliRTC.on('add-stream', stream => this.updateStream(stream, true));
    piliRTC.on('remove-stream', stream => this.updateStream(stream, false));
    piliRTC.on('mute', this.handleMute);
    piliRTC.on('room-state-change', state => console.log('state change', state));
    console.log(piliRTC);
  }

  @action
  private handleMute = (d: any) => {
    this.roomInfo = piliRTC.roomInfo;
    const subscription = this.subscription.get(d.userId);
    if (subscription) {
      this.subscription.set(d.userId, {
        ...subscription,
        muteAudio: d.muteAudio,
        muteVideo: d.muteVideo,
      });
    }
  }

  @action
  public leaveRoom = (isUserAction?: boolean) => {
    if (!this.roomToken) {
      return;
    }
    if (isUserAction) {
      piliRTC.leaveRoom();
    }
    this.subscription = observable(new Map());
    this.publishState = 'idle';
    this.muteAudio = false;
    this.muteVideo = false;
    this.roomToken = null;
    this.roomInfo = { users: [], streams: [] };
  }

  @action
  private updateUser = (user: User, isAdd: boolean) => {
    console.log('upadet player', user, isAdd);
    if (!isAdd) {
      this.errorStore.showToast({ show: true, content: `用户${user.userId}离开房间`});
      this.subscription.delete(user.userId);
    } else {
      this.errorStore.showToast({ show: true, content: `用户${user.userId}加入房间`});
    }
    this.roomInfo = piliRTC.roomInfo;
    if (isAdd) {
      this.autoSubscribe();
    }
  }

  @action
  private updateStream = (stream: Stream, isAdd: boolean) => {
    console.log('update stream', stream, isAdd);
    this.roomInfo = piliRTC.roomInfo;
    const subscription = this.subscription.get(stream.userId);
    if (subscription) {
      this.subscription.set(stream.userId, {
        ...subscription,
        streamId: isAdd ? stream.streamId : null,
      });
    }
    if (isAdd) {
      this.autoSubscribe();
    }
  }

  @action
  public autoSubscribe = () => {
    console.log('auto sub', this.roomInfo);
    for (let i = 0; i < this.roomInfo.users.length; i += 1) {
      const user = this.roomInfo.users[i];
      for (let j = 0; j < this.roomInfo.streams.length; j += 1) {
        const stream = this.roomInfo.streams[j];
        if (stream.userId === user.userId) {
          console.log('user', user);
          if (!this.subscription.has(user.userId)) {
            this.startSubscribe(user);
          }
        }
      }
    }
  }

  @asyncAction
  public *enterRoom(roomName: string, isAdmin: boolean = false): any {
    try {
      if (!this.userId) {
        this.errorStore.showAlert({
          show: true,
          title: '错误',
          content: '请先点击右上角登录',
        });
        throw null;
      }
      this.errorStore.showLoading({ content: '加入房间中', show: true });
      const api = isAdmin ? API.CREATE_ROOM_TOKEN : API.JOIN_ROOM_TOKEN;

      // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
      // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
      // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
      const requestURL = `${api(roomName, this.userId)}?bundleId=demo-rtc.qnsdk.com`;

      const token: string = yield request(requestURL, 'text');
      this.roomToken = token;
      this.isAdmin = !!isAdmin;
      this.roomName = roomName;

      this.roomInfo = yield piliRTC.joinRoomWithToken(this.roomToken);
      this.roomInfo = observable(this.roomInfo);
      this.errorStore.closeLoading();
      this.autoSubscribe();
    } catch (e) {
      this.errorStore.closeLoading();
      this.errorStore.showAlert({
        show: true,
        title: '加入房间失败!',
        content: e.message,
      });
      throw e;
    }
  }

  @computed
  public get users(): User[] {
    if (!this.roomInfo || !this.roomInfo.users) {
      return [];
    }
    return this.roomInfo.users;
  }

  @asyncAction
  public *publish(stream: MediaStream): any {
    this.publishState = 'pending';
    try {
      yield piliRTC.publish(stream);
      this.publishState = 'success';
    } catch (e) {
      this.publishState = 'fail';
      this.errorStore.showAlert({
        show: true,
        title: '上麦失败!',
        content: e.message,
      });
      throw e;
    }
  }

  @asyncAction
  public *unpublish(): any {
    this.publishState = 'pending';
    try {
      piliRTC.unpublish();
      this.publishState = 'idle';
      this.muteAudio = false;
      this.muteVideo = false;
    } catch (e) {
      this.publishState = 'fail';
      this.errorStore.showAlert({
        show: true,
        title: '下麦失败!',
        content: e.message,
      });
      throw e;
    }
  }

  @action
  public startSubscribe(user: User): void {
    if (this.subscription.has(user.userId) || !user.publishStream) {
      console.log('重复订阅或者没有流', user, this.subscription);
      return;
    }
    console.log('startSubscribe', user.userId);
    this.subscription.set(user.userId, {
      subscribeState: 'pending',
      userId: user.userId,
      streamId: user.publishStream.streamId,
      muteAudio: user.publishStream.muteAudio,
      muteVideo: user.publishStream.muteVideo,
    });
  }

  @asyncAction
  public *subscribe(userId: string, video: HTMLVideoElement): any {
    console.log('subscribe', userId, video);
    const subscription = this.subscription.get(userId);
    this.subscription.set(userId, {
      ...subscription,
      video,
    });
    try {
      yield piliRTC.subscribe(subscription.userId, video);
      this.subscription.set(userId, {
        ...subscription,
        subscribeState: 'success',
      });
    } catch (e) {
      console.log(e);
      this.subscription.delete(userId);
      this.errorStore.showAlert({
        show: true,
        title: '订阅失败!',
        content: e.message,
      });
      throw e;
    }
  }

  @asyncAction
  public *unsubscribe(userId: string): any {
    try {
      yield piliRTC.unsubscribe(userId);
      this.subscription.delete(userId);
    } catch (e) {
      console.log(e);
      this.errorStore.showAlert({
        show: true,
        title: '取消订阅失败!',
        content: e.message,
      });
      throw e;
    }
  }

  @asyncAction
  public *kickplayer(userId: string): any {
    try {
      yield piliRTC.kickoutUser(userId);
    } catch (e) {
      this.errorStore.showToast({
        show: true,
        content: e.message,
      });
      throw e;
    }
  }

  @action
  public mute(muteAudio: boolean, muteVideo?: boolean): void {
    if (muteVideo === undefined) {
      muteVideo = this.muteVideo;
    }
    if (muteAudio && muteVideo) {
      this.errorStore.showToast({
        show: false,
        content: '不能同时关闭音频和视频',
      });
      throw null;
    }
    this.muteAudio = muteAudio;
    this.muteVideo = muteVideo;
    if (this.publishState === 'success') {
      piliRTC.mute(this.muteAudio, this.muteVideo);
    }
  }

  @action
  public login(userId: string): void {
    this.isLogin = true;
    this.config.setUserId(userId);
  }

}
