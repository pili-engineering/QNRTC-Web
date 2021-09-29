import { observable, action, computed } from 'mobx';
import store from 'store';

export class UserStore {

  /** session.userID */
  @observable
  public id: string = store.get('userid') || '';

  @computed
  public get isAdmin() {
    return this.id === 'admin';
  }

  @action
  public setId(userID: string) {
    this.id = userID;
    store.set('userid', userID)
  }

  @action
  public setIdNoStore(userID: string) {
    this.id = userID;
  }
}

export default new UserStore();
