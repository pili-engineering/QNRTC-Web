import * as React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import { hot } from "react-hot-loader";
import { Router, Route, Switch } from "react-router";
import { Root } from "app/containers/Root";

import { HomePage } from "./containers/HomePage";
import { RoomPage } from "./containers/RoomPage";

import { theme } from "./theme";

import "./styles/index.css";

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/room/:roomName" component={RoomPage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Root>
));
