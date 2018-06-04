import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { RouterStore, ErrorStore, RoomStore, AppStore, ConfigStore } from 'app/stores';
import { App } from 'app';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
const errorStore = new ErrorStore();
const configStore = new ConfigStore();
const rootStore = {
  router: new RouterStore(history),
  app: new AppStore(errorStore, configStore),
  room: new RoomStore(errorStore),
  error: errorStore,
};

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);
