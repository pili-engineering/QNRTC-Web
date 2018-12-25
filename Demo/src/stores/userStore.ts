import { observable, action, computed } from 'mobx';
import store from 'store';

export class UserStore {

  /** session.userId */
  @observable
  public id: string = store.get('userid') || '';

  @computed
  public get isAdmin() {
    return this.id === 'admin';
  }

  @action
  public setId(userId: string) {
    this.id = userId;
    store.set('userid', userId)
  }
}

export default new UserStore();
