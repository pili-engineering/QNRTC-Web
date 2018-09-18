/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import { Stream, User, deviceManager } from 'pili-rtc-web';
import Slider from 'react-rangeslider';
import ClipboardJS from 'clipboard';
import Draggable from 'react-draggable';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AvatarIcon from 'react-avatar';
import Tooltip from '@material-ui/core/Tooltip';
import MicIcon from '@material-ui/icons/Mic';
import CastIcon from '@material-ui/icons/Cast';
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ContentCopyIcon from '@material-ui/icons/FileCopy';
import { Time } from "./Time";
import { LocalPlayer, RemotePlayer, ScrollView, MusicSelect, RTMPInput } from '../../components';
import { inject, observer } from 'mobx-react';
import { AppStore, RouterStore } from '../../stores';
import { getElementFromArray, getColorFromUserId } from '../../utils';

import * as styles from './style.css';

interface Menu {
  content: string;
  handleFunc: () => any;
}

interface Props {
  match: {
    params: {
      roomName: string,
    },
  };
  router: RouterStore;
  app: AppStore;
}

interface State {
  showPublish: boolean;
  anchorEl: HTMLElement | null;
  menulist: Menu[];
  volume: any;
  currentAudio?: string;
  currentVideo?: string;
  showMusicSelect: boolean;
  showRTMPinput: boolean;
  stats: {
    videoPackageLossRate: number,
    audioPackageLossRate: number,
    videoBitrate: number,
    audioBitrate: number,
  };
}

@inject('app', 'router')
@observer
export class RoomPage extends React.Component<Props, State> {
  private localPlayer: LocalPlayer;
  private firstRemote: RemotePlayer;
  private minmaxSwitch: boolean = false;
  private stream: Stream;
  private redirect: boolean;
  private clipboard: any;
  private statInterval: any;
  private joinTime: number = Date.now();

  public constructor(props: Props) {
    super(props);

    this.state = {
      showPublish: false,
      showMusicSelect: false,
      showRTMPinput: false,
      anchorEl: null,
      menulist: [],
      volume: 1,
      currentAudio: "默认",
      currentVideo: "默认",
      stats: {
        videoPackageLossRate: 0,
        audioPackageLossRate: 0,
        videoBitrate: 0,
        audioBitrate: 0,
      },
    };

    if (!props.app.roomToken && !props.app.config.userId) {
      props.app.setRoomName(props.match.params.roomName);
      this.redirect = true;
      props.router.push('/');
    }

  }

  public async componentDidMount(): Promise<void> {
    if (this.redirect) {
      return;
    }
    if (!this.props.app.roomToken) {
      await this.props.app.enterRoom(this.props.match.params.roomName);
    }

    this.setState({ showPublish: false });
    this.handleCopy();

    await this.handlePublish();
    this.updateDevice();
    (window as any).device = deviceManager;
    deviceManager.on("device-update", () => {
      this.updateDevice();
    });
  }

  public componentWillUpdate(props: Props, state: State): Promise<void> {
    if (props.app.subscription.size !== 1 && this.minmaxSwitch) {
      this.switchMinMax();
      return;
    }
  }

  private updateDevice = () => {
    this.setState({
      currentAudio: deviceManager.audioDevice ? deviceManager.audioDevice.label || "默认" : "默认",
      currentVideo: deviceManager.videoDevice ? deviceManager.videoDevice.label || "默认" : "默认",
    });
  }

