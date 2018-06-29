import { observable, action } from 'mobx';
import store from 'store';
import { RecordConfig } from "pili-rtc-web";
import { asyncAction } from "mobx-utils";
import { RecordOptions, RTC_APP_ID } from '../constants';
import { request } from "../utils/request";
import { API } from "../constants";

interface RecordOption {
  key: string;
  config: RecordConfig;
}

export class ConfigStore {
  @observable
  public userId: string;

  @observable
  public recordOption: RecordOption;

  @observable
  public appId: string = RTC_APP_ID;

  public mergeStreamWidth: number = 480;
  public mergeStreamHeight: number = 848;

  public constructor() {
    const userId = store.get('userid');
    if (userId) {
      this.userId = userId;
    }

    const record = store.get('record');
    if (record) {
      this.recordOption = record;
    } else {
      this.recordOption = {
        config: RecordOptions['640*480'],
        key: '640*480',
      };
    }
  }

  @action
  public setUserId(value: string): void {
    this.userId = value;
    store.set('userid', value);
  }

  @action
  public setRecordOption(value: RecordOption): void {
    this.recordOption = value;
    store.set('record', value);
  }

  @asyncAction
  public *setAppId(value: string): any {
    try {
      const res = yield request(API.GET_APP_CONFIG(value), 'json');
      this.mergeStreamHeight = res.mergePublishRtmp.height;
      this.mergeStreamWidth = res.mergePublishRtmp.width;
    } catch (e) {
      console.log(e);
      throw new Error(`输入的 AppId 无效, ${e.toString()}`);
    }
    this.changeAppId(value);
  }

  @action
  public changeAppId(value: string): void {
    this.appId = value;
  }
}
