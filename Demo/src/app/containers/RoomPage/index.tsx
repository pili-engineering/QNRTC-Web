/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import { User } from 'pili-rtc-web';
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
}

@inject('app', 'router')
@observer
export class RoomPage extends React.Component<Props, State> {
  private localPlayer: LocalPlayer;
  private stream: MediaStream;
  private clipboard: any;
  private redirect: boolean;

  public constructor(props: Props) {
    super(props);

    this.state = {
      showPublish: false,
      anchorEl: null,
      menulist: [],
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
    navigator.mediaDevices.ondevicechange = e => {
      console.log('devicechange', e);
    };
    this.handleCopy();

    await this.handlePublish();
  }

  private getStream = async () => {
    try {
      const timeout: Promise<MediaStream> = new Promise((_, reject) => {
        const err = new Error();
        err.name = 'TimeoutError';
        setTimeout(() => reject(err), 5000);
      });

      this.stream = await Promise.race([
        navigator.mediaDevices.getUserMedia(this.props.app.config.recordOption.config),
        timeout,
      ]);
      if (!this.stream) {
        const error = new Error();
        error.name = "未知错误";
        throw error;
      }
      this.localPlayer.video.srcObject = this.stream;
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
        case 'TimeoutError':
          this.props.app.errorStore.showAlert({
            show: true,
            title: '没有权限',
            content: '获取权限超时，您可能没有点击权限申请框, 打开权限后重新进入房间',
          });
          break;
        case 'TypeError':
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

  private handleSubscrible = (user: User) => {
    this.setState({
      anchorEl: null,
    });
    if (!user.publishStream) {
      return;
    }
    this.props.app.startSubscribe(user);
  }

  private handleRemoteVideoReady = async (video: HTMLVideoElement, userId: string) => {
    console.log('handle ready', video);
    await this.props.app.subscribe(userId, video);
  }

  private handleUnsubscible = async (userId: string) => {
    this.setState({
      anchorEl: null,
    });
    await this.props.app.unsubscribe(userId);
  }

  private handlePublish = async () => {
    console.log('publish', this.props.app.publishState);
    switch (this.props.app.publishState) {
      case 'idle':
      case 'fail':
        await this.getStream();
        await this.props.app.publish(this.stream);
        break;
      case 'success':
        this.releaseStream();
        await this.props.app.unpublish();
        break;
      default:
        break;
    }
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

  private releaseStream = () => {
    if (!this.stream) {
      return;
    }
    this.stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  public componentWillUnmount(): void {
    if (this.props.app.roomToken) {
      this.releaseStream();
      this.props.app.leaveRoom(true);
    }
  }

  public componentDidCatch(e: Error, info: any): void {
    console.log(e, info);
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
                return (
                  <RemotePlayer
                    id={`remote-player-${subscription.userId}`}
                    onContextMenu={e => this.handleContextMenu(e, subscription.userId, true)}
                    key={subscription.userId}
                    userId={subscription.userId}
                    streamId={subscription.streamId}
                    color={getColorFromUserId(subscription.userId)}
                    muteAudio={subscription.muteAudio}
                    muteVideo={subscription.muteVideo}
                    onVideoReady={this.handleRemoteVideoReady}
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
          { this.props.app.publishState === 'success' && <IconButton
            id="mute_audio"
            className={styles.muteAudio}
            onClick={() => this.handleMute(!this.props.app.muteAudio, this.props.app.muteVideo)}
          >
            { this.props.app.muteAudio ? <MicOffIcon /> : <MicIcon /> }
          </IconButton> }

          <Button
            className={`${styles.publishbtn} ${this.props.app.publishState === 'success' ? styles.isPublish : ''}`}
            variant="fab"
            id="publish"
            onClick={this.handlePublish}
          >
            <PhoneIcon />
          </Button>

          { this.props.app.publishState === 'success' && <IconButton
            className={styles.muteVideo}
            id="mute_video"
            onClick={() => this.handleMute(this.props.app.muteAudio, !this.props.app.muteVideo)}
          >
            { this.props.app.muteVideo ? <VideocamOffIcon /> : <VideocamIcon /> }
          </IconButton> }
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
