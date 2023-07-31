/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { RouteComponentProps } from 'react-router';
import request from '../../common/request';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { RoomStore } from '../../stores/roomStore';
import { MergeOptions, UserMergeConfig, TrackOption } from '../../components/UserMergeConfig';
import { FLV_PATH, HLS_PATH, API } from '../../common/api';
import flvjs from 'flv.js';

import styles from './style.module.css';
import { MessageStore } from '../../stores/messageStore';
import { UserStore } from '../../stores/userStore';
import { verifyRoomId, timeout, retrying } from '../../common/utils';
import { QNRenderMode, QNTranscodingLiveStreamingTrack } from "qnweb-rtc";
import { ResumePlay } from "../../components/ResumePlay";
interface Params {
  roomid: string;
}

interface State {
  showDialog: boolean;
}

interface Props extends RouteComponentProps<Params> {
  roomStore: RoomStore;
  routerStore: RouterStore;
  messageStore: MessageStore;
  userStore: UserStore;
  isMobile: Boolean;
}

let flvPlayer: any;

@inject('roomStore', 'routerStore', 'messageStore', 'userStore', 'isMobile')
@observer
export default class LivePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDialog: false
    };
  }
  public video = React.createRef<HTMLDivElement>();;
  private stopRetrying?: (err?: any) => void;

  public async componentDidMount(): Promise<void> {
    const roomid = this.props.match.params.roomid;
    if (!verifyRoomId(roomid)) return this.props.routerStore.push('/');
    if (!this.props.roomStore.token) {
      this.props.roomStore.setId(roomid);
      const data = await request(`${API.LIST_USERS(this.props.roomStore.appId, roomid)}`);

      if (data.users.length === 0) {
        this.props.messageStore.hideLoading();
        this.props.messageStore.showAlert({
          show: true,
          title: '找不到会议直播',
          content: '请确认该房间是否有其他用户发布流',
        });
        return;
      }
      const hasAdmin = data.users.find((user: any) => user.userId === 'admin');
      if (!hasAdmin && this.props.userStore.id !== 'admin') {
        this.props.userStore.setIdNoStore('admin');
      }
      await this.props.roomStore.joinRoom(await this.props.roomStore.fetchRoomToken(), "", "live-streaming");
    }
    this.fetchStream();
  }

  componentWillUnmount() {
    if (this.stopRetrying) this.stopRetrying();
    if (flvPlayer) flvPlayer.destroy && flvPlayer.destroy();
    this.props.roomStore.leaveRoom();
    this.props.messageStore.hideLoading();
  }

  private fetchStream() {
    this.props.messageStore.showLoading('获取直播流...');
    const liveURL = HLS_PATH(this.props.match.params.roomid);

    let config = {
      id: "livedemo",
      url:liveURL,
      // @ts-ignore
      type: QNPlayer.QNMediaType.HLS,
      videoInit: true,
      width: "100vw",
      height: "100vh"
    }
    // @ts-ignore
    flvPlayer = new QNPlayer.CreatePlayer(config);
    // @ts-ignore
    flvPlayer.on("complete", () => {
      flvPlayer.play().catch(() => {
        this.setState({
          showDialog: true
        });
      })

      this.props.messageStore.hideLoading();
    })
    // @ts-ignore
    flvPlayer.on("error", (data) => {
      this.props.messageStore.hideLoading();
        this.props.messageStore.showAlert({
        show: true,
        title: '找不到会议直播',
        content: '请确认该房间是否有其他用户发布流',
      });
    })
  }
  handleResumePlay() {
    flvPlayer && flvPlayer.play().then(() => this.setState({showDialog: false}));
  }

  public render(): JSX.Element {
    const { isMobile } = this.props;
    return (
      <div className={`${styles.container} ${isMobile ? styles.containerMobile : ''}`}>
        <ResumePlay open={this.state.showDialog} handleResumePlay={this.handleResumePlay.bind(this)}/>
        <p className={styles.roomName}>房间名称: {this.props.match.params.roomid}</p>
        <div className={`${isMobile ? styles.videoMobileContainer : styles.videoContainer}`}>
          <div id="livedemo"></div>
        </div>
      </div>
    );
  }
}
