
import React from 'react';
import classes from './index.module.css';

interface InfoPanelProp {
  appid: string;
  audioBitrate: number;
  audioPackageLossRate: number;
  videoBitrate: number;
  videoPackageLossRate: number;
}

export default (props: InfoPanelProp) => (
<div className={classes.infoPanel}>
  <button className={classes.infoPanelClose} title="close">[x]</button>
  <div className={classes.infoPanelContent}>
    <div>
      <div>APPID</div><span>{ props.appid }</span>
    </div>
    <div>
      <div>视频丢包率</div><span>{ props.videoPackageLossRate } %</span>
    </div>
    <div>
      <div>音频丢包率</div><span>{ props.audioPackageLossRate } %</span>
    </div>
    <div>
      <div>视频实时码率</div><span>{ props.videoBitrate } kbps</span>
    </div>
    <div>
      <div>音频实时码率</div><span>{ props.audioBitrate } kbps</span>
    </div>
  </div>
</div>);
