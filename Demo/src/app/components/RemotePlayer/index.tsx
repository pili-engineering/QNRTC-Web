/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMBP>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import MicIcon from 'material-ui-icons/Mic';
import MicOffIcon from 'material-ui-icons/MicOff';

import * as styles from './style.css';

interface Props {
  id?: string
  userId: string;
  streamId: string | null;
  muteAudio?: boolean;
  muteVideo?: boolean;
  color: string;
  onVideoReady: (video: HTMLVideoElement, streamid: string) => any;
  onContextMenu: (e: any) => any;
}

interface State {
}

export class RemotePlayer extends React.Component<Props, State> {
  public video: HTMLVideoElement;

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    console.log('componetDidMount');
    this.props.onVideoReady(this.video, this.props.userId);
  }

  private handleDoubleClick = () => {
    if (!this.props.streamId || this.props.muteVideo) {
      return;
    }

    if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  public render(): JSX.Element {
    return (
        <div
          className={styles.container}
          onContextMenu={this.props.onContextMenu}
          onDoubleClick={this.handleDoubleClick}
          style={{
            background: !!this.props.streamId ? this.props.color : '#9E9E9E',
          }}
          id={this.props.id}
        >
          { !this.props.muteAudio ? <MicIcon className={styles.mic} /> : <MicOffIcon className={styles.mic} /> }
          <video
            autoPlay
            ref={ref => this.video = ref}
            style={{
              visibility: !!this.props.streamId && !this.props.muteVideo ? 'visible' : 'hidden',
            }}
          />
          <p className={styles.user}>{this.props.userId}</p>
        </div>
    );
  }
}