  private getStream = async () => {
    try {
      this.stream = await deviceManager.getLocalStream(this.props.app.config.recordOption.config);
      if (this.props.app.config.recordOption.config.audio.buffer) {
        this.setState({
          showMusicSelect: true,
        });
      }
      this.stream.play(this.localPlayer.video, true);
      this.setState({ showPublish: true });
    } catch (e) {
      switch (e.code) {
        case 11010:
          this.props.app.errorStore.showAlert({
            show: true,
            title: '没有权限',
            content: '获取摄像头/麦克风权限被拒绝，请手动打开摄像头/麦克风权限后重新进入房间',
          });
          break;
        case 11009:
          this.props.app.errorStore.showAlert({
            show: true,
            title: 'Chrome 插件异常',
            content: '您可能没有安装录屏插件或者录屏插件没有升级，请到这里安装最新的录屏插件 https://developer.qiniu.com/rtn/sdk/4582/screen-sharing',
          });
          break;
        case 11008:
          this.props.app.errorStore.showAlert({
            show: true,
            title: '浏览器不支持',
            content: '抱歉，您的浏览器不支持屏幕共享，请使用 Chrome 或者 Firefox',
          });
          break;
        case 11013:
          this.props.app.errorStore.showAlert({
            show: true,
            title: '获取录屏权限被拒绝',
            content: '请刷新页面手动重新发布',
          });
          break;
        default:
          this.props.app.errorStore.showAlert({
            show: true,
            title: '没有数据',
            content: `无法获取摄像头/麦克风数据，错误代码: ${e.name}`,
          });
      }
      throw e;
    }
  }

  private switchMinMax = () => {
    this.setState({
      anchorEl: null,
    });
    const key = Array.from(this.props.app.subscription.keys())[0];
    if (!this.minmaxSwitch) {
      this.stream.play(this.firstRemote.video);
      this.props.app.subscription.get(key).stream.play(this.localPlayer.video);
    } else {
      this.stream.play(this.localPlayer.video);
      if (this.props.app.subscription.get(key)) {
        this.props.app.subscription.get(key).stream.play(this.firstRemote.video);
      }
    }
    this.minmaxSwitch = !this.minmaxSwitch;
  }

  private handleCopy = () => {
    this.clipboard = new ClipboardJS('#copy');
    this.clipboard.on('success', () => {
      this.props.app.errorStore.showToast({
        show: true,
        content: '加会链接已经复制到剪贴板',
      });
    });
  }

  private handleSubscrible = async (user: User) => {
    this.setState({
      anchorEl: null,
    });
    if (!user.published) {
      this.props.app.errorStore.showAlert({
        show: true,
        title: "无法订阅",
        content: "目标用户没有发布",
      });
      return;
    }
    await this.props.app.subscribe(user);
  }

  private handleUnsubscible = async (userId: string) => {
    this.setState({
      anchorEl: null,
    });
    this.props.app.unsubscribe(userId);
  }

  private handlePublish = async () => {
    console.log(this.props.app.publishState);
    switch (this.props.app.publishState) {
      case 'idle':
      case 'fail':
        this.props.app.setPublishState("pending");
        await this.getStream();
        await this.props.app.publish(this.stream);
        if (this.statInterval) {
          clearInterval(this.statInterval);
        }
        this.statInterval = setInterval(this.handleStats, 1000);
        break;
      case 'success':
        if (this.minmaxSwitch) {
          this.switchMinMax();
        }
        this.props.app.unpublish();
        if (this.statInterval) {
          clearInterval(this.statInterval);
        }
        this.setState({
          stats: {
            videoPackageLossRate: 0,
            audioPackageLossRate: 0,
            videoBitrate: 0,
            audioBitrate: 0,
          },
        });
        break;
      default:
        break;
    }
  }

  private handleStats = async () => {
    const report = await this.stream.getStats();
    this.setState({
      stats: {
        videoPackageLossRate: Number((report.videoPacketLossRate * 100).toFixed(2)),
        audioPackageLossRate: Number((report.audioPacketLossRate * 100).toFixed(2)),
        videoBitrate: Number((report.videoBitrate / 1024).toFixed(2)),
        audioBitrate: Number((report.audioBitrate / 1024).toFixed(2)),
      },
    });
  }

