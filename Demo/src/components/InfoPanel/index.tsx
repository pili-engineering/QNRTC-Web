
import React from 'react';
import classes from './index.module.css';
import { TrackStatsReport } from 'pili-rtc-web';

interface InfoPanelProp {
  audioStatus: TrackStatsReport | null;
  videoStatus: TrackStatsReport | null;
  screenStatus: TrackStatsReport | null;
  isMobile: Boolean
}

export default (props: InfoPanelProp) => (
<div className={`${props.isMobile ? classes.infoPanelMobile : classes.infoPanel}`}>
  <div className={classes.infoPanelContent}>
    <div>
      <div>视频丢包率</div><span>{ props.videoStatus ? Number(props.videoStatus.packetLossRate * 100).toFixed(2) : "0.00" } %</span>
    </div>
    <div>
      <div>音频丢包率</div><span>{ props.audioStatus ? Number(props.audioStatus.packetLossRate * 100).toFixed(2) : "0.00" } %</span>
    </div>
    <div>
      <div>屏幕分享丢包率</div><span>{ props.screenStatus ? Number(props.screenStatus.packetLossRate * 100).toFixed(2) : "0.00" } %</span>
    </div>
    <div>
      <div>视频实时码率</div><span>{ props.videoStatus ? Number(props.videoStatus.bitrate / 1000).toFixed(2) : "0.00" } kbps</span>
    </div>
    <div>
      <div>音频实时码率</div><span>{ props.audioStatus ? Number(props.audioStatus.bitrate / 1000).toFixed(2) : "0.00" } kbps</span>
    </div>
    <div>
      <div>屏幕分享实时码率</div><span>{ props.screenStatus ? Number(props.screenStatus.bitrate / 1000).toFixed(2) : "0.00" } kbps</span>
    </div>
  </div>
</div>);
