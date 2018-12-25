import {
  Avatar,
  Fab,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Menu,
  MenuItem,
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
  VideocamOff as VideocamOffIcon,
} from '@material-ui/icons';
import Clipboard from 'clipboard';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { RoomState, Track as RTCTrack } from 'pili-rtc-web';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { verifyId, getTrackNmae } from '../common/utils';
import { RoomStore } from '../stores/roomStore';
import { UserStore } from '../stores/userStore';
import UserPlayer from '../components/UserPlayer';
import qs from 'qs';
import Track from '../models/Track'
import User from '../models/User'
import { MessageStore } from '../stores/messageStore';

const styles = (theme: Theme) => createStyles({
  root: {
    overflow: 'hidden',
    padding: 0,
    height: '100vh',
    width: '100vw',
    color: '#fff',
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
  },
  content: {
    padding: `0 ${theme.spacing.unit * 3}px`,
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
});

interface RoomRouterProps {
  roomid: string;
}

interface Props extends WithStyles<typeof styles> {
  routerStore: RouterStore;
  userStore: UserStore;
  roomStore: RoomStore;
  messageStore: MessageStore;
}

interface State {
  dialogOpen: boolean;
  dialogText: string;
  anchorEl?: null | HTMLElement | ((element: HTMLElement) => HTMLElement),
  menulist: MenuItemProps[],
}


@inject('routerStore', 'userStore', 'roomStore', 'messageStore')
@observer
class Room extends Component<Props & RouteComponentProps<RoomRouterProps>, State> {

  state: State = {
    dialogOpen: true,
    dialogText: "获取 RoomToken",
    anchorEl: null,
    menulist: [],
  };

  async componentDidMount() {
    const roomid = this.props.match.params.roomid;
    const qsobj = qs.parse(this.props.routerStore.location.search.substr(1));
    if (!qsobj.roomToken && !verifyId(roomid)) return this.props.routerStore.push('/');
    if (this.props.roomStore.state !== RoomState.Idle) {
      this.setState({ dialogOpen: false });
      return;
    }

    let token = qsobj.roomToken;
    if (!token) {
      this.props.roomStore.setId(roomid);
      token = await this.props.roomStore.fetchRoomToken();
    }
    if (!token) {
      return this.props.routerStore.push('/');
    }
    console.log('token: ' + token);
    this.setState({ dialogText: "加入房间中" });
    await this.props.roomStore.joinRoom(token);
    this.doPublish();
    this.props.roomStore.subscribeAll().catch(e => {
      console.log(e);
      this.props.messageStore.showAlert({
        show: true,
        title: '订阅失败',
        content: '自动订阅失败，请手动订阅',
      });
    });
  }

  componentWillUnmount() {
    this.props.roomStore.leaveRoom();
  }

  doPublish = () => {
    this.setState({ dialogText: "发布中" });
    this.props.roomStore.publishSelected().then(() => {
      this.setState({ dialogOpen: false });
    }).catch(e => {
      console.log(e);
      this.setState({ dialogOpen: false });
      switch (e.code) {
        case 11010:
          this.props.messageStore.showAlert({
            show: true,
            title: '没有权限',
            content: '获取摄像头/麦克风权限被拒绝，请手动打开摄像头/麦克风权限后重新进入房间',
          });
          break;
        case 11009:
          this.props.messageStore.showAlert({
            show: true,
            title: 'Chrome 插件异常',
            content: '您可能没有安装录屏插件或者录屏插件没有升级，请到这里安装最新的录屏插件 https://doc.qnsdk.com/rtn/web/docs/screen_share#1',
          });
          break;
        case 11008:
          this.props.messageStore.showAlert({
            show: true,
            title: '浏览器不支持',
            content: '抱歉，您的浏览器不支持屏幕共享，请使用 Chrome 或者 Firefox',
          });
          break;
        case 11013:
          this.props.messageStore.showAlert({
            show: true,
            title: '获取录屏权限被拒绝',
            content: '请刷新页面手动重新发布',
          });
          break;
        default:
          this.props.messageStore.showAlert({
            show: true,
            title: '没有数据',
            content: `无法获取摄像头/麦克风数据，错误代码: ${e.name}`,
          });
      }
    });

  } 

  handleMenuClose = () => { this.setState({ anchorEl: null, menulist: [] }) };


  handlePublish = async () => {
    if (this.props.roomStore.publishedTracks.size === 0) {
      this.doPublish();
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
    this.setState({ anchorEl: e.target as HTMLElement, menulist });
  }

  render() {
    const { classes, roomStore } = this.props;
    const { anchorEl } = this.state;
    const publishedAudioTracks = roomStore.publishedAudioTracks;
    const publishedVideoTracks = roomStore.publishedVideoTracks;
    return (
    <div className={classes.root}>
      <div className={classes.screen}>
        <UserPlayer screen local tracks={Array.from(roomStore.publishedTracks.values())}/>
      </div>
      <Grid
        className={classes.zoom}
        container
        direction="column"
        justify="space-between"
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
            >
              房间：{this.props.roomStore.id} ({this.props.roomStore.appId})
            </Grid>
            <Grid
              item
              sm={8}
              xs={6}
              direction="row-reverse"
              container
            >
              { Array.from(this.props.roomStore.users.values()).map(v => {
                return (
                <Grid item xl={2} md={3} sm={6} xs={12} key={v.id}>
                <Chip
                  avatar={<Avatar>{v.id.substr(0, 1).toUpperCase()}</Avatar>}
                  label={v.id}
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
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={8}
            className={classes.content}
          >
            {Array.from(this.props.roomStore.users.values())
              .filter(v => v.tracks.size !== 0 && v.id !== this.props.userStore.id)
              .map(v => {
                return (<Grid key={v.id} item>
                  <UserPlayer user={v}/>
                </Grid>)
              })}
          </Grid>
          <Grid
            item
            container
            className={classes.header}
            direction="row"
            justify="center"
            alignItems="center"
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
              { publishedVideoTracks.length !== 0 ?
              (<Tooltip
                  title="视频"
                  placement="top-end"
                >
                  <IconButton
                    onClick={ roomStore.toggleMutePublishedVideo }
                  >
                    {!publishedVideoTracks.some(v => !v.muted) ? <VideocamOffIcon/> : <VideocamIcon/> }
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
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={this.state.dialogOpen}
      >
        <DialogContent>
          <Grid
            container
            spacing={16}
            alignItems="center"
          >
            <Grid item>
              <CircularProgress size={40} className={classes.progress}/>
            </Grid>
            <Grid item xs={12} sm>
              <DialogContentText className={classes.dialogContentText}>{this.state.dialogText}</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
        id="context_menu"
      >
        {this.state.menulist.map((menu, key) => (
          <MenuItem
            {...menu}
            className="context_menuitem"
            key={key}
          />
        ))}
      </Menu>
    </div>);
  }
}

export default withStyles(styles)(Room);
