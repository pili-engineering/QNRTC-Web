/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMBP>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import { Stream } from 'pili-rtc-web';
import MicIcon from 'material-ui-icons/Mic';
import MicOffIcon from 'material-ui-icons/MicOff';
import { AudioWave } from '../AudioWave';

import * as styles from './style.css';

interface Props {
  id?: string;
  userId: string;
  stream?: Stream;
  color: string;
  onContextMenu: (e: any) => any;
}

interface State {
}

export class RemotePlayer extends React.Component<Props, State> {
  public video: HTMLVideoElement | HTMLAudioElement;

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    if (this.props.stream) {
      this.props.stream.play(this.video);
    }
  }

  public componentDidUpdate(props: Props): void {
    if (this.props.stream && !props.stream) {
      this.props.stream.play(this.video);
    }
  }

  private handleDoubleClick = () => {
    if (!this.props.stream || this.props.stream.muteVideo) {
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
            background: this.props.stream && !this.props.stream.isDestroyed ? this.props.color : '#9E9E9E',
          }}
          id={this.props.id}
        >
          { this.props.stream && !this.props.stream.muteAudio ? <MicIcon className={styles.mic} /> : <MicOffIcon className={styles.mic} /> }
          { this.props.stream && this.props.stream.enableVideo ?
            <video
              ref={ref => this.video = ref}
              style={{
                visibility: !!this.props.stream && !this.props.stream.muteVideo ? 'visible' : 'hidden',
              }}
            /> :
            <audio
              ref={ref => this.video = ref}
            />
          }
          { this.props.stream && !this.props.stream.isDestroyed && <AudioWave
            className={styles.wave}
            color={this.props.color}
            width={200}
            height={150}
            stream={this.props.stream}
          /> }
          <p className={styles.user}>{this.props.userId}</p>
        </div>
    );
  }
}
