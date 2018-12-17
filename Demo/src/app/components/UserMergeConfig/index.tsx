/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import AvatarIcon from 'react-avatar';
import { getColorFromUserId } from '../../utils';
import DarkSwitch from '../../components/DarkSwitch';
import Button from '@material-ui/core/Button';

import * as styles from './style.css';

export interface MergeOptions {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  hidden: boolean;
  muted: boolean;
}

interface State {
  x: string;
  y: string;
  z: string;
  w: string;
  h: string;
  hidden: boolean;
  muted: boolean;
  active: boolean;
}

interface Props {
  userId: string;
  onMergeChange: (userId: string, options: MergeOptions) => any;
}

const inputs = [
  { label: 'x轴', key: 'x' },
  { label: 'y轴', key: 'y' },
  { label: 'z轴', key: 'z' },
  { label: '宽度', key: 'w' },
  { label: '高度', key: 'h' },
];

export class UserMergeConfig extends React.Component<Props, State> {
  public state: State = {
    x: '0', y: '0', z: '0', w: '0', h: '0',
    hidden: false, muted: false, active: false,
  };

  private handleSubmit = (e: any) => {
    e.preventDefault();

    const options: MergeOptions = {
      x: Number(this.state.x),
      y: Number(this.state.y),
      z: Number(this.state.z),
      w: Number(this.state.w),
      h: Number(this.state.h),
      muted: this.state.muted,
      hidden: this.state.hidden,
    };
    if (!options.hidden) {
      options.hidden = options.w === 0 || options.h === 0;
    }
    options.w = options.w || 1;
    options.h = options.h || 1;
    console.log(options);
    this.props.onMergeChange(this.props.userId, options);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.mergeConfig}>
        <div
          className={styles.userBlock}
          onClick={() => this.setState({ active: !this.state.active })}
        >
          <AvatarIcon
            name={this.props.userId}
            color={getColorFromUserId(this.props.userId)}
            className={styles.userAvatar}
            round
            size="48"
          />
          <p className={styles.userName}>{this.props.userId}</p>
        </div>

        <div className={`${styles.configBlock} ${this.state.active ? styles.active : ''}`}>
          <form
            className={styles.configForm}
            onSubmit={this.handleSubmit}
          >
            <div className={styles.formInputs}>
              { inputs.map(inputItem => (
                <div className={styles.formInput} key={inputItem.key}>
                  <label>{inputItem.label}</label>
                  <input
                    type="number"
                    value={this.state[inputItem.key]}
                    onChange={e => (this as any).setState({ [inputItem.key]: e.target.value })}
                    required
                  />
                </div>
              ))}
            </div>
            <div className={styles.switchArea}>
              <div className={styles.switchItem}>
                <label>声音</label>
                <DarkSwitch
                  checked={!this.state.muted}
                  onChange={() => this.setState({ muted: !this.state.muted })}
                />
              </div>
              <div className={styles.switchItem}>
                <label>视频</label>
                <DarkSwitch
                  checked={!this.state.hidden}
                  onChange={() => this.setState({ hidden: !this.state.hidden })}
                />
              </div>
              <Button type="form" variant="raised" color="primary" className={styles.button}>
                确定
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