  private handleContextMenu = (e: any, userId: string, isunsub?: boolean) => {
    e.preventDefault();
    const subscription = this.props.app.subscription.get(userId);
    const menulist: Menu[] = isunsub ? [
      { content: '取消订阅', handleFunc: () => this.handleUnsubscible(userId) },
    ] : [
      { content: '踢出房间', handleFunc: () => this.handleDelete(userId) },
    ];
    if (this.props.app.subscription.size === 1 && this.props.app.subscription.get(userId)) {
      // 大小窗切换时无法取消订阅
      if (this.minmaxSwitch && menulist[0].content === "取消订阅") {
        menulist.pop();
      }
      menulist.push({ content: '大小窗切换', handleFunc: () => this.switchMinMax() });
    }
    if (!isunsub && !subscription) {
      const user = getElementFromArray(this.props.app.users, 'userId', userId);
      if (user) {
        menulist.push({ content: '订阅', handleFunc: () => this.handleSubscrible(user) });
      }
    }
    this.setState({
      anchorEl: e.target,
      menulist,
    });
  }

  private handleAudioBuffer = (buffer: AudioBuffer) => {
    console.log(buffer);
    this.stream.setAudioBufferData(buffer);
  }

  private handleMusicSelectClose = () => {
    this.setState({
      showMusicSelect: false,
    });
  }

  private handleDelete = async (userId: string) => {
    this.setState({
      anchorEl: null,
    });
    if (this.minmaxSwitch) {
      this.switchMinMax();
    }
    await this.props.app.kickplayer(userId);
  }

  private handleMute = async (audio: boolean, video: boolean) => {
    try {
      await this.props.app.mute(audio, video);
    } catch (e) {
    }
  }

  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  private handleMergeJob = () => {
    if (this.props.app.publishMergeJob) {
      this.props.app.stopPublishMergeJob();
    } else {
      this.setState({
        showRTMPinput: true,
      });
    }
  }

  private handlePublishRTMPInput = async (url?: string, targetUser?: string) => {
    console.log('rtmp publish', url, targetUser);
    if (url) {
      await this.props.app.startPublishMergeJob(url, targetUser);
    }
    this.setState({
      showRTMPinput: false,
    });
  }

  private setVolume = (value: any): void => {
    this.setState({
      volume: value,
    });
    deviceManager.setVolume(value);
  }

  private leaveRoomWithUserAction(): void {
    if (this.props.app.roomToken) {
      this.props.app.leaveRoom(true);
    }
  }

  public componentWillUnmount(): void {
    this.leaveRoomWithUserAction();
  }

  public render(): JSX.Element {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.roomName}>
            房间: {this.props.match.params.roomName}({this.props.app.config.appId})
          </p>
          <div className={styles.blank} />
        </header>
        <div className={styles.stats}>
          <p>视频丢包率: {this.state.stats.videoPackageLossRate} %</p>
          <p>音频丢包率: {this.state.stats.audioPackageLossRate} %</p>
          <p>视频实时码率: {this.state.stats.videoBitrate} kbps</p>
          <p>音频实时码率: {this.state.stats.audioBitrate} kbps</p>
        </div>
        <Time
          startTime={this.joinTime}
          className={styles.time}
        />
        <Menu
          anchorEl={this.state.anchorEl}
          open={!!this.state.anchorEl}
          onClose={this.handleMenuClose}
          id="context_menu"
        >
          {this.state.menulist.map(menu => (
            <MenuItem className="context_menuitem" onClick={menu.handleFunc} key={menu.content}>
              {menu.content}
            </MenuItem>
          ))}
        </Menu>

        <MusicSelect
          show={this.state.showMusicSelect}
          onClose={this.handleMusicSelectClose}
          handleBuffer={this.handleAudioBuffer}
        />

        <RTMPInput
          show={this.state.showRTMPinput}
          users={this.props.app.pubilshedUser.map(user => user.userId)}
          onClose={() => this.handlePublishRTMPInput()}
          onEnter={(url, user) => this.handlePublishRTMPInput(url, user)}
        />

