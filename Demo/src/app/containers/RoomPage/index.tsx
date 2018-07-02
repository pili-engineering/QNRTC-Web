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
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AvatarIcon from 'react-avatar';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import Tooltip from 'material-ui/Tooltip';
import MicIcon from 'material-ui-icons/Mic';
import MicOffIcon from 'material-ui-icons/MicOff';
import VideocamIcon from 'material-ui-icons/Videocam';
import PhoneIcon from 'material-ui-icons/Phone';
import VideocamOffIcon from 'material-ui-icons/VideocamOff';
import { Time } from "./Time";
import { LocalPlayer, RemotePlayer, ScrollView, MusicSelect } from '../../components';
import { inject, observer } from 'mobx-react';
import { AppStore, RouterStore } from '../../stores';
import { piliRTC } from '../../models';
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
    piliRTC.on('kicked', this.handleLeaveRoom);
    piliRTC.on('closeroom', this.handleLeaveRoom);
    (window as any).onbeforeunload = this.leaveRoomWithUserAction.bind(this);
    this.handleCopy();

    await this.handlePublish();
    this.updateDevice();
    deviceManager.on("device-update", () => {
      this.updateDevice();
    });

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
      if (this.props.app.config.recordOption.key === "PCM-audio") {
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
            content: '获取摄像头权限被拒绝，请手动打开摄像头权限后重新进入房间',
          });
          break;
        case 11009:
          this.props.app.errorStore.showAlert({
            show: true,
            title: 'Chrome 插件异常',
            content: 'Chrome 屏幕分享需要安装浏览器插件。下载地址：http://sdk-release.qnsdk.com/QNRTCWebExtension.crx .安装完成后需要重新启动浏览器',
          });
          break;
        case 11008:
          this.props.app.errorStore.showAlert({
            show: true,
            title: '浏览器不支持',
            content: '抱歉，您的浏览器不支持屏幕共享，请使用 Chrome 或者 Firefox',
          });
          break;
        default:
          this.props.app.errorStore.showAlert({
            show: true,
            title: '没有数据',
            content: `无法获取摄像头数据，错误代码: ${e.name}`,
          });
      }
      throw e;
    }
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

  private handleLeaveRoom = (userId?: string) => {
    this.props.app.errorStore.showToast({
      show: true,
      content: userId ? `您被${userId}踢出房间` : '房间被关闭',
    });
    this.props.app.leaveRoom();
    this.props.router.push('/');
  }

  private handleSubscrible = async (user: User) => {
    this.setState({
      anchorEl: null,
    });
    if (!user.published) {
      return;
    }
    await this.props.app.subscribe(user);
  }

  private handleUnsubscible = async (userId: string) => {
    this.setState({
      anchorEl: null,
    });
    await this.props.app.unsubscribe(userId);
  }

  private handlePublish = async () => {
    switch (this.props.app.publishState) {
      case 'idle':
      case 'fail':
        await this.getStream();
        await this.props.app.publish(this.stream);
        if (this.statInterval) {
          clearInterval(this.statInterval);
        }
        this.statInterval = setInterval(this.handleStats, 1000);
        break;
      case 'success':
        await this.props.app.unpublish();
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
              {Array.from(this.props.app.subscription.keys()).map(k => {
                const subscription = this.props.app.subscription.get(k);
                const stream = subscription.stream;
                return (
                  <RemotePlayer
                    id={`remote-player-${subscription.userId}`}
                    onContextMenu={e => this.handleContextMenu(e, subscription.userId, true)}
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
              onClick={() => this.handleMute(this.props.app.muteAudio, !this.props.app.muteVideo)}
            >
              { this.props.app.muteVideo ? <VideocamOffIcon /> : <VideocamIcon /> }
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
              onChange={this.setVolume}
              value={this.state.volume}
              orientation={'vertical'}
            />
          </div> }
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
