import {
  Avatar,
  Fab,
  Chip,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import { MenuItemProps } from '@material-ui/core/MenuItem';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import {
  FileCopy as ContentCopyIcon,
  Phone as PhoneIcon,
  MicNone,
  MicOff,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon
} from '@material-ui/icons';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import Clipboard from 'clipboard';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { RoomState, Track as RTCTrack } from 'pili-rtc-web';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { verifyRoomId, getTrackNmae, randomStringGen } from '../common/utils';
import { RoomStore } from '../stores/roomStore';
import { UserStore } from '../stores/userStore';
import UserPlayer from '../components/UserPlayer';
import qs from 'qs';
import { MessageStore } from '../stores/messageStore';
import { MenuStore } from '../stores/menuStore';
import InfoPanel from '../components/InfoPanel';
import SwitchPanel from '../components/SwitchPanel';
import { ConfirmLoading } from '../components/ConfirmLoading';


const styles = (theme: Theme) => createStyles({
  root: {
    overflow: 'hidden',
    padding: 0,
    height: '100vh',
    width: '100vw',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row'
  },
  rootcontent: {
    width: '75%',
    flex: '1 0 auto',
    position: 'relative'
  },
  sidebar: {
    width: '25%',
    flex: '1 0 auto'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  dialogContentText: {
    margin: theme.spacing.unit * 2,
    lineHeight: '40px',
  },
  header: {
    padding: `${theme.spacing.unit * 3}px`,
    height: '80px',
    overflow: 'visible',
  },
  headerContent: {
    height: `${ 80 - (theme.spacing.unit * 3)}px`,
    lineHeight: `${ 80 - (theme.spacing.unit * 3)}px`,
    overflow: 'visible',
  },
  footer: {
    padding: `${theme.spacing.unit * 3}px`,
    height: '104px',
  },
  content: {
    maxHeight: 'calc(100vh - 184px)',
    padding: `0 ${theme.spacing.unit * 3}px`,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  chip: {
    position: 'relative',
    zIndex: 1,
  },
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  zoom: {
    width: '100%',
    height: '100%',
  },
  infoPanel: {
    background: 'rgba(28,28,28,0.8)',
    borderRadius: '4px',
    color: '#fff',
    left: '10px',
    position: 'absolute',
    top: '10px',
    zIndex: 64,
    minWidth: '13em',
  },
  activeFab: {
    background: '#ef5350 !important',
  },
  holder: {
    width: '56px',
  },
});

interface RoomRouterProps {
  roomid: string | undefined;
}

interface Props extends WithStyles<typeof styles> {
  routerStore: RouterStore;
  userStore: UserStore;
  roomStore: RoomStore;
  messageStore: MessageStore;
  menuStore: MenuStore;
}

@inject('routerStore', 'userStore', 'roomStore', 'messageStore', 'menuStore')
@observer
class Room extends Component<Props & RouteComponentProps<RoomRouterProps>, {}> {

  componentDidMount() {
    this.props.messageStore.hideLoading();
  }

  handleConfirmJoinRoom = async () => {
    const roomid = this.props.match.params.roomid || '';
    const qsobj = qs.parse(this.props.routerStore.location.search.substr(1));
    // 如果加入房间的时候没有用户名，随机分配一个
    if (!this.props.userStore.id) {
      this.props.userStore.setIdNoStore(`guest${randomStringGen(3)}`);
    }
    if (!qsobj.roomToken && !verifyRoomId(roomid)) return this.props.routerStore.push('/');
    const { roomStore, messageStore } = this.props;
    if (roomStore.state !== RoomState.Idle) {
      return;
    }
    if (qsobj.appId) {
      roomStore.setAppId(qsobj.appId);
    }
    let token: string | undefined = qsobj.roomToken;
    let tracks: RTCTrack[] | undefined;
    messageStore.showLoading('加入房间中...');
    try {
      if (!token) {
        roomStore.setId(roomid);
        const location = this.props.routerStore.location.pathname;
        [ tracks ] = await Promise.all([
          this.selectTracks()
            .then((tracks: any) => {
              if (location !== this.props.routerStore.location.pathname) {
                roomStore.releaseLocalTracks();
                return Promise.reject();
              }
              return tracks;
            }),
          roomStore.fetchRoomToken()
            .then(roomToken => {
              token = roomToken;
              if (location !== this.props.routerStore.location.pathname) return Promise.reject();
              return roomStore.joinRoom(roomToken);
            }),
        ])
        .finally(() => {
          if (roomStore.state === RoomState.Idle) {
            roomStore.releaseLocalTracks();
          }
        });
      } else {
        [ tracks ] = await Promise.all([this.selectTracks(), roomStore.joinRoom(token)])
          .finally(() => {
            if (roomStore.state === RoomState.Idle) {
              roomStore.releaseLocalTracks();
            }
          });
      }
    } catch(error) {
      console.log(error);
      messageStore.hideLoading();
      this.props.routerStore.push('/');
      messageStore.show('加入房间失败');
      return;
    }
    console.log('token: ' + token);
    if (tracks) {
      this.publish(tracks);
    }
    if (!roomid) {
      this.props.routerStore.replace(`/room/${this.props.roomStore.id}`);
    }
    this.props.roomStore.subscribeAll().catch(e => {
      console.log(e);
      messageStore.showAlert({
        show: true,
        title: '订阅失败',
        content: '自动订阅失败，请手动订阅',
      });
    });
  }

  componentWillUnmount() {
    this.props.roomStore.leaveRoom();
    this.props.messageStore.hideLoading();
  }

  publish = (tracks: RTCTrack[]) => {
    const { messageStore } = this.props;
    messageStore.setLoadingText('发布中');
    this.props.roomStore.publish(tracks).then(() => {
      messageStore.hideLoading();
    })
    .catch(e => {
      console.log(e);
      messageStore.hideLoading();
      messageStore.showAlert({
        show: true,
        title: '发布失败',
        content: '请手动重新发布',
      });
    });
  }

  selectTracks = (): Promise<RTCTrack[] | undefined> => {
    const { roomStore, messageStore } = this.props;
    return roomStore.getSelectTracks()
    .catch(e => {
      console.log(e);
      messageStore.hideLoading();
      switch (e.code) {
        case 11010:
          messageStore.showAlert({
            show: true,
            title: '没有权限',
            content: '获取摄像头/麦克风权限被拒绝，请手动打开摄像头/麦克风权限后重新进入房间',
          });
          break;
        case 11009:
          messageStore.showAlert({
            show: true,
            title: 'Chrome 插件异常',
            content: '您可能没有安装录屏插件或者录屏插件没有升级，请到这里安装最新的录屏插件 https://doc.qnsdk.com/rtn/web/docs/screen_share#1',
          });
          break;
        case 11008:
          messageStore.showAlert({
            show: true,
            title: '浏览器不支持',
            content: '抱歉，您的浏览器不支持屏幕共享，请使用 Chrome 或者 Firefox',
          });
          break;
        case 11013:
          messageStore.showAlert({
            show: true,
            title: '获取录屏权限被拒绝',
            content: '请刷新页面手动重新发布',
          });
          break;
        default:
          messageStore.showAlert({
            show: true,
            title: '没有数据',
            content: `无法获取摄像头/麦克风数据，错误代码: ${e.name}`,
          });
      }
      return undefined;
    });
  }

  handleMenuClose = this.props.menuStore.close;


  handlePublish = async () => {
    if (this.props.roomStore.publishedTracks.size === 0) {
      this.publish(await this.props.roomStore.getSelectTracks());
    } else {
      this.props.roomStore.unpublish();
    }
  };

  handleSubscribe = (trackId: string) => async () => {
    this.handleMenuClose();
    try{
      await this.props.roomStore.subscribe([ trackId ]);
    } catch(error) {
      this.props.messageStore.showAlert({
        show: true,
        title: '订阅失败',
        content: error.toString(),
      });
    } 
  };

  handleUnsubscribe = (trackId: string) => async () => {
    await this.props.roomStore.unsubscribe([ trackId ]);
    this.handleMenuClose();
  };

  handleUserClick(userid: string, e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();
    const user = this.props.roomStore.users.get(userid);
    if (!user || user.id === this.props.userStore.id) {
      return;
    }
    const menulist = [] as MenuItemProps[];
    if (this.props.userStore.id === 'admin') {
      menulist.push({
        children: '踢出房间',
        onClick: () => {
          this.props.roomStore.session.kickoutUser(user.id);
          this.handleMenuClose();
        },
      });
    }
    for (const [ trackId, track ] of user.publishedTrackInfo.entries()) {
      const subscribed = this.props.roomStore.subscribedTracks.has(trackId);
      if (subscribed) {
        menulist.push({
          children: '取消订阅: ' + getTrackNmae(track),
          onClick: this.handleUnsubscribe(trackId),
        });
      } else {
        menulist.push({
          children: '订阅: ' + getTrackNmae(track),
          onClick: this.handleSubscribe(trackId),
        });
      }
    }

    if (menulist.length === 0) {
      menulist.push({
        children: '未发布',
        disabled: true,
      });
    }
    this.props.menuStore.open(e.currentTarget, menulist);
  }

  render() {
    const { classes, roomStore, menuStore } = this.props;
    const publishedAudioTracks = roomStore.publishedAudioTracks;
    const publishedCameraTracks = roomStore.publishedCameraTracks;
    const publishedScreenTracks = roomStore.publishedScreenTracks;
    return (
    <div className={classes.root}>
      <div className={classes.rootcontent}>
        <ConfirmLoading
          title="加入会议房间"
          content="我们将采集您的摄像头/麦克风数据并与房间其他用户进行音视频通话"
          actionTitle="加入"
          handleClose={this.handleConfirmJoinRoom}
        />
        <div className={classes.screen}>
          <UserPlayer
            screen
            local
            tracks={Array.from(roomStore.publishedTracks.values())}
            menuStore={menuStore}
          />
        </div>
        <Grid
          className={classes.zoom}
          container
          direction="column"
          justify="space-between"
          wrap="nowrap"
          alignItems="stretch"
        >
          <Grid
            item
            container
            direction="column"
            justify="flex-end"
            alignItems="stretch"
          >
            <Grid
              item
              container
              className={classes.header}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid
                item
                sm={4}
                xs={6}
                className={classes.headerContent}
              >
                房间：{this.props.roomStore.id} ({this.props.roomStore.appId})
              </Grid>
              <Grid
                item
                sm={8}
                xs={6}
                container
                direction="row-reverse"
                className={classes.headerContent}
              >
                { Array.from(this.props.roomStore.users.values()).map(v => {
                    return (
                    <Grid item xl={2} md={3} sm={6} xs={12} key={v.id}>
                    <Chip
                      avatar={<Avatar>{v.id.substr(0, 1).toUpperCase()}</Avatar>}
                      label={v.id}
                      className={classes.chip}
                      onClick={this.handleUserClick.bind(this, v.id)}
                    />
                    </Grid>)
                  }) }
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="flex-end"
            alignItems="stretch"
          >
            <InfoPanel
              audioStatus={roomStore.publishTracksReport.audio}
              videoStatus={roomStore.publishTracksReport.video}
              screenStatus={roomStore.publishTracksReport.screen}
            />
            <SwitchPanel
              // session={roomStore.session}
              audioDeviceId={roomStore.audioDeviceId}
              videoDeviceId={roomStore.videoDeviceId}
              roomStore={roomStore}
            />
            <Grid
              item
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={8}
                className={classes.content}
              >
                {Array.from(this.props.roomStore.users.values())
                  .filter(v => v.tracks.size !== 0 && v.id !== this.props.userStore.id)
                  .map(v =>
                    (<Grid key={v.id} item>
                      <UserPlayer menuStore={menuStore} user={v}/>
                    </Grid>)
                  )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              className={classes.footer}
              direction="row"
              justify="center"
              wrap="nowrap"
              alignItems="center"
              spacing={8}
            >
              <Grid item>
                <Tooltip
                    title="点击复制加会链接"
                    placement="top-end"
                  >
                    <IconButton
                      buttonRef={(ref) => {
                        if(ref) new Clipboard(ref);
                      }}
                      data-clipboard-text={window.location.href}
                    >
                      <ContentCopyIcon/>
                    </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                { publishedAudioTracks.length !== 0 ?
                (<Tooltip
                    title="麦克风"
                    placement="top-end"
                  >
                    <IconButton
                      onClick={ roomStore.toggleMutePublishedAudio }
                    >
                      {!publishedAudioTracks.some(v => !v.muted) ? <MicOff/> : <MicNone/> }
                    </IconButton>
                </Tooltip>) : <></> }
              </Grid>
              <Grid item>
                <Fab
                  onClick={this.handlePublish}
                  color={this.props.roomStore.publishedTracks.size > 0 ? "primary" : "default"}
                  classes={{
                    primary: this.props.classes.activeFab,
                  }}
                >
                  <PhoneIcon/>
                </Fab>
              </Grid>
              <Grid item>
                { publishedCameraTracks.length !== 0 ?
                (<Tooltip
                    title="摄像头"
                    placement="top-end"
                  >
                    <IconButton
                      onClick={ roomStore.toggleMutePublishedCamera }
                    >
                      {!publishedCameraTracks.some(v => !v.muted) ? <VideocamOffIcon/> : <VideocamIcon/> }
                    </IconButton>
                </Tooltip>) : <></> }
              </Grid>
              <Grid item>
                { publishedScreenTracks.length !== 0 ?
                (<Tooltip
                    title="屏幕分享"
                    placement="top-end"
                  >
                    <IconButton
                      onClick={ roomStore.toggleMutePublishedScreen }
                    >
                      {!publishedScreenTracks.some(v => !v.muted) ? <StopScreenShareIcon/> : <ScreenShareIcon/> }
                    </IconButton>
                </Tooltip>) : <></> }
              </Grid>
              <Grid item className={classes.holder}>
                {/* <Tooltip
                  title="麦克风"
                  placement="top-end"
                >
                  <IconButton
                    onClick={ roomStore.toggleDisplayMergePanel }
                  >
                    Merge
                  </IconButton>
                </Tooltip> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/* {
        roomStore.displayMergePanel && (
          <div className={classes.sidebar}>
            <MergePanel roomStore={this.props.roomStore} />
          </div>
        )
      } */}
      
    </div>);
  }
}

export default withStyles(styles)(Room);
