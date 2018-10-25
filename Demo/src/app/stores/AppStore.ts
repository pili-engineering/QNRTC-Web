import { User, Stream } from 'pili-rtc-web';
import { observable, action, computed } from 'mobx';
import { ErrorStore } from './ErrorStore';
import { ConfigStore } from './ConfigStore';
import { RouterStore } from './RouterStore';
import { ALL_USER } from '../components/RTMPInput';
import { asyncAction } from 'mobx-utils';
import { request } from '../utils';
import { piliRTC } from '../models';
import { API } from '../constants';


type State = 'idle' | 'pending' | 'success' | 'fail';

export class AppStore {
  public readonly errorStore: ErrorStore;
  public readonly routerStore: RouterStore;

  public userColor: string;
  @observable
  public isLogin: boolean;

  public isAdmin: boolean;

  @observable
  public muteAudio: boolean;
  @observable
  public muteVideo: boolean;
  @observable
  public enableAudio: boolean = true;
  @observable
  public enableVideo: boolean = true;
  @observable
  public publishState: State;
  @observable
  public publishMergeJob?: string;
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
  @observable
  public liveRoomAdmin: boolean = true;

  private roomMode: "live" | "rtc" = "rtc";

  @computed
  public get userId(): string {
    return this.config.userId;
  }

  @computed
  public get pubilshedUser(): User[] {
    const users = [];
    this.users.forEach(user => {
      if (user.published) {
        users.push(user);
      }
    });

    return users;
  }

  @observable
  public config: ConfigStore;

  public constructor(errorStore: ErrorStore, configStore: ConfigStore, routerStore: RouterStore) {
    this.isLogin = false;
    this.roomToken = null;
    this.users = piliRTC.users;

    this.muteAudio = false;
    this.muteVideo = false;
    this.publishState = 'idle';
    this.subscription = observable(new Map());

    this.errorStore = errorStore;
    this.routerStore = routerStore;
    this.config = configStore;
    if (this.config.userId) {
      this.isLogin = true;
    }

    piliRTC.on('user-join', user => this.updateUser(user, true));
    piliRTC.on('user-leave', user => this.updateUser(user, false));
    piliRTC.on('user-publish', user => this.updateStream(user, true));
    piliRTC.on('user-unpublish', user => this.updateStream(user, false));
    piliRTC.on('kicked', userId => this.onKicked(userId));
    piliRTC.on('closeroom', () => this.leaveRoom());
    piliRTC.on('mute', this.updateStateFromSDK);
    piliRTC.on('republish', () => {
      if (!this.publishMergeJob) {
        return;
      }
      piliRTC.setMergeStreamLayout(piliRTC.userId, {
        id: this.publishMergeJob,
        x: 0, y: 0, w: 1080, h: 720, z: 1,
      });
    });
    (window as any).onbeforeunload = () => this.leaveRoom(true);
    console.log(piliRTC);
  }

  @action
  private updateStateFromSDK = () => {
    this.users = piliRTC.users;
    const userIds = this.users.map(user => user.userId);
    const localSubUserIds = Array.from(this.subscription.keys());
    localSubUserIds.forEach(userId => {
      if (userIds.indexOf(userId) === -1) {
        this.subscription.delete(userId);
      }
    });
  }

  private onKicked(userId: string): void {
    this.errorStore.showToast({
      show: true,
      content: userId ? `您被${userId}踢出房间` : '房间被关闭',
    });
    this.leaveRoom();
  }

  @action
  public leaveRoom = (isUserAction?: boolean) => {
    if (!this.roomToken) {
      return;
    }
    this.stopPublishMergeJob();
    if (isUserAction) {
      piliRTC.leaveRoom();
    }
    this.subscription = observable(new Map());
    this.publishState = 'idle';
    this.muteAudio = false;
    this.muteVideo = false;
    this.roomToken = null;
    this.users = piliRTC.users;
    this.roomMode = "rtc";
    this.routerStore.push('/');
  }

  @action
  private updateUser = (user: User, isAdd: boolean) => {
    if (!isAdd) {
      this.errorStore.showToast({ show: true, content: `用户${user.userId}离开房间`});
    } else {
      this.errorStore.showToast({ show: true, content: `用户${user.userId}加入房间`});
    }
    this.updateStateFromSDK();
  }

  @action
  private updateStream = (user: User, isAdd: boolean) => {
    this.updateStateFromSDK();
    if (isAdd) {
      this.autoSubscribe();
    }
  }

  @action
  public autoSubscribe = () => {
    console.log(this.roomMode);
    if (this.roomMode === "live") {
      return;
    }
    for (let i = 0; i < this.users.length; i += 1) {
      const user = this.users[i];
      if (user.published && user.userId !== piliRTC.userId && !this.subscription.has(user.userId)) {
        this.subscribe(user);
      }
    }
  }

