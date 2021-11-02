import React, { Component, FormEvent } from 'react';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Grid,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Grow,
  IconButton,
  Switch,
  ButtonBase,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Input from '../components/Input';
import "../styles/home.css";

import { observer, inject } from 'mobx-react';
import QNRTC from "qnweb-rtc";
import { UserStore } from '../stores/userStore';
import { RoomStore, TrackCreateMode } from '../stores/roomStore';
import { RouterStore } from 'mobx-react-router';
import { verifyRoomId, verifyUserId, getColorFromUserId } from '../common/utils';
import { MessageStore } from '../stores/messageStore';
import { Link } from 'react-router-dom';
import niu from '../assets/niu.svg';
import qiniu from '../assets/qiniu.png';


const styles = (theme: Theme) => createStyles({
  avatar: {
    margin: 14,
    width: 100,
    height: 100,
    fontSize: 32,
  },
  button: {
    margin: theme.spacing.unit,
    width: 500,
    height: 55,
  },
  root: {
    overflowX: 'hidden',
    overflowY: 'scroll',
    height: '100vh',
    padding: `${theme.spacing.unit}px`,
  },
  wrapper: {
    maxWidth: 400,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formLabel: {
    textAlign: 'center',
  },
  radioGroup: {
    justifyContent: 'center',
    width: 500,
  },
  linkWrap: {
    display:'flex',
    justifyContent: 'space-between',
    padding: '30px 20px 0'
  },
  linkRight: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '10px',
    lineHeight: '16px',
    bottom: '16px',
    right: '16px',
  },
  linkLeft: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '10px',
    lineHeight: '16px',
    bottom: '16px',
    left: '16px',
    '& > p': {
      margin: "1px 0 0 0"
    }
  },
});

interface Props extends WithStyles<typeof styles> {
  routerStore: RouterStore;
  userStore: UserStore;
  roomStore: RoomStore;
  messageStore: MessageStore;
  isMobile: Boolean
}

interface State {
  userid: string;
  roomid: string;
  roomToken: string;
  // enhance: boolean;
  // selected: number;
  joinRoomStep: number;
}

@inject('routerStore', 'userStore', 'roomStore', 'messageStore', 'isMobile')
@observer
class Home extends Component<Props, State> {


