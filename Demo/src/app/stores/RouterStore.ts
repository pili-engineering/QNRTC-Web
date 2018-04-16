import { History } from 'history';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore,
} from 'mobx-react-router';

export class RouterStore extends BaseRouterStore {
  public constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }
}

export default RouterStore;
