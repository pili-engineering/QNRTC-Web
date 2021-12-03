import * as React from 'react';
import Home from './pages/home';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';

import * as stores from "./stores"
import './App.css';
import { createBrowserHistory } from 'history';
import Settings from './pages/settings';
import Layout from './layouts';
import { lazyConfirmLoading } from './components/ConfirmLoading';
import Room from './pages/room';
import SupportDialog from './components/SupportDialog';

/**
 * lazyConfirmLoading cause an error when request screen sharing in Safari:
 *   Unhandled Promise Rejection: InvalidAccessError: getDisplayMedia must be called from a user gesture handler.
 * So we'll use Room component directly.
 */
const LazyRoom = lazyConfirmLoading({
  lazy: import('./pages/room'),
  title: '加入会议房间',
  content: '我们将采集您的摄像头/麦克风数据并与房间其他用户进行音视频通话',
});
const LazyLivePage = lazyConfirmLoading({
  lazy: import('./pages/live'),
  title: '加入直播房间',
  content: '只有同名会议房间有人发布的情况下才能观看直播，进入前请确认该房间已经有人发布',
});

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: '#34AADC',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#34AADC',
      contrastText: '#FAFAFA',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

const isMobile = () => {
  return navigator.userAgent.match(/mobile/i) !== null
}
if (process.env.NODE_ENV === 'development') (window as any).__STORES__ = stores;
const providerData = {
  ...stores,
  isMobile: isMobile()
}

let windowWidth = `${window.innerWidth}px`;
let windowHeight = `${window.innerHeight}px`;

const getWindowConfig = () => {
  if (document.compatMode === 'CSS1Compat') {
    windowWidth = `${document.documentElement.clientWidth}px`;
    windowHeight = `${document.documentElement.clientHeight}px`;
  } else {
    windowWidth = `${document.body.clientWidth}px`;
    windowHeight = `${document.body.clientHeight}px`;
  }
  const ua = navigator.userAgent;
  if (ua.indexOf("MicroMessenger") > -1) {
    (windowHeight as any) = '100vh'
  }
}
if (isMobile()) {
  getWindowConfig()
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider {...providerData}>
        <div className={isMobile() ? 'qnMobile' : ''} style={{ height: windowHeight }}>
          <Layout
            messageStore={providerData.messageStore}
            menuStore={providerData.menuStore}
          >
            <SupportDialog />
            <Router history={history}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={Home}
                />
                <Route
                  path="/roomtoken"
                  component={Home}
                  exact
                />
                <Route
                  path="/room/:roomid?"
                  component={Room}
                />
                <Route
                  path="/live/:roomid"
                  render={LazyLivePage}
                />
                <Route
                  path="/settings"
                  component={Settings}
                />
                <Redirect to="/" />
              </Switch>
            </Router>
          </Layout>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
