import * as React from 'react';
import Avatar from 'react-avatar';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import UndoIcon from '@material-ui/icons/Undo';
import IconButton from '@material-ui/core/IconButton';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { RoomStore, AppStore, RouterStore } from '../../stores';
import ButtonBase from '@material-ui/core/ButtonBase';
import { RecordOptions, RTC_APP_ID } from '../../constants';
import { piliRTC } from '../../models/pili';


import * as styles from './style.css';

interface Props {
  room: RoomStore;
  app: AppStore;
  router: RouterStore;
}

interface State {
  roomName: string;
  userName: string;
  recordkey: string;
  appId: string;
  config: boolean;
  roomToken: string;
}

@inject('room', 'app', 'router')
@observer
export class HomePage extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      roomName: props.app.roomName || '',
      userName: '',
      recordkey: props.app.config.recordOption.key,
      appId: props.app.config.appId === RTC_APP_ID ? "" : props.app.config.appId,
      config: false,
      roomToken: '',
    };
  }

  private handleLogin = (userId: string) => {
    this.props.app.login(userId);
  }

  private handleJoinRoom = async (roomToken?: string) => {
    try {
      if (roomToken) {
        await this.props.app.enterRoom(undefined, roomToken);
        this.props.router.push(`/room/${piliRTC.roomName}`);
        return;
      }
      const roomName = this.state.roomName;
      await this.props.app.enterRoom(roomName, roomToken);
      this.props.router.push(`/room/${roomName}`);
    } catch (e) {
    }
  }

  private handleNext = async (e: any) => {
    e.preventDefault();
    const roomTokenMode = this.props.router.location.pathname === "/roomtoken";
    if (!roomTokenMode && this.state.userName && !this.state.userName.match(/^[a-zA-Z0-9_-]{3,64}$/)) {
      this.props.app.errorStore.showToast({
        show: true,
        content: "用户名最少 3 个字符，并且只能包含字母、数字或下划线",
      });
      return;
    }
    if (!roomTokenMode && this.state.roomName && !this.state.roomName.match(/^[a-zA-Z0-9_-]{3,64}$/)) {
      this.props.app.errorStore.showToast({
        show: true,
        content: "房间名最少 3 个字符，并且只能包含字母、数字或下划线",
      });
      return;
    }
    if (this.state.config) {
      if (!!this.state.userName) {
        this.props.app.config.setUserId(this.state.userName);
      }
      this.props.app.config.setRecordOption({
        key: this.state.recordkey,
        config: RecordOptions[this.state.recordkey],
      });
      if (this.state.appId) {
        this.props.app.config.setAppId(this.state.appId).then().catch(e => {
          this.props.app.errorStore.showAlert({
            show: true,
            title: '设置AppId失败',
            content: e.toString(),
          });
        });
      } else if (this.props.app.config.appId !== RTC_APP_ID) {
        this.props.app.config.setAppId(RTC_APP_ID).then().catch(e => {
          this.props.app.errorStore.showAlert({
            show: true,
            title: '设置AppId失败',
            content: e.toString(),
          });
        });
      }

      this.setState({
        config: false,
        userName: "",
      });
      return;
    }
    if (roomTokenMode) {
      await this.handleJoinRoom(this.state.roomToken);
      return;
    }
    if (!this.props.app.userId) {
      this.handleLogin(this.state.userName);
    } else {
      await this.handleJoinRoom();
    }
  }

  private handleJoinLiveRoom = async (): Promise<void> => {
    const roomName = this.state.roomName;
    await this.props.app.enterRoom(roomName, undefined, true);
    this.props.router.push(`/live/${roomName}`);
  }

  private handleSwitchConfig = () => {
    this.setState({
      config: !this.state.config,
    });
  }

  private renderInput = () => {
    if (this.props.router.location.pathname === '/roomtoken') {
      return this.renderRoomTokenInput();
    }
    if (this.state.config) {
      return (
        <div>
          <div
            className={styles.input}
          >
            <input
              value={this.state.userName}
              onChange={e => this.setState({userName: e.target.value}) }
              placeholder="修改用户名"
              id="modify_username"
            />
          </div>
          <p className={styles.hint}>名称中带有 admin 字段的用户会被分配管理员权限</p>
          <div
            className={styles.input}
          >
            <select
              value={this.state.recordkey}
              id="record_options"
              onChange={e => this.setState({recordkey: e.target.value}) }
            >
              {Object.keys(RecordOptions).map(key => (
                <option value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div
            className={styles.input}
          >
            <input
              value={this.state.appId}
              onChange={e => this.setState({appId: e.target.value}) }
              placeholder="修改APP_ID"
              id="modify_appid"
            />
          </div>
        </div>
      );

    }
    if (!this.props.app.userId) {
      return (
        <div>
          <div
            className={styles.input}
          >
            <input
              value={this.state.userName}
              onChange={e => this.setState({userName: e.target.value}) }
              placeholder="给自己起个名字吧"
              id="username_input"
              required
            />
          </div>
          <p className={styles.hint}>名称中带有 admin 字段的用户会被分配管理员权限</p>
        </div>
      );
    } else {
      return (
        <div
          className={styles.input}
        >
          <input
            value={this.state.roomName}
            onChange={e => this.setState({roomName: e.target.value})}
            placeholder="输入房间名称加入房间"
            id="roomname_input"
            required
          />
        </div>
      );
    }
  }

  public renderRoomTokenInput(): JSX.Element {
    return (
      <div
        className={styles.input}
      >
        <input
          value={this.state.roomToken}
          onChange={e => this.setState({roomToken: e.target.value}) }
          placeholder="请输入 roomToken"
          id="roomtolen_input"
          required
        />
      </div>
    );
  }

  public render(): JSX.Element {
    const userId = this.props.app.userId;
    return (
      <div className={styles.page}>
        <img src={require('../../../assets/images/niu.svg')} alt="" className={styles.niu} />
        <IconButton
          onClick={this.handleSwitchConfig}
          className={styles.configIcon}
          id="config"
        >
          { this.state.config ? <UndoIcon /> : <SettingsIcon /> }
        </IconButton>
        <div className={styles.main}>
          { this.props.app.userId ?
            <Avatar
              name={this.props.app.userId}
              color={this.props.app.userColor}
              className={styles.title}
            /> :
            <img className={styles.title} src={require('../../../assets/images/qiniu.png')} alt="" />
          }
          <p className={styles.user} id="username">{ userId ? `账户名称: ${this.props.app.userId}` : ''}</p>
          <form
            onSubmit={this.handleNext}
            id="home"
          >
            { this.renderInput() }
          </form>
          { userId && !this.state.config && <p className={styles.hint}>如果房间尚未创建，将会自动创建一个房间</p> }
          <ButtonBase
            className={styles.btn}
            focusRipple
            form="home"
            type="submit"
            id="next_button"
          >
            { this.state.config ? '完成' : (!!userId ? '会议房间' : '下一步') }
          </ButtonBase>
          { !this.state.config && this.props.app.userId && <ButtonBase
            className={styles.btn}
            focusRipple
            onClick={this.handleJoinLiveRoom}
            id="live_button"
          >
            直播房间
          </ButtonBase> }
        </div>
        { this.props.router.location.pathname === '/roomtoken' ?
          <Link className={styles.link} to="/">使用房间名</Link> :
          <Link className={styles.link} to="/roomtoken">使用 roomToken</Link>
        }
        <p className={styles.build}>构建时间: {process.env.BUILD_TIME}</p>
      </div>
    );
  }
}
