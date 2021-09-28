/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import { QNLocalAudioTrack, QNTrack } from "qnweb-rtc";
import * as React from 'react';

interface Props {
  className?: string;
  width: number;
  height: number;
  color: string;
  track: QNTrack;
}

interface State {
}

/**
 * AudioWave 通过时域数据绘制 canvas 波形图
 */
export default class AudioWave extends React.Component<Props, State> {
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  private handleCanvasDom = (dom: HTMLCanvasElement | null): void => {
    if (this.canvas || !dom) return;
    this.canvas = dom;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    requestAnimationFrame(this.draw.bind(this));
  };

  private draw(): void {
    const { color, width, height, track } = this.props;
    if (!this.ctx) return;
    // 从 track 中获取 时域数据 和 频域数据
    const timeData = (track as QNLocalAudioTrack).getCurrentTimeDomainData();
    if (!timeData) return;
    // const freqData = this.props.stream.getCurrentFrequencyData();

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.beginPath();
    for (let i = 0; i < width; i += 1) {
      const scale = 1;
      const dataIndex = Math.round(i * (timeData.length / width));

      // 这里通过时域数据来绘图，可是试试换成频域感受效果
      const data = Math.round(scale * timeData[dataIndex] * (height / 255.0));
      if (i === 0) {
        this.ctx.moveTo(i, data);
      } else {
        this.ctx.lineTo(i, data);
      }
    }
    this.ctx.stroke();
    requestAnimationFrame(this.draw.bind(this));
  }

  render() {
    return (
      <canvas
        className={this.props.className}
        height={this.props.height}
        width={this.props.width}
        ref={this.handleCanvasDom}
      />
    );
  }
}
