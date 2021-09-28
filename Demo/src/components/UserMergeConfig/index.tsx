/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import AvatarIcon from 'react-avatar';
import { getColorFromUserId } from '../../common/utils';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import styles from './style.module.css';
import User from '../../models/User';
import { FormGroup } from '@material-ui/core';
import { observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';

interface Square {
  x?: string;
  y?: string;
  z?: string;
  w?: string;
  h?: string;
  enabled?: boolean;
}

export interface MergeOptions {
  camera?: TrackOption;
  screen?: TrackOption;
  audio?: TrackOption;
}
export interface TrackOption extends Square {
  trackID: string;
}

interface State extends MergeOptions {
}

interface Props {
  user: User;
  onMergeChange: (options: MergeOptions) => any;
}

interface InputProps {
  key: keyof Square;
  label: string;
}

const inputs = [
  { label: 'x轴', key: 'x' },
  { label: 'y轴', key: 'y' },
  { label: 'z轴', key: 'z' },
  { label: '宽度', key: 'w' },
  { label: '高度', key: 'h' },
] as InputProps[];

@observer
export class UserMergeConfig extends React.Component<Props, State> {

  @observable camera: Square = {
    x: '0',
    y: '0',
    z: '0',
    w: '480',
    h: '320',
  };

  @observable cameraEnabled = true;

  @observable screen: Square = {
    x: '0',
    y: '0',
    z: '0',
    w: '480',
    h: '320',
  };

  @observable screenEnabled = true;

  @observable audioEnabled = true;

  // @computed get cameraTrackInfo() {
  //   return Array.from(this.props.user.publishedTrackInfo.values()).find(v => v.tag === 'camera');
  // }

  // @computed get screenTrackInfo() {
  //   return Array.from(this.props.user.publishedTrackInfo.values()).find(v => v.tag === 'screen');
  // }

  // @computed get audioTrackInfo() {
  //   return Array.from(this.props.user.publishedTrackInfo.values()).find(v => v.kind === 'audio');
  // }

  private handleSubmit = (e: any) => {
    e.preventDefault();
    // let opt: MergeOptions = {};
    // const audioTrackInfo = this.audioTrackInfo;
    // if (audioTrackInfo) {
    //   opt.audio = {
    //     trackID: audioTrackInfo.trackID as string,
    //     enabled: this.audioEnabled,
    //   };
    // }
    // const cameraTrackInfo = this.cameraTrackInfo;
    // if (cameraTrackInfo) {
    //   opt.camera = {
    //     ...this.camera,
    //     trackID: cameraTrackInfo.trackID as string,
    //     enabled: this.cameraEnabled,
    //   };
    // }
    // const screenTrackInfo = this.screenTrackInfo
    // if (screenTrackInfo) {
    //   opt.screen = {
    //     ...this.screen,
    //     trackID: screenTrackInfo.trackID as string,
    //     enabled: this.screenEnabled,
    //   };
    // }
    // this.props.onMergeChange(opt);
  }

  public render(): JSX.Element {
    const { user } = this.props;
    return (
      <div className={styles.mergeConfig}>
        {/* <ExpansionPanel>
          <ExpansionPanelSummary>
            <div
              className={styles.userBlock}
            >
              <AvatarIcon
                name={user.id}
                color={getColorFromUserId(user.id)}
                className={styles.userAvatar}
                round
                size="48"
              />
              <p className={styles.userName}>{user.id}</p>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form
              className={styles.configForm}
              onSubmit={this.handleSubmit}
            >
              <FormGroup row>
                <FormControlLabel
                  label="摄像头"
                  control={
                    <Switch
                      onChange={action(() => {
                        this.cameraEnabled = !this.cameraEnabled;
                      })}
                      disabled={!this.cameraTrackInfo}
                      checked={Boolean(this.cameraTrackInfo && this.cameraEnabled)}
                    />
                  }
                />
                </FormGroup>
              {this.cameraTrackInfo && this.cameraEnabled ? (<FormGroup row>
                {inputs.map(inputItem => (
                  <div className={styles.formInput} key={inputItem.key}>
                    <label className={styles.label}>{inputItem.label}</label>
                    <input
                      type="number"
                      onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                        this.camera[inputItem.key] = e.target.value;
                      })}
                      value={this.camera[inputItem.key] as string}
                      required
                    />
                  </div>
                ))}
                <div className={styles.stetchModeContainer}>
                  <label className={styles.stretchModeLabel}>stretchMode</label>
                  <select
                    className={styles.stretchModeSelect}
                    value={this.camera.stretchMode}
                    onChange={action((e: React.ChangeEvent<HTMLSelectElement>) => {
                      this.camera.stretchMode = e.target.value as StretchMode;
                    })}
                  >
                    <option value="aspectFill">aspectFill</option>
                    <option value="aspectFit">aspectFit</option>
                    <option value="scaleToFit">scaleToFit</option>
                  </select>
                </div>
              </FormGroup>) : <></>}
              
              <FormGroup row>
                <FormControlLabel
                  label="屏幕共享"
                  control={
                    <Switch
                      onChange={action(() => {
                        this.screenEnabled = !(this.screenEnabled);
                      })}
                      disabled={!this.screenTrackInfo}
                      checked={Boolean(this.screenTrackInfo && this.screenEnabled)}
                    />
                  }
                />
                </FormGroup>
              {this.screenTrackInfo && this.screenEnabled ? (<FormGroup row>
                {inputs.map(inputItem => (
                  <div className={styles.formInput} key={inputItem.key}>
                    <label className={styles.label}>{inputItem.label}</label>
                    <input
                      type="number"
                      onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {
                        this.screen[inputItem.key] = e.target.value;
                      })}
                      value={this.screen[inputItem.key] as string}
                      required
                    />
                  </div>
                ))}
                <div className={styles.stetchModeContainer}>
                  <label className={styles.stretchModeLabel}>stretchMode</label>
                  <select
                    className={styles.stretchModeSelect}
                    value={this.screen.stretchMode}
                    onChange={action((e: React.ChangeEvent<HTMLSelectElement>) => {
                      this.screen.stretchMode = e.target.value as StretchMode;
                    })}
                  >
                    <option value="aspectFill">aspectFill</option>
                    <option value="aspectFit">aspectFit</option>
                    <option value="scaleToFit">scaleToFit</option>
                  </select>
                </div>
              </FormGroup>) : <></>}

              <FormGroup row>
                <FormControlLabel
                  label="麦克风"
                  control={
                    <Switch
                      onChange={action(() => {
                        this.audioEnabled = !this.audioEnabled;
                      })}
                      disabled={!this.audioTrackInfo}
                      checked={Boolean(this.audioTrackInfo && this.audioEnabled)}
                    />
                  }
                />
              </FormGroup>
              <Button variant="contained" type="form" color="primary">
                确定
              </Button>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
      </div>
    );
  }
}