  private fileinput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      userid: props.userStore.id,
      roomid: props.roomStore.id,
      roomToken: '',
      joinRoomStep: props.userStore.id ? 1 : 0,
    };
  }

  handleRadioChange = async (event: React.ChangeEvent<{}>, value: string) => {
    this.props.roomStore.setSelectedTrackCreateMode(value as TrackCreateMode);
  };

  showMessage = this.props.messageStore.show;

  verifyState = (): boolean => {
    const { userid, roomid } = this.state;
    const isValidUserid = verifyUserId(userid);
    const isValidRoomid = verifyRoomId(roomid);
    if (!isValidUserid && isValidRoomid) {
      this.showMessage('用户名限制 3~50 个字符，并且只能包含字母、数字或下划线');
      return false;
    }
    if (!isValidRoomid && isValidUserid) {
      this.showMessage('房间名限制 3~64 个字符，并且只能包含字母、数字或下划线');
      return false;
    }
    if (!isValidRoomid && !isValidUserid) {
      this.showMessage('用户名 3~50 个字符、房间名 3~64 个字符，并且只能包含字母、数字或下划线');
      return false;
    }
    return true;
  }

  handleNext(type: string, e: FormEvent) {
    const { userid, roomid, roomToken } = this.state;
    if (roomToken) {
      return this.props.routerStore.push('/room/?roomToken=' + roomToken);
    }
    if (this.state.joinRoomStep === 0) {
      const isValidUserid = verifyUserId(userid);
      if (!isValidUserid) {
        this.showMessage('用户名限制 3~50 个字符，并且只能包含字母、数字或下划线');
        return;
      }
      this.props.userStore.setId(userid);
      this.setState({ joinRoomStep: 1 });
      return;
    } else {
      const isValidRoomid = verifyRoomId(roomid);
      if (!isValidRoomid) {
        this.showMessage('房间名限制 3~64 个字符，并且只能包含字母、数字或下划线');
        return;
      }
      this.props.roomStore.setId(roomid);
      if (type === 'room') {
        this.props.routerStore.push(`/room/${roomid}`);
      } else if (type === 'live') {
        this.props.routerStore.push(`/live/${roomid}`);
      }
    }
  };

  handleLiveClick = () => {
    const { userid, roomid } = this.state;
    if (this.verifyState()) {
      this.props.userStore.setId(userid);
      this.props.roomStore.setId(roomid);
    }
  };

  render() {
    const { classes,isMobile } = this.props;
    // const { enhance } = this.state;
    return (
      <div className={classes.root}>
        <IconButton
          style={{
            pointerEvents: this.state.joinRoomStep !== 0 ? "auto" : "none",
            opacity: this.state.joinRoomStep !== 0 ? 1 : 0,
            zIndex: 10,
            top: '16px',
            right: '16px',
            position: 'absolute',
          }}
          onClick={() => this.props.routerStore.push('/settings')}
        >
          <SettingsIcon color="inherit" />
        </IconButton>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={16}
        >
          <Grid item container wrap="nowrap" justify="center" spacing={16}>
            <Grid item>
              {this.props.userStore.id ? <Avatar style={{
                backgroundColor: getColorFromUserId(this.props.userStore.id),
                color: '#FAFAFA',
              }} className={classes.avatar}>{this.props.userStore.id[0].toUpperCase()}</Avatar> :
                <Avatar className={classes.avatar} src={qiniu}></Avatar>
              }
              <p className="home_user">{this.props.userStore.id ? `账户名称: ${this.props.userStore.id}` : ''}</p>
            </Grid>
          </Grid>
          {this.props.routerStore.location.pathname === '/roomtoken' ?
            (<Grid item container wrap="nowrap" justify="center" spacing={16}>
              <Grid item>
                <FormControl className={classes.formControl} aria-describedby="roomid-text">
                  <Input
                    placeholder="请输入 roomToken"
                    value={this.state.roomToken}
                    onChange={(e) => this.setState({ roomToken: e.target.value })}
                  />
                </FormControl>
              </Grid>
            </Grid>) :
            (<>
              {this.state.joinRoomStep === 0 && <Grid item container wrap="nowrap" justify="center" spacing={16}>
                <Grid item>
                  <FormControl className={classes.formControl} aria-describedby="userid-text">
                    <Input
                      placeholder="请输入用户名"
                      value={this.state.userid}
                      onChange={(e) => this.setState({ userid: e.target.value })}
                    />
                    <p className="hint">名称为 admin 的用户会被自动分配管理员权限</p>
                  </FormControl>
                </Grid>
              </Grid>}
              {this.state.joinRoomStep === 1 && <Grid item container wrap="nowrap" justify="center" spacing={16}>
                <Grid item>
                  <FormControl className={classes.formControl} aria-describedby="roomid-text">
                    <Input
                      placeholder="请输入房间名"
                      value={this.state.roomid}
                      onChange={(e) => this.setState({ roomid: e.target.value })}
                    />
                    <p className="hint">如果房间尚未创建，将会自动创建一个房间</p>
                  </FormControl>
                </Grid>
              </Grid>}
            </>)}
          {this.state.joinRoomStep === 1 && <Grid item container wrap="nowrap" justify="center" spacing={16}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <RadioGroup
                  className={`${classes.radioGroup} radioGroup`}
                  name="mode"
                  row
                  value={this.props.roomStore.selectedTrackCreateMode}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel value={TrackCreateMode.A} control={<Radio />} label={TrackCreateMode.A}/>
                  <FormControlLabel value={TrackCreateMode.B} control={<Radio />} label={TrackCreateMode.B}/>
                  { !isMobile && <FormControlLabel value={TrackCreateMode.C} control={<Radio />} label={TrackCreateMode.C} />}
                  { !isMobile && <FormControlLabel value={TrackCreateMode.D} control={<Radio />} label={TrackCreateMode.D} />}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>}
          <Grid item container wrap="nowrap" justify="center" spacing={16}>
            <Grid item>
              <ButtonBase
                focusRipple
                onClick={this.handleNext.bind(this, 'room')}
                className="home_btn"
              >
                {this.state.joinRoomStep === 0 ? "下一步" : "会议房间"}
              </ButtonBase>
            </Grid>
          </Grid>
          {this.state.joinRoomStep === 0 ?
            <></> :
            <Grid item container wrap="nowrap" justify="center" spacing={16}>
              <Grid item>
                <ButtonBase
                  focusRipple
                  onClick={this.handleNext.bind(this, 'live')}
                  className="home_btn"
                >
                  直播房间
              </ButtonBase>
              </Grid>
            </Grid>}
            <div className={classes.linkWrap}>
              <div className={classes.linkLeft}>
                <p>构建时间: {process.env.REACT_APP_BUILD_DATE}</p>
                <p>App Version: {process.env.REACT_APP_VERSION}</p>
                <p>SDK Version: {QNRTC.VERSION}-{process.env.REACT_APP_LATEST_COMMIT_HASH}</p>
              </div>
              {this.props.routerStore.location.pathname === '/roomtoken' ?
                <Link className={classes.linkRight} to="/">使用房间名</Link> :
                <Link className={classes.linkRight} to="/roomtoken">使用 roomToken</Link>
              }
            </div>
        </Grid>
        <img className="niu" src={niu} />
        <input
          ref={this.fileinput}
          type="file"
          style={{ display: 'none' }}
          accept=".mp3, .ogg"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
