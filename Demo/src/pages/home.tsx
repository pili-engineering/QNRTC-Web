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
import { version as SDKVersion } from "pili-rtc-web";
import { UserStore } from '../stores/userStore';
import { RoomStore } from '../stores/roomStore';
import { RouterStore } from 'mobx-react-router';
import { verifyRoomId, verifyUserId, getColorFromUserId } from '../common/utils';
import { MessageStore } from '../stores/messageStore';
import { PublishRecordOptions } from '../common/config';
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
  enhance: boolean;
  selected: number;
  joinRoomStep: number;
}

@inject('routerStore', 'userStore', 'roomStore', 'messageStore', 'isMobile')
@observer
class Home extends Component<Props, State> {


  private fileinput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  state: State;

  constructor(props: Props) {
    super(props);
    let selected = 0;
    for (let i = 0; i < PublishRecordOptions.length; i++) {
      if (this.props.roomStore.selectTracks[i]) {
        selected = selected | (1 << i)
      }
    }
    this.state = {
      userid: props.userStore.id,
      roomid: props.roomStore.id,
      roomToken: '',
      enhance: false,
      // 0b00010 -> 音频通话
      // 0b00011 -> 音视频通话
      // 0b00101 -> 视频通话 + 音频文件
      // 0b01011 -> 音视频通话 + 屏幕共享
      // 0b10011 -> 音视频通话 + 窗口共享
      selected: selected || 0b00011, // 0b00011
      joinRoomStep: props.userStore.id ? 1 : 0,
    };
  }

  // 选择要发布的流 此函数调试用，可以忽略
  handleTrackChange = (index: number) => async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { key, config } = PublishRecordOptions[index];
    let selected = this.state.selected ^ (1 << index);
    if (checked) {
      if (key === 'buffer_audio') {
        if (this.fileinput.current) {
          this.fileinput.current.value = '';
          this.fileinput.current.click();
          const file: File = await new Promise((resovle, reject) => {
            if (this.fileinput.current) {
              this.fileinput.current.addEventListener('change', (e: Event) => {
                e.target && (e.target as any).files ? resovle((e.target as any).files[0] as File) : reject();
              });
            }
          });
          config.audio = {
            enabled: true,
            source: file,
          };
        }
      }
      if (index < 1) {
        // 忽略
      } else if (index < 3) {
        // 不允许同时选中 index 1 音频（麦克风）或 2 音频（外部数据导入）
        selected = ~(0b00110 ^ (1 << index)) & selected;
      } else {
        // 不允许同时选中 index 3 屏幕共享 或 4 窗口共享
        selected = ~(0b11000 ^ (1 << index)) & selected;
      }
    }
    for (let i = 0; i < PublishRecordOptions.length; i++) {
      // 选择配置文件
      if (selected & (1 << i)) {
        this.props.roomStore.selectTracks[i] = PublishRecordOptions[i].config;
      } else {
        this.props.roomStore.selectTracks[i] = undefined;
      }
    }
    const state = { ...this.state };
    state.selected = selected;
    this.setState(state);
  };

  handleRadioChange = async (event: React.ChangeEvent<{}>, value: string) => {
    let selected = parseInt(value, 2);

    for (let i = 0; i < PublishRecordOptions.length; i++) {
      const { key, config } = PublishRecordOptions[i]
      if (selected & (1 << i)) {
        // 二进制按位与运算 计算是否已选择
        if (key === 'buffer_audio') {
          if (this.fileinput.current) {
            this.fileinput.current.value = '';
            this.fileinput.current.click();
            const file: File = await new Promise((resovle, reject) => {
              if (this.fileinput.current) {
                this.fileinput.current.addEventListener('change', (e: Event) => {
                  e.target && (e.target as any).files ? resovle((e.target as any).files[0] as File) : reject();
                });
              }
            });
            config.audio = {
              enabled: true,
              source: file,
            };
          }
        }
        // 配置文件置入已选择
        this.props.roomStore.selectTracks[i] = config;
      } else {
        // 未选择置空配置文件
        this.props.roomStore.selectTracks[i] = undefined;
      }
    }
    const state = { ...this.state };
    state.selected = selected;
    this.setState(state);
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
        this.props.messageStore.showLoading();
      } else if (type === 'live') {
        this.props.routerStore.push(`/live/${roomid}`);
        this.props.messageStore.showLoading();
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
    const { enhance } = this.state;
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
                  value={this.state.selected.toString(2).padStart(PublishRecordOptions.length, '0')}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel value="00010" control={<Radio />} label="音频通话" />
                  <FormControlLabel value="00011" control={<Radio />} label="音视频通话" />
                  { !isMobile && <FormControlLabel value="00101" control={<Radio />} label="视频通话 + 音频文件" />}
                  { !isMobile && <FormControlLabel value="01011" control={<Radio />} label="音视频通话 + 屏幕共享" />}
                  { !isMobile && <FormControlLabel value="10011" control={<Radio />} label="音视频通话 + 窗口共享" />}
                </RadioGroup>
              </FormControl>
              <Grow
                in={enhance}
                style={{ transformOrigin: '0 0 0', display: enhance ? 'flex' : 'none' }}
                {...(enhance ? { timeout: 1000 } : {})}
              >
                <FormControl>
                  <FormLabel className={classes.formLabel}>选择要发布的流</FormLabel>
                  <FormGroup
                    row
                    className={classes.radioGroup}
                  >
                    {PublishRecordOptions.map((val, key) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Switch
                            checked={(this.state.selected & (1 << key)) !== 0}
                            onChange={this.handleTrackChange(key)}
                            value={key}
                          />
                        }
                        label={val.label}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grow>
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
                <p>SDK Version: {SDKVersion}-{process.env.REACT_APP_LATEST_COMMIT_HASH}</p>
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
