import React, { Component, FormEvent } from 'react';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Grid,
  Button,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Grow,
  IconButton,
  InputLabel,
  Switch,
  ButtonBase,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Input from '../components/Input';
import "../styles/home.css";

import { observer, inject } from 'mobx-react';
import { UserStore } from '../stores/userStore';
import { RoomStore } from '../stores/roomStore';
import { RouterStore } from 'mobx-react-router';
import { verifyId, decodeAudioFileToBuffer, getColorFromUserId } from '../common/utils';
import { MessageStore } from '../stores/messageStore';
import {  PublishRecordOptions } from '../common/config';
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
  },
  root: {
    overflow: 'hidden',
    height: '100vh',
    minHeight: '700px',
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit}px`,
    },
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 2}px`,
    },
    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacing.unit * 3}px`,
    },
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
  link: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '10px',
  },
});

interface Props extends WithStyles<typeof styles> {
  routerStore: RouterStore;
  userStore: UserStore;
  roomStore: RoomStore;
  messageStore: MessageStore;
}

interface State {
  userid: string;
  roomid: string;
  roomToken: string;
  enhance: boolean;
  selected: number;
  joinRoomStep: number;
}

@inject('routerStore', 'userStore', 'roomStore', 'messageStore')
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
      selected: selected || 3, // 0b00011
      joinRoomStep: props.userStore.id ? 1 : 0,
    };
  }

  handleTrackChange = (index: number) => async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { key, config } = PublishRecordOptions[index];
    let selected = this.state.selected ^ (1 << index);
    if (checked) {
      if (key === 'buffer_audio') {
        if (this.fileinput.current) {
          this.fileinput.current.click();
          const file: File = await new Promise((resovle, reject) => {
            if (this.fileinput.current) {
              this.fileinput.current.addEventListener('change', (e: Event) => {
                e.target && (e.target as any).files ? resovle((e.target as any).files[0] as File) : reject();
              });
            }
          });
          const buffer = await decodeAudioFileToBuffer(file);
          (config.audio as any).audioBuffer = buffer;
        }
      }
      if (index < 3) {
        selected = ~(7 ^ (1 << index)) & selected;
      } else if (index < 5) {
        selected = ~(24 ^ (1 << index)) & selected;
      } else {
        selected = ~(96 ^ (1 << index)) & selected;
      }
    }
    for (let i = 0; i < PublishRecordOptions.length; i++) {
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

    for(let i = 0; i < PublishRecordOptions.length; i++) {
      const { key, config } = PublishRecordOptions[i]
      if (selected & (1 << i)) {
        if (key === 'buffer_audio') {
          if (this.fileinput.current) {
            this.fileinput.current.click();
            const file: File = await new Promise((resovle, reject) => {
              if (this.fileinput.current) {
                this.fileinput.current.addEventListener('change', (e: Event) => {
                  e.target && (e.target as any).files ? resovle((e.target as any).files[0] as File) : reject();
                });
              }
            });
            const buffer = await decodeAudioFileToBuffer(file);
            (config.audio as any).audioBuffer = buffer;
          }
        }
        this.props.roomStore.selectTracks[i] = config;
      } else {
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
    const isValidUserid = verifyId(userid);
    const isValidRoomid = verifyId(roomid);
    if (!isValidUserid && isValidRoomid) {
      this.showMessage('用户名最少 3 个字符，并且只能包含字母、数字或下划线');
      return false;
    }
    if (!isValidRoomid && isValidUserid) {
      this.showMessage('房间名最少 3 个字符，并且只能包含字母、数字或下划线');
      return false;
    }
    if (!isValidRoomid && !isValidUserid) {
      this.showMessage('用户名和房间名最少 3 个字符，并且只能包含字母、数字或下划线');
      return false;
    }
    return true;
  }

  handleNext = (e: FormEvent) => {
    e.preventDefault();
    const { userid, roomid, roomToken } = this.state;
    if (roomToken) {
      return this.props.routerStore.push('/room/?roomToken=' + roomToken);
    }
    if (this.state.joinRoomStep === 0) {
      const isValidUserid = verifyId(userid);
      if (!isValidUserid) {
        this.showMessage('用户名最少 3 个字符，并且只能包含字母、数字或下划线');
        return;
      }
      this.props.userStore.setId(userid);
      this.setState({ joinRoomStep: 1 });
      return;
    } else {
      const isValidRoomid = verifyId(roomid);
      if (!isValidRoomid) {
        this.showMessage('房间名最少 3 个字符，并且只能包含字母、数字或下划线');
        return;
      }
      this.props.roomStore.setId(roomid);
      this.props.routerStore.push('/room/' + roomid);
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
    const { classes } = this.props;
    const { enhance } = this.state;
    return (
      <>
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid
            style={{
              pointerEvents: this.state.joinRoomStep !== 0 ? "auto" : "none",
              opacity: this.state.joinRoomStep !== 0 ? 1 : 0,
            }}
            item container wrap="nowrap" justify="flex-end" spacing={16}>
            <IconButton style={{ zIndex: 10, position: "relative" }} onClick={ () => this.props.routerStore.push('/settings') }>
              <SettingsIcon color="inherit"/>
            </IconButton>
          </Grid>
          <Grid item container wrap="nowrap" direction="column" justify="center" spacing={16}>
            <Grid item container wrap="nowrap" justify="center" spacing={16}>
              <Grid item>
                {this.props.userStore.id ? <Avatar style={{
                  backgroundColor: getColorFromUserId(this.props.userStore.id)
                }} className={classes.avatar}>{this.props.userStore.id[0].toUpperCase()}</Avatar> :
                  <Avatar className={classes.avatar} src={qiniu}></Avatar>
                }
                <p className="home_user">{ this.props.userStore.id ? `账户名称: ${this.props.userStore.id}` : ''}</p>
              </Grid>
            </Grid>
            <form id="home" onSubmit={this.handleNext}>
           { this.props.routerStore.location.pathname === '/roomtoken' ?
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
              { this.state.joinRoomStep === 0 && <Grid item container wrap="nowrap" justify="center" spacing={16}>
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
              </Grid> }
              { this.state.joinRoomStep === 1 && <Grid item container wrap="nowrap" justify="center" spacing={16}>
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
              </Grid> }
            </>)
              }
            </form>
            { this.state.joinRoomStep === 1 && <Grid item container wrap="nowrap" justify="center" spacing={16}>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <RadioGroup
                    className={classes.radioGroup}
                    name="mode"
                    row
                    value={this.state.selected.toString(2).padStart(PublishRecordOptions.length ,'0')}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel value="00010" control={<Radio />} label="音频通话" />
                    <FormControlLabel value="00011" control={<Radio />} label="音视频通话" />
                    <FormControlLabel value="00101" control={<Radio />} label="视频通话 + 音频文件" />
                    <FormControlLabel value="01011" control={<Radio />} label="音视频通话 + 屏幕共享" />
                    <FormControlLabel value="10011" control={<Radio />} label="音视频通话 + 窗口共享" />
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
            </Grid> }
            <Grid item container wrap="nowrap" justify="center" spacing={16}>
              <Grid item>
                <ButtonBase
                  focusRipple
                  type="submit"
                  form="home"
                  className="home_btn"
                >
                  { this.state.joinRoomStep === 0 ? "下一步" : "会议房间" }
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container wrap="nowrap" justify="flex-end" spacing={16}>
            <Grid container wrap="nowrap" justify="flex-start" spacing={16}>
              <Grid item>
                <p className={classes.link}>构建时间: {process.env.REACT_APP_BUILD_DATE}</p>
              </Grid>
            </Grid>
            <Grid container wrap="nowrap" justify="flex-end" spacing={16}>
              <Grid item>
              { this.props.routerStore.location.pathname === '/roomtoken' ?
                <Link className={classes.link} to="/">使用房间名</Link> :
                <Link className={classes.link} to="/roomtoken">使用 roomToken</Link>
              }
              </Grid>
            </Grid>
          </Grid>
          <img className="niu" src={niu} />
        </Grid>
        <input
          ref={this.fileinput}
          type="file"
          style={{ display: 'none' }}
          accept=".mp3, .ogg"
        />
      </>
    );
  }
}

export default withStyles(styles)(Home);