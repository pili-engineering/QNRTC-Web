/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import * as styles from './style.css'

interface Props {
  className?: string
  videoClassName?: string
}

interface State {
}

export class LocalPlayer extends React.Component<Props, State> {
  video: HTMLElement

  getVideoElement = () => this.video

  render() {
    return (
      <div className={this.props.className}>
        <div
          className={`${this.props.videoClassName || ''} ${styles.video}`}
          ref={ref => this.video = ref}
        />
      </div>
    );
  }
}
