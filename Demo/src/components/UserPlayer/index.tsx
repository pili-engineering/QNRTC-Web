import React from "react";
import User from '../../models/User';

import { observer } from 'mobx-react';
import AudioWave from '../AudioWave';
import Track from "../../models/Track";
import classes from './index.module.css';

interface Props {
  user?: User;
  local?: boolean;
  screen?: boolean;
  tracks?: Track[];
}

interface State {
}

@observer
export default class UserPlayer extends React.Component<Props, State> {

  handlePlayerDom(track: Track, ref: HTMLDivElement | null) {
    if (!ref) return;
    if (track.rtcTrack.mediaElement && track.rtcTrack.mediaElement.parentElement === ref) return;
    track.rtcTrack.play(ref);
  }

  handleTrackFullScreen(track: Track) {
    const videoElement = track.rtcTrack.mediaElement;
    if (!videoElement) return;
    videoElement.requestFullscreen();
  }

  render() {
    const { tracks: tracksProp, user, local } = this.props;
    let tracks = tracksProp;
    if (user) tracks = Array.from(user.tracks.values());
    if (!tracks) {
      throw Error('require tracks or user')
    }
    if (tracks.length === 0) return '';
    let camera: Track | undefined;
    let share: Track | undefined;
    let audioTrack: Track | undefined;
    for (const track of tracks) {
      const tag = track.rtcTrack.info.tag;
      if (tag ==='camera' && !track.muted) {
        camera = track;
      } else if (tag === 'screen' && !track.muted) {
        share = track;
      } else if (track.rtcTrack.info.kind === 'audio'){
        audioTrack = track;
      }
    }
    if (!share && !camera) {
      camera = tracks.find(v => v.rtcTrack.info.kind === 'video' && !v.muted);
    }
    if ((!share && !camera)) {
      return (<div className={classes.root} style={{ backgroundColor: local ? "#212121" : undefined }}>
          { !local && audioTrack && <p className={classes.userName}>{audioTrack.userId}</p> }
          { !local && audioTrack && <AudioWave width={200} height={150} color="#66ccff" track={audioTrack.rtcTrack} /> }
          { !local && audioTrack && <div ref={this.handlePlayerDom.bind(this, audioTrack)}></div> }
        </div>);
    }
    return (<div className={classes.root + ' ' +(this.props.screen ? classes.screen : classes.zoom)}>
          { share ? <div onDoubleClick={() => this.handleTrackFullScreen(share as Track)} ref={this.handlePlayerDom.bind(this, share)}></div> : '' }
          { camera ? <div onDoubleClick={() => this.handleTrackFullScreen(camera as Track)} ref={this.handlePlayerDom.bind(this, camera)}></div> : '' }
          { !local && audioTrack ? <div ref={this.handlePlayerDom.bind(this, audioTrack)}></div>  : '' }
         </div>);
  }
}