  /**
   * 加入连麦房间
   *
   * @param {string} roomName 房间名称
   * @param {string} roomToken? 传入代表使用roomToken直接加会，将忽略roomName
   * @param {boolean} liveMode? 代表使用直播房间模式，以admin加入只控制合流
   */
  @asyncAction
  public *enterRoom(roomName: string, roomToken?: string, liveMode?: boolean): any {
    const isAdmin = name => name === "admin";

    try {
      if (liveMode) {
        const data = yield request(`${API.LIST_USERS(this.config.appId, roomName)}`);
        this.liveRoomAdmin = true;
        data.users.forEach(user => {
          if (user.userId === "admin") {
            this.liveRoomAdmin = isAdmin(this.userId);
          }
        });
      }
      if (!this.userId && !roomToken) {
        this.errorStore.showAlert({
          show: true,
          title: '错误',
          content: '请先点击右上角登录',
        });
        throw null;
      }
      const userId = this.liveRoomAdmin && liveMode ? 'admin' : this.userId;
      this.isAdmin = isAdmin(userId);
      this.errorStore.showLoading({ content: '加入房间中', show: true });
      if (!roomToken) {
        const api = this.isAdmin ? API.CREATE_ROOM_TOKEN : API.JOIN_ROOM_TOKEN;

        // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
        // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
        // 此处服务器 URL 仅用于 Demo 测试！随时可能 修改/失效，请勿用于 App 线上环境！
        const requestURL = `${api(roomName, userId, this.config.appId)}?bundleId=demo-rtc.qnsdk.com`;

        const token: string = yield request(requestURL, 'text');
        this.roomToken = token;
        this.roomName = roomName;
      } else {
        this.roomToken = roomToken;
      }

      this.users = yield piliRTC.joinRoomWithToken(this.roomToken);
      this.users = observable(this.users);
      if (liveMode) {
        this.roomMode = "live";
      } else {
        this.roomMode = "rtc";
      }
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
      console.log(e);
      throw e;
    }

    if (liveMode) {
      this.roomMode = "live";
    }
  }

  @asyncAction
  public *publish(stream: Stream): any {
    this.publishState = 'pending';
    try {
      yield piliRTC.publish(stream);
      this.enableAudio = stream.enableAudio;
      this.enableVideo = stream.enableVideo;
      this.publishState = 'success';
      this.updateStateFromSDK();
    } catch (e) {
      if (e.code === 10051) {
        stream.release();
        this.publishState = 'idle';
        return;
      }
      this.publishState = 'fail';
      this.errorStore.showAlert({
        show: true,
        title: '上麦失败!',
        content: e.message,
      });
      throw e;
    }
  }

  @action
  public setPublishState(state: 'pending' | 'success' | 'fail' | 'idle'): void {
    this.publishState = state;
  }

  @action
  public unpublish(): void {
    this.publishState = 'pending';
    try {
      piliRTC.unpublish();
      this.stopPublishMergeJob();
      this.publishState = 'idle';
      this.muteAudio = false;
      this.muteVideo = false;
    } catch (e) {
      this.publishState = 'success';
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
    if (this.roomMode === "live") {
      return;
    }
    this.subscription.set(user.userId, {
      subscribeState: 'pending',
      userId: user.userId,
    });
    try {
      console.log("auto subscribe", user.userId);
      const stream = yield piliRTC.subscribe(user.userId, true);
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

  @action
  public unsubscribe(userId: string): any {
    try {
      if (piliRTC.subscribedUsers[userId]) {
        piliRTC.unsubscribe(userId);
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
  public setMergeOptions(userId: string, options: any): void {
    piliRTC.setMergeStreamLayout(userId, options);
    this.errorStore.showToast({
      show: true,
      content: '已发送合流配置，请等待合流画面生效',
    });
  }

  @asyncAction
  public *startPublishMergeJob(publishUrl: string, targetUser: string): any {
    if (this.publishMergeJob) {
      return;
    }
    this.publishMergeJob = targetUser + publishUrl;
    yield piliRTC.createMergeJob(this.publishMergeJob, { publishUrl });
    if (targetUser !== ALL_USER) {
      piliRTC.setMergeStreamLayout(targetUser, {
        id: this.publishMergeJob,
        x: 0, y: 0, w: 1080, h: 720, z: 1,
      });
    } else {
      piliRTC.setDefaultMergeStream(1080, 720, this.publishMergeJob);
    }
    this.errorStore.showToast({
      show: true,
      content: '已开启单路转推',
    });
  }

  @action
  public stopPublishMergeJob(): void {
    if (!this.publishMergeJob) {
      return;
    }
    piliRTC.stopMergeStream(this.publishMergeJob);
    this.publishMergeJob = undefined;
    this.errorStore.showToast({
      show: true,
      content: '单路转推停止',
    });
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
