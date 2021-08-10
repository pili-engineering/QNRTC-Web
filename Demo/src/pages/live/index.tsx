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
import { TrackMergeOptions } from 'pili-rtc-web';

interface Params {
  roomid: string;
}

interface State {
}

interface Props extends RouteComponentProps<Params> {
  roomStore: RoomStore;
  routerStore: RouterStore;
  messageStore: MessageStore;
  userStore: UserStore;
  isMobile: Boolean
}

@inject('roomStore', 'routerStore', 'messageStore', 'userStore', 'isMobile')
@observer
export default class LivePage extends React.Component<Props, State> {
  public video = React.createRef<HTMLVideoElement>();;
  public flvPlayer?: flvjs.Player;
  private stopRetrying?: (err?: any) => void;

  public async componentDidMount(): Promise<void> {
    const roomid = this.props.match.params.roomid;
    if (!verifyRoomId(roomid)) return this.props.routerStore.push('/');
    if (!this.props.roomStore.token) {
      this.props.roomStore.setId(roomid);
      const data = await request(`${API.LIST_USERS(this.props.roomStore.appId, roomid)}`);
      if(data.users.length === 0) {
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
      await this.props.roomStore.joinRoom(await this.props.roomStore.fetchRoomToken());
    }
    this.fetchStream();
  }

  componentWillUnmount() {
    if (this.stopRetrying) this.stopRetrying();
    if (this.flvPlayer) this.flvPlayer.unload();
    this.props.roomStore.leaveRoom();
    this.props.messageStore.hideLoading();
  }

  private fetchStream() {
    const ua = navigator.userAgent.toLowerCase();
    const isSafari = ((ua.indexOf('safari') !== -1) && (ua.indexOf('chrome') === -1));
    if(isSafari) { return this.fetchStreamSafari(); }
    else { return this.fetchStreamDefault(); }
  }

  private fetchStreamDefault() {
    this.props.messageStore.showLoading('获取直播流...');
    const liveURL = FLV_PATH(this.props.match.params.roomid);

    const video = this.video.current;
    if (!video) return;
    this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: liveURL,
        isLive: true,
    });
    this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
      this.fetchStreamDefault();
    });
    this.flvPlayer.on(flvjs.Events.METADATA_ARRIVED, () => {
      this.props.messageStore.hideLoading();
    });
    this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
      this.fetchStreamDefault();
    });
    this.flvPlayer.on(flvjs.Events.ERROR, (err, details) => {
      if (err === flvjs.ErrorTypes.NETWORK_ERROR) {
        if (this.flvPlayer) this.flvPlayer.detachMediaElement()
        console.log('flv NETWORK_ERROR')
        this.props.messageStore.hideLoading();
        this.props.messageStore.showAlert({
          show: true,
          title: '找不到会议直播',
          content: '请确认该房间是否有其他用户发布流',
        });
      }
    })
    this.flvPlayer.attachMediaElement(video);
    this.flvPlayer.load();
    video.oncanplay = () => {
      video.play()
        .catch((err) => {
          console.log('video.play Error', err);
          video.controls = true;
        });
    };
  }

  private fetchStreamSafari() {
    this.props.messageStore.showLoading('获取直播流...');
    const liveURL = HLS_PATH(this.props.match.params.roomid);
    if (this.stopRetrying) this.stopRetrying();
    retrying((stop) => {
      this.stopRetrying = stop;
      return fetch(liveURL)
        .then(() => {
          const video = this.video.current;
          if (!video) return;
          video.autoplay = true;
          video.src = liveURL;
          video.oncanplay = () => {
            video.play()
              .catch(() => {
                video.controls = true;
              });
          };
          this.props.messageStore.hideLoading();
        })
        .catch(() => {
          return timeout(1000);
        })
    }, 10000)
      .catch(() => {
        this.props.messageStore.hideLoading();
        this.props.messageStore.showAlert({
          show: true,
          title: '找不到会议直播',
          content: '请确认该房间是否有其他用户发布流',
        });
      });
  }

  private handleMergeChange(options: MergeOptions): void {
    const addConfig: TrackMergeOptions[] = [];
    const removeConfig = [];
    for(const value of Object.values(options) as TrackOption[]) {
      if (!value) continue;
      if (value.enabled) {
        const config: TrackMergeOptions = {
          trackId: value.trackId as string,
          x: Number(value.x),
          y: Number(value.y),
          z: Number(value.z),
          w: Number(value.w),
          h: Number(value.h),
          stretchMode: value.stretchMode
        };
        addConfig.push(config);
      } else {
        removeConfig.push(value.trackId);
      }
    }
    this.props.roomStore.session.addMergeStreamTracks(addConfig);
    if (removeConfig.length > 0) {
      this.props.roomStore.session.removeMergeStreamTracks(removeConfig);
    }
  }

  public render(): JSX.Element {
    const { isMobile } = this.props;
    return (
      <div className={`${styles.container} ${isMobile ? styles.containerMobile : ''}`}>
        <p className={styles.roomName}>房间名称: {this.props.match.params.roomid}</p>
        <div className={`${isMobile ? styles.videoMobileContainer : styles.videoContainer }`}>
          <video
            ref={this.video}
            autoPlay
          />
        </div>
        {this.props.userStore.isAdmin && <div className={`users ${isMobile ? styles.usersMobile : '' }`}>
          <p className={styles.configTitle}>合流设置</p>
          { Array.from(this.props.roomStore.users.values()).map(user => (
            <UserMergeConfig
              key={user.id}
              user={user}
              onMergeChange={this.handleMergeChange.bind(this)}
            />
          )) }
        </div>}
      </div>
    );
  }
}
