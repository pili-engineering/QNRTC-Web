import { User as RTCUser, TrackBaseInfo } from "pili-rtc-web";
import { observable, action } from 'mobx';
import Track from './Track';

/**
 * 包裹 pili-rtc-web 的 User 对象
 * 将属性置为 observable
 */
export default class User {
  private rtcUser: RTCUser;
  @observable
  public id: string;
  @observable
  public tracks: Map<string, Track> = new Map();
  @observable
  public publishedTrackInfo: Map<string, TrackBaseInfo> = new Map();

  public constructor(user: RTCUser) {
    this.rtcUser = user;
    this.id = user.userId;
    console.log('publishedTrackInfo:', user.publishedTrackInfo)
    for (const trackInfo of user.publishedTrackInfo) {
      console.log('trackInfo:', trackInfo)
      this.publishedTrackInfo.set(trackInfo.trackId as string, trackInfo);
    }
  }

  @action
  public updateUser(): void {
    this.id = this.rtcUser.userId;
    const publishedTrackInfo = new Map<string, TrackBaseInfo>();
    for (const trackInfo of this.rtcUser.publishedTrackInfo) {
      publishedTrackInfo.set(trackInfo.trackId as string, trackInfo);
    }
    this.publishedTrackInfo = publishedTrackInfo;
  }

  @action
  public addPublishedTrackInfo(track: TrackBaseInfo): void {
    this.publishedTrackInfo.set(track.trackId as string, track);
  }

  @action
  public removePublishedTrackInfo(track: TrackBaseInfo): void {
    this.publishedTrackInfo.delete(track.trackId as string);
  }

  @action
  public updateTracks(tracks: Track[]): void {
    for (const track of tracks) {
      this.tracks.set(track.trackId as string, track);
    }
  }

  @action
  public updateTrack(key: string, v: Track): void {
    // Mobx set not observable?
    this.tracks.delete(key);
    this.tracks.set(key, v);
  }
}
