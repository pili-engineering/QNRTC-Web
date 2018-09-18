/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
  show: boolean;
  users: string[];
  onClose: () => any;
  onEnter: (url: string, targetUser: string) => any;
}

interface State {
  url: string;
  targetUser: string;
}

// 用户名不可能存在 @
export const ALL_USER = "@all";

export class RTMPInput extends React.Component<Props, State> {
  public input: HTMLInputElement;

  public state: State = {
    url: "",
    targetUser: ALL_USER,
  };

  private handleEnter = () => {
    if (this.state.url) {
      this.props.onEnter(this.state.url, this.state.targetUser);
    }
  }

  private checkURL = () => {
    if (this.state.url.startsWith("rtmp://")) {
      return true;
    } else {
      return false;
    }
  }

  private handleTargetChange = (e: any) => {
    this.setState({
      targetUser: e.target.value,
    });
  }

  public render(): JSX.Element {
    return (
      <Dialog open={this.props.show} onClose={this.props.onClose}>
        <DialogTitle>自定义转推任务</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>选择需要转推的用户流</FormLabel>
            <RadioGroup
              row
              value={this.state.targetUser}
              onChange={this.handleTargetChange}
            >
              <FormControlLabel label="全部用户" value={ALL_USER} control={<Radio />} />
              { this.props.users.map(user => (
                <FormControlLabel label={user} value={user} control={<Radio />} key={user} />
              )) }
            </RadioGroup>
            <TextField
              margin="dense"
              label="推流地址(rtmp 开头)"
              type="text"
              fullWidth
              value={this.state.url}
              onChange={e => { this.setState({ url: e.target.value }); }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            取消
          </Button>
          <Button disabled={!this.checkURL()} onClick={this.handleEnter} color="primary" autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
