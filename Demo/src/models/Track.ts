import { Track as RTCTrack } from "pili-rtc-web";
import { observable, action } from 'mobx';
import { roomStore } from "../stores";

/**
 * 包裹 pili-rtc-web 的 Track 属性
 */
export default class Track {
  public rtcTrack: RTCTrack;
  @observable
  public muted?: boolean;
  @observable
  public trackId: string;
  @observable
  public tag?: string;
  @observable
  public userId?: string;
  @observable
  public mediaTrack: MediaStreamTrack;

  public constructor(track: RTCTrack) {
    this.rtcTrack = track;
    this.muted = track.info.muted;
    this.trackId = track.info.trackId as string;
    this.tag = track.info.tag;
    this.userId = track.userId;
    this.mediaTrack = track.mediaTrack;
  }

  @action
  public updateTrack(): void {
    this.muted = this.rtcTrack.info.muted;
    this.trackId = this.rtcTrack.info.trackId as string;
    this.tag = this.rtcTrack.info.tag;
    this.userId = this.rtcTrack.userId;
    this.mediaTrack = this.rtcTrack.mediaTrack;
  }

  @action.bound
  public toggleMute(): void {
    roomStore.session.muteTracks([{ trackId: this.trackId, muted: !this.muted }]);
    this.updateTrack();
  }
}