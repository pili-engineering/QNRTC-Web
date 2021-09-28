
import React from 'react';
import classes from './index.module.css';
import { QNLocalAudioTrackStats, QNLocalVideoTrackStats } from 'qnweb-rtc';

interface InfoPanelProp {
  audioStatus: QNLocalAudioTrackStats | null;
  videoStatus: QNLocalVideoTrackStats | null;
  screenStatus: QNLocalVideoTrackStats | null;
  isMobile: Boolean;
}

export default (props: InfoPanelProp) => (
  <div className={`${props.isMobile ? classes.infoPanelMobile : classes.infoPanel}`}>
    <div className={classes.infoPanelContent}>
      <div>
        <div>视频丢包率</div><span>{props.videoStatus ? Number(props.videoStatus.uplinkLostRate * 100).toFixed(2) : "0.00"} %</span>
      </div>
      <div>
        <div>音频丢包率</div><span>{props.audioStatus ? Number(props.audioStatus.uplinkLostRate * 100).toFixed(2) : "0.00"} %</span>
      </div>
      <div>
        <div>屏幕分享丢包率</div><span>{props.screenStatus ? Number(props.screenStatus.uplinkLostRate * 100).toFixed(2) : "0.00"} %</span>
      </div>
      <div>
        <div>视频实时码率</div><span>{props.videoStatus ? Number(props.videoStatus.uplinkBitrate / 1000).toFixed(2) : "0.00"} kbps</span>
      </div>
      <div>
        <div>音频实时码率</div><span>{props.audioStatus ? Number(props.audioStatus.uplinkBitrate / 1000).toFixed(2) : "0.00"} kbps</span>
      </div>
      <div>
        <div>屏幕分享实时码率</div><span>{props.screenStatus ? Number(props.screenStatus.uplinkBitrate / 1000).toFixed(2) : "0.00"} kbps</span>
      </div>
    </div>
  </div>);
