import { observable, action } from 'mobx';
import store from 'store';
import { RecordOptions } from '../constants';

interface RecordOption {
  key: string;
  config: MediaStreamConstraints;
}

export class ConfigStore {
  @observable
  public userId: string;

  @observable
  public recordOption: RecordOption;

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
        config: RecordOptions['720p'],
        key: '720p',
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
}
