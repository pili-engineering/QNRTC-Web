import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import {
  Grid,
  IconButton,
  ButtonBase,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { createStyles,withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import Select from "../components/Select";
import Input from "../components/Input";
import { UserStore } from '../stores/userStore';
import { RoomStore } from '../stores/roomStore';
import { RouterStore } from 'mobx-react-router';
import { PublishRecordOptions, videoConfig, publishVideoConfigs } from '../common/config';

const styles = (theme: Theme) => createStyles({
  avatar: {
    margin: 14,
    width: 100,
    height: 100,
    fontSize: 32,
  },
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    overflow: 'hidden',
    padding: `${theme.spacing.unit * 3}px`,
  },
  wrapper: {
    maxWidth: 400,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formLabel: {
    textAlign: 'center',
  },
  radioGroup: {
    justifyContent: 'center',
  }
});

interface Props extends WithStyles<typeof styles> {
  routerStore: RouterStore;
  userStore: UserStore;
  roomStore: RoomStore;
}

interface State {
  userid: string;
  roomid: string;
  appid: string;
  videoConfig: keyof publishVideoConfigs;
}


@inject('routerStore', 'userStore', 'roomStore')
@observer
class Settings extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      userid: '',
      roomid: '',
      appid: '',
      videoConfig: props.roomStore.selectVideoConfig,
    };
  }

  handleSave = () => {
    if (this.state.userid) {
      this.props.userStore.setId(this.state.userid);
    }
    if (this.state.appid) {
      this.props.roomStore.setAppId(this.state.appid);
    }
    this.props.routerStore.push('/');
  };

  render() {
    const { classes, roomStore } = this.props;
    return (<div className={classes.root}>
      <Grid container wrap="nowrap" justify="flex-end" spacing={16}>
        <IconButton onClick={ () => this.props.routerStore.push('/') }>
          <ArrowBack color="inherit"/>
        </IconButton>
      </Grid>
      <Grid style={{ marginTop: 80 }} item container wrap="nowrap" justify="center" spacing={16}>
        <Grid item>
          <Input
            placeholder="修改用户名"
            value={this.state.userid}
            onChange={(e) => this.setState({ userid: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid item container wrap="nowrap" justify="center" spacing={16}>
        <Grid item>
          <Select
            value={roomStore.selectVideoConfig}
            onChange={(e) => roomStore.setSelectVideoConfig(e.target.value as keyof publishVideoConfigs)}
          >
            {videoConfig.map((option, key) => (
              <option key={key} value={option.key}>
                {option.label}
              </option>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid item container wrap="nowrap" justify="center" spacing={16}>
        <Grid item>
          <Input
            placeholder="修改APP_ID"
            value={this.state.appid}
            onChange={(e) => this.setState({ appid: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid item container wrap="nowrap" justify="center" spacing={16}>
        <Grid item>
          <ButtonBase
            focusRipple
            className="home_btn"
            onClick={this.handleSave}
          >
           完成
          </ButtonBase>
        </Grid>
      </Grid>
      <img src={require("../assets/niu.svg")} className="niu" />
    </div>);
  }
}

export default withStyles(styles)(Settings);