        <ul className={styles.avatars} id="avatars">
          { this.props.app.users.map(user => (
            <li
              id={`avatar-${user.userId}`}
              className={styles.avatar} key={user.userId}
              onContextMenu={e => this.handleContextMenu(e, user.userId)}
            >
              <AvatarIcon
                name={user.userId}
                color={getColorFromUserId(user.userId)}
                className={styles.avatarIcon}
                round
                size={48}
              />
              <p className={styles.userName}>{user.userId}</p>
            </li>
          )) }
        </ul>

        <Draggable
          axis="y"
        >
          <div className={styles.remotePlayer}>
            <ScrollView
            >
              {Array.from(this.props.app.subscription.keys()).map((k, i) => {
                const subscription = this.props.app.subscription.get(k);
                const stream = subscription.stream;
                return (
                  <RemotePlayer
                    id={`remote-player-${subscription.userId}`}
                    onContextMenu={e => this.handleContextMenu(e, subscription.userId, true)}
                    ref={ref => {
                      if (i === 0) {
                        this.firstRemote = ref;
                      }
                    }}
                    key={subscription.userId}
                    userId={subscription.userId}
                    stream={stream}
                    color={getColorFromUserId(subscription.userId)}
                  />
                );
              })}
            </ScrollView>
          </div>
        </Draggable>

        { this.state.showPublish && <div className={styles.btnsWrapper}>
          <div className={styles.btns}>
          { this.props.app.publishState === 'success' &&
          <Tooltip
            title="点击复制加会链接"
            placement="top-end"
            className={styles.btn_item}
          >
            <IconButton
              id="copy"
              data-clipboard-text={window.location.href}
              className={styles.copy}
            >
              <ContentCopyIcon
                className={styles.copy}
              />
            </IconButton>
          </Tooltip> }
          { this.props.app.publishState === 'success' &&
          <Tooltip
            title={this.state.currentVideo}
            placement="top-end"
            className={styles.btn_item}
          >
            <IconButton
              className={styles.muteVideo}
              id="mute_video"
              disabled={!this.props.app.enableVideo}
              onClick={() => this.handleMute(this.props.app.muteAudio, !this.props.app.muteVideo)}
            >
              { this.props.app.muteVideo || !this.props.app.enableVideo ? <VideocamOffIcon /> : <VideocamIcon /> }
            </IconButton>
          </Tooltip> }

          <Button
            className={`${styles.btn_item} ${styles.publishbtn} ${this.props.app.publishState === 'success' ? styles.isPublish : ''}`}
            variant="fab"
            id="publish"
            onClick={this.handlePublish}
          >
            <PhoneIcon />
          </Button>

          { this.props.app.publishState === 'success' &&
          <Tooltip
            title={this.state.currentAudio}
            placement="top-end"
            className={styles.btn_item}
          >
            <IconButton
              id="mute_audio"
              className={styles.muteAudio}
              onClick={() => this.handleMute(!this.props.app.muteAudio, this.props.app.muteVideo)}
            >
              { this.props.app.muteAudio ? <MicOffIcon /> : <MicIcon /> }
            </IconButton>
          </Tooltip> }

          { this.props.app.publishState === 'success' && <div
            className={`${styles.volume} ${styles.btn_item}`}
            id="volume"
          >
            <Slider
              min={1}
              max={5}
              onChange={this.setVolume}
              value={this.state.volume}
              orientation={'vertical'}
            />
          </div> }

          { false && this.props.app.publishState === 'success' &&
          <Tooltip
            title="单路转推"
            placement="top-end"
            className={styles.btn_item}
          >
            <IconButton
              id="rtmpjob"
              className={styles.muteAudio}
              onClick={this.handleMergeJob}
            >
              { this.props.app.publishMergeJob ? <CastConnectedIcon /> : <CastIcon /> }
            </IconButton>
          </Tooltip> }

          </div>
        </div> }

        <LocalPlayer
          ref={ref => this.localPlayer = ref}
          className={styles.localPlayer}
        />
      </div>
    );
  }
}
