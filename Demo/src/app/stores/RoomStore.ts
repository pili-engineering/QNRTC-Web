import { observable } from 'mobx';
import { ErrorStore } from './ErrorStore';
import { asyncAction } from 'mobx-utils';
import { request } from '../utils';
import { API } from '../constants';

interface ListRoomResponse {
  end: boolean;
  offset: number;
  rooms: string[];
}

export class RoomStore {
  public readonly limit: number;
  public readonly errorStore: ErrorStore;

  @observable
  public rooms: string[];

  @observable
  public offset: number;

  @observable
  public end: boolean;

  @observable
  public pending: boolean;

  public constructor(errorStore: ErrorStore) {
    this.limit = 10;
    this.rooms = [];
    this.end = false;
    this.pending = false;
    this.errorStore = errorStore;
  }

  @asyncAction
  public *fetchRooms(): any {
    if (this.end) {
      return;
    }
    this.pending = true;
    const path = `${API.LIST_ROOM}?offset={this.offset}&limit={this.limit}`;
    try {
      const res: ListRoomResponse = yield request(path);

      this.offset = res.offset;
      this.end = res.end;
      this.rooms = this.rooms.concat(res.rooms);
      this.pending = false;
    } catch (e) {
      this.errorStore.showToast({
        show: true,
        content: e.message,
      });
      this.pending = false;
      throw e;
    }
  }

  @asyncAction
  public *refresh(): any {
    this.rooms = [];
    this.end = false;
    this.offset = 0;
    yield this.fetchRooms();
  }
}
