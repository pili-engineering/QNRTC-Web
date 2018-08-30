/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { waitResponse } from '../../utils';
import { inject, observer } from 'mobx-react';
import { AppStore, RouterStore } from '../../stores';
import { MergeOptions, UserMergeConfig } from '../../components';
import { LIVE_HOST, HLS_HOST } from '../../constants';
import flvjs from 'flv.js';

import * as styles from './style.css';

interface Params {
  roomName: string;
}

interface State {
}

interface Props extends RouteComponentProps<Params> {
  app: AppStore;
  router: RouterStore;
}

@inject('app', 'router')
@observer
export class LivePage extends React.Component<Props, State> {
  public video: HTMLVideoElement;
  public flvPlayer: any;

  public async componentDidMount(): Promise<void> {
    if (!this.props.app.roomToken) {
      await this.props.app.enterRoom(this.props.match.params.roomName, undefined, true);
    }
    this.fetchStream();
  }

  public componentWillUnmount(): void {
    this.props.app.leaveRoom(true);
  }

  private fetchStream(): void {
    const ua = navigator.userAgent.toLowerCase();
    const isSafari = ((ua.indexOf('safari') !== -1) && (ua.indexOf('chrome') === -1));
    this.props.app.errorStore.showLoading({ show: true, content: "获取直播流..." });
    const liveURL = isSafari ? HLS_HOST(this.props.match.params.roomName) : LIVE_HOST(this.props.match.params.roomName);
    waitResponse(liveURL, 10000).then(() => {
      if (isSafari) {
        this.props.app.errorStore.closeLoading();
        this.video.autoplay = true;
        this.video.controls = true;
        this.video.muted = true;
        this.video.src = liveURL;
        this.video.oncanplay = () => {
          this.video.play();
        };
        this.video.play();
        return;
      }
      this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: liveURL,
          isLive: true,
      });
      this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
        this.fetchStream();
      });
      this.flvPlayer.attachMediaElement(this.video);
      this.flvPlayer.load();
      this.flvPlayer.play();
      this.props.app.errorStore.closeLoading();
    }).catch(e => {
      this.props.app.errorStore.closeLoading();
      this.props.app.errorStore.showAlert({
        show: true,
        title: '找不到会议直播',
        content: '请确认该房间是否有其他用户发布流',
      });
    });
  }

  private handleMergeChange(userId: string, options: MergeOptions): void {
    this.props.app.setMergeOptions(userId, options);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <p className={styles.roomName}>房间名称: {this.props.match.params.roomName}</p>
        <div className={styles.videoContainer}>
          <video
            ref={ref => this.video = ref}
          />
        </div>
        {this.props.app.liveRoomAdmin && <div className={styles.users}>
          <p className={styles.configTitle}>合流设置</p>
          { this.props.app.pubilshedUser.map(user => (
            <UserMergeConfig
              userId={user.userId}
              onMergeChange={this.handleMergeChange.bind(this)}
            />
          )) }
        </div>}
      </div>
    );
  }
}
