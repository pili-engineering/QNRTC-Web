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
import { LocalPlayer, RemotePlayer } from '../../components';
import { inject, observer } from 'mobx-react';
import { AppStore, RouterStore } from '../../stores';
import { piliRTC } from '../../models';
import { ScrollView } from '../../components';
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
  stats: {
    videoPackageLoss: number,
    audioPackageLoss: number,
    videoBitrate: number,
    audioBitrate: number,
  };
}

@inject('app', 'router')
@observer
export class RoomPage extends React.Component<Props, State> {
  private localPlayer: LocalPlayer;
  private stream: Stream;
  private clipboard: any;
  private redirect: boolean;
  private statInterval: any;

  public constructor(props: Props) {
    super(props);

    this.state = {
      showPublish: false,
      anchorEl: null,
      menulist: [],
      volume: 1,
      currentAudio: "默认",
      currentVideo: "默认",
      stats: {
        videoPackageLoss: 0,
        audioPackageLoss: 0,
        videoBitrate: 0,
        audioBitrate: 0,
      },
    };

    if (!props.app.roomToken) {
      this.redirect = true;
      props.router.push('/');
    }
  }

  public async componentDidMount(): Promise<void> {
    if (this.redirect) {
      return;
    }
    this.setState({ showPublish: false });
    piliRTC.on('kicked', this.handleLeaveRoom);
    piliRTC.on('closeroom', this.handleLeaveRoom);
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
      this.stream.play(this.localPlayer.video, true);
      this.setState({ showPublish: true });
    } catch (e) {
      switch (e.name) {
        case 'NotAllowedError':
          this.props.app.errorStore.showAlert({
            show: true,
            title: '没有权限',
            content: '获取摄像头权限被拒绝，请手动打开摄像头权限后重新进入房间',
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
        content: '房间名称已经复制到剪贴板',
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
            videoPackageLoss: 0,
            audioPackageLoss: 0,
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
        videoPackageLoss: report.videoPacketLoss,
        audioPackageLoss: report.audioPacketLoss,
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

  public componentWillUnmount(): void {
    if (this.props.app.roomToken) {
      this.props.app.leaveRoom(true);
    }
  }

  public render(): JSX.Element {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.roomName}>
            房间: {this.props.match.params.roomName}
          </p>
          <div className={styles.blank} />
        </header>
        <div className={styles.stats}>
          <p>视频丢包: {this.state.stats.videoPackageLoss}</p>
          <p>音频丢包: {this.state.stats.audioPackageLoss}</p>
          <p>视频实时码率: {this.state.stats.videoBitrate} kbps</p>
          <p>音频实时码率: {this.state.stats.audioBitrate} kbps</p>
        </div>
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
          <Tooltip
            title="点击复制房间名称"
            placement="top-end"
          >
            <IconButton
              id="copy"
              data-clipboard-text={this.props.app.roomName}
              className={styles.copy}
            >
              <ContentCopyIcon
                className={styles.copy}
              />
            </IconButton>
          </Tooltip>
          { this.props.app.publishState === 'success' &&
          <Tooltip
            title={this.state.currentVideo}
            placement="top-end"
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
            className={`${styles.publishbtn} ${this.props.app.publishState === 'success' ? styles.isPublish : ''}`}
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
            className={`${styles.muteAudio} ${styles.volume}`}
            id="volume"
          >
            <Slider
              onChange={this.setVolume}
              value={this.state.volume}
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
