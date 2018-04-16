import * as React from 'react';
import Avatar from 'react-avatar';
import SettingsIcon from 'material-ui-icons/Settings';
import UndoIcon from 'material-ui-icons/Undo';
import IconButton from 'material-ui/IconButton';
import { inject, observer } from 'mobx-react';
import { RoomStore, AppStore, RouterStore } from '../../stores';
import ButtonBase from 'material-ui/ButtonBase';
import { RecordOptions } from '../../constants';


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
  config: boolean;
}

@inject('room', 'app', 'router')
@observer
export class HomePage extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    console.log(props);
    this.state = {
      roomName: '',
      userName: '',
      recordkey: props.app.config.recordOption.key,
      config: false,
    };
  }

  private handleLogin = (userId: string) => {
    this.props.app.login(userId);
  }

  private handleJoinRoom = async () => {
    try {
      const roomName = this.state.roomName;
      await this.props.app.enterRoom(roomName, true);
      this.props.router.push(`/room/${roomName}`);
    } catch (e) {
    }
  }

  private handleNext = async (e: any) => {
    e.preventDefault();
    if (this.state.config) {
      if (!!this.state.userName) {
        this.props.app.config.setUserId(this.state.userName);
      }
      this.props.app.config.setRecordOption({
        key: this.state.recordkey,
        config: RecordOptions[this.state.recordkey],
      });

      this.setState({
        config: false,
        userName: "",
      });
      return;
    }
    if (!this.props.app.userId) {
      this.handleLogin(this.state.userName);
    } else {
      await this.handleJoinRoom();
    }
  }

  private handleSwitchConfig = () => {
    this.setState({
      config: !this.state.config,
    });
  }

  private renderInput = () => {
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
        </div>
      );

    }
    if (!this.props.app.userId) {
      return (
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
          { userId && <p className={styles.hint}>如果房间尚未创建，将会自动创建一个房间</p> }
          <ButtonBase
            className={styles.btn}
            focusRipple
            form="home"
            type="submit"
            id="next_button"
          >
            { this.state.config ? '完成' : (!!userId ? '进入房间' : '下一步') }
          </ButtonBase>
        </div>
      </div>
    );
  }
}
