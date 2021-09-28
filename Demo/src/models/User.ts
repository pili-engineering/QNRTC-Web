import { QNRemoteTrack, QNRemoteUser as RTCUser } from "qnweb-rtc";
import { observable, action } from 'mobx';
import Track from './Track';

/**
 * 包裹 qnweb-rtc 的 QNRemoteUser 对象
 */
export default class User {

  private rtcUser: RTCUser;

  @observable
  public id: string;

  @observable
  public tracks: Map<string, Track> = new Map();

  @observable
  public publishedTracks: Map<string, QNRemoteTrack> = new Map();

  public constructor(user: RTCUser) {
    this.rtcUser = user;
    this.id = user.userID;
  }

  @action
  public addPublishedTrack(track: QNRemoteTrack): void {
    this.publishedTracks.set(track.trackID as string, track);
  }

  @action
  public removePublishedTrack(track: QNRemoteTrack): void {
    this.publishedTracks.delete(track.trackID as string);
  }

  @action
  public updateTracks(tracks: Track[]): void {
    for (const track of tracks) {
      this.tracks.set(track.trackID as string, track);
    }
  }

  @action
  public updateTrack(key: string, v: Track): void {
    this.tracks.delete(key);
    this.tracks.set(key, v);
  }

}
