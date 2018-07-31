import { User, Stream } from 'pili-rtc-web';
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

  public isAdmin: boolean;

  @observable
  public muteAudio: boolean;
  @observable
  public muteVideo: boolean;
  @observable
  public publishState: State;
  @observable
  public subscription: Map<string, {
    stream?: Stream,
    userId: string,
    subscribeState: State,
  }>;


  @observable
  public roomName: string;
  @observable
  public roomToken?: string;
  @observable
  public users: User[];

  @computed
  public get userId(): string {
    return this.config.userId;
  }

  @observable
  public config: ConfigStore;

  public constructor(errorStore: ErrorStore, configStore: ConfigStore) {
    this.isLogin = false;
    this.roomToken = null;
    this.users = piliRTC.users;

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
    piliRTC.on('user-publish', user => this.updateStream(user, true));
    piliRTC.on('user-unpublish', user => this.updateStream(user, false));
    piliRTC.on('mute', this.updateStateFromSDK);
    console.log(piliRTC);
  }

  @action
  private updateStateFromSDK = () => {
    const subUserIds = Object.keys(piliRTC.subscribedUsers);
    const localSubUserIds = Array.from(this.subscription.keys());
    localSubUserIds.forEach(userId => {
      if (subUserIds.indexOf(userId) === -1) {
        this.subscription.delete(userId);
      }
    });
    for (const userId in piliRTC.subscribedUsers) {
      this.subscription.set(userId, {
        subscribeState: "success",
        userId,
        stream: piliRTC.subscribedUsers[userId],
      });
    }

    this.users = piliRTC.users;
  }

  @action
  public leaveRoom = (isUserAction?: boolean) => {
    if (!this.roomToken) {
      return;
    }
    if (this.isAdmin) {
      piliRTC.stopMergeStream();
    }
    if (isUserAction) {
      piliRTC.leaveRoom();
    }
    this.subscription = observable(new Map());
    this.publishState = 'idle';
    this.muteAudio = false;
    this.muteVideo = false;
    this.roomToken = null;
    this.users = piliRTC.users;
  }

  @action
  private updateUser = (user: User, isAdd: boolean) => {
    if (!isAdd) {
      this.errorStore.showToast({ show: true, content: `用户${user.userId}离开房间`});
    } else {
      this.errorStore.showToast({ show: true, content: `用户${user.userId}加入房间`});
    }
    this.updateStateFromSDK();
    if (isAdd) {
      this.autoSubscribe();
    }
  }

  @action
  private updateStream = (stream: Stream, isAdd: boolean) => {
    this.updateStateFromSDK();
    if (isAdd) {
      this.autoSubscribe();
    }
  }

  @action
  public autoSubscribe = () => {
    for (let i = 0; i < this.users.length; i += 1) {
      const user = this.users[i];
      if (user.published && !user.stream && user.userId !== this.userId) {
        this.subscribe(user);
      }
    }
  }

  @asyncAction
  public *enterRoom(roomName: string, roomToken?: string): any {
    this.isAdmin = !!this.config.userId.match(/admin/i);

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
      if (!roomToken) {
        const api = this.isAdmin ? API.CREATE_ROOM_TOKEN : API.JOIN_ROOM_TOKEN;

        // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
        // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
        // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
        const requestURL = `${api(roomName, this.userId, this.config.appId)}?bundleId=demo-rtc.qnsdk.com`;

        const token: string = yield request(requestURL, 'text');
        this.roomToken = token;
        this.roomName = roomName;
      } else {
        this.roomToken = roomToken;
      }

      this.users = yield piliRTC.joinRoomWithToken(this.roomToken);
      this.users = observable(this.users);
      this.config.changeAppId(piliRTC.appId);
      this.roomName = piliRTC.roomName;
      if (this.isAdmin) {
        piliRTC.setDefaultMergeStream(this.config.mergeStreamWidth, this.config.mergeStreamHeight);
      }
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

  @asyncAction
  public *publish(stream: Stream): any {
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

  @asyncAction
  public *subscribe(user: User): any {
    this.subscription.set(user.userId, {
      subscribeState: 'pending',
      userId: user.userId,
    });
    try {
      const stream = yield piliRTC.subscribe(user.userId);
      this.subscription.set(user.userId, {
        stream,
        userId: user.userId,
        subscribeState: 'success',
      });
    } catch (e) {
      console.log(e);
      this.subscription.delete(user.userId);
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
      if (piliRTC.subscribedUsers[userId]) {
        yield piliRTC.unsubscribe(userId);
      }
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

  @action
  public setRoomName(roomName: string): void {
    this.roomName = roomName;
  }
}
