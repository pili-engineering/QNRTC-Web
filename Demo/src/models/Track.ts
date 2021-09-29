import { QNLocalTrack, QNTrack as RTCTrack } from "qnweb-rtc";
import { observable, action } from 'mobx';

/**
 * 包裹 qnweb-rtc 的 QNTrack 属性
 */
export default class Track {
  public rtcTrack: RTCTrack;
  @observable
  public muted: boolean;
  @observable
  public trackID: string;
  @observable
  public tag?: string;
  @observable
  public userID?: string;

  public constructor(track: RTCTrack) {
    this.rtcTrack = track;
    this.muted = track.isMuted();
    this.trackID = track.trackID as string;
    this.tag = track.tag;
    this.userID = track.userID;
  }

  @action
  public updateTrack(): void {
    this.muted = this.rtcTrack.isMuted();
    this.trackID = this.rtcTrack.trackID as string;
    this.tag = this.rtcTrack.tag;
    this.userID = this.rtcTrack.userID;
  }

  @action.bound
  public toggleMute(): void {
    if (!(this.rtcTrack instanceof QNLocalTrack)) return;
    this.rtcTrack.setMuted(!this.muted);
    this.updateTrack();
  }
}