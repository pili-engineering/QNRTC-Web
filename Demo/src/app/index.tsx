import * as React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { hot } from "react-hot-loader";
import { Router, Route, Switch } from "react-router";
import { Root } from "app/containers/Root";

import { HomePage } from "./containers/HomePage";
import { RoomPage } from "./containers/RoomPage";
import { LivePage } from "./containers/LivePage";

import { theme } from "./theme";

import "./styles/index.css";

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/roomtoken" component={HomePage} exact />
          <Route path="/room/:roomName" component={RoomPage} />
          <Route path="/live/:roomName" component={LivePage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Root>
));
