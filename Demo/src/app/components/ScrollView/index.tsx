/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import { spring, Motion } from 'react-motion';

interface position {
  x: number,
  y: number
}

interface Props {
}

interface State {
  offset?: position,
  isMove: boolean,
}

export class ScrollView extends React.Component<Props, State> {
  state = {
    offset: {
      x: 0,
      y: 0,
    },
    isMove: false,
  }
  scrollContainer: HTMLDivElement
  container: HTMLDivElement
  initPos?: position

  getPositionFromEvent = (e) => {
    if (e.touches) {
      const touch = e.touches.item(0);

      return {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
    } else {
      return {
        clientX: e.clientX,
        clientY: e.clientY,
      };
    }
  }

  handleMouseDown = (e) => {
    const pos = this.getPositionFromEvent(e);
    this.initPos = {
      x: pos.clientX,
      y: pos.clientY,
    };
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    const pos = this.getPositionFromEvent(e);
    if (this.initPos) {
      this.setState({
        offset: {
          x: this.state.offset.x + pos.clientX - this.initPos.x,
          y: this.state.offset.y + pos.clientY - this.initPos.y,
        },
        isMove: true,
      });
      this.initPos = {
        x: pos.clientX,
        y: pos.clientY,
      };
    }
  }

  handleMouseUp = (e) => {
    this.initPos = null;
    let max, min;
    const width = this.container.clientWidth;
    const containerWidth = this.scrollContainer.clientWidth;
    if (containerWidth < width) {
      min = 0;
      max = width - containerWidth;
    } else {
      min = width - containerWidth;
      max = 0;
    }

    this.setState({
      offset: {
        x: Math.max(Math.min(max, this.state.offset.x), min),
        y: 0,
      },
      isMove: false,
    });

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { ...others } = this.props;
    return (
      <div
        ref={ref => this.container = ref}
        {...others}
      >
        <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.offset.x)}}>
          {value => <div
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleMouseDown}
            style={{
              display: 'inline-flex',
              transform: `translate(${this.state.isMove ? this.state.offset.x : value.x}px, 0px)`,
            }}
            ref={ref => this.scrollContainer = ref}
          >
            { this.props.children }
          </div>}
        </Motion>
      </div>
    );
  }
}
