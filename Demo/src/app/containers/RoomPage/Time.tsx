/*
 * Time.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';

function paddingNumber(num: number): string {
  const intergerNum = Math.round(num);
  if (num < 10) {
    return "0" + intergerNum.toString();
  }

  return intergerNum.toString();
}

interface Props {
  startTime: number;
  className?: string;
}

interface State {
  time: string;
}

export class Time extends React.Component<Props, State> {
  public interval: any;
  public state: State = {
    time: "00:00",
  };

  public componentDidMount(): void {
    this.interval = setInterval(this.updateTime.bind(this), 1000);
  }

  public componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  public updateTime(): void {
    const time = Math.round((Date.now() - this.props.startTime) / 1000.0);
    const seconds = time % 60;
    const mins = (time - seconds) / 60;

    this.setState({
      time: `${paddingNumber(mins)}:${paddingNumber(seconds)}`,
    });
  }

  public render(): JSX.Element {
    return <p className={this.props.className}>{this.state.time}</p>;
  }
}
