/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import * as styles from './style.css';

interface Props {
  userId?: string;
  onLogin: (userId: string) => void;
}

interface State {
  showLogin: boolean;
  userId: string;
}

export class Header extends React.Component<Props, State> {
  state = {
    showLogin: false,
    userId: '',
  }

  handleLogin = () => {
    this.setState({
      showLogin: true,
    })
  }

  handleLoginEnter = () => {
    this.props.onLogin(this.state.userId);
    this.handleLoginCancel();
  }

  handleLoginCancel = () => {
    this.setState({
      showLogin: false,
    })
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={styles.title}>
            Qiniu RTC Demo
          </Typography>
          <div className={styles.header_blank} />
          <Button color="inherit" onClick={this.handleLogin}>{this.props.userId || '登录'}</Button>
        </Toolbar>
        <Dialog
          open={this.state.showLogin}
          onClose={this.handleLoginCancel}
        >
          <DialogTitle>登录</DialogTitle>
          <DialogContent>
            <DialogContentText>请输入一个用户标识</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={this.state.userId}
              onChange={(e) => this.setState({ userId: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLoginCancel} color="primary">
              取消
            </Button>
            <Button onClick={this.handleLoginEnter} color="primary">
              登录
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    );
  }
}
