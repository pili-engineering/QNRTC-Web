/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { decodeAudioData } from 'pili-rtc-web';

interface Props {
  show: boolean;
  onClose: () => any;
  handleBuffer: (buffer: AudioBuffer) => any;
}

interface State {
}

export class MusicSelect extends React.Component<Props, State> {
  public input: HTMLInputElement;

  public componentDidUpdate(): void {
    if (this.input) {
      this.input.onchange = this.handleFileSelect;
    }
  }

  private handleFileSelect = (e: any) => {
    const file: File = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (ev: any) => {
      const data = ev.target.result;
      decodeAudioData(data).then(buffer => {
        this.props.handleBuffer(buffer);
      });
    };

    reader.readAsArrayBuffer(file);
    this.props.onClose();
  }

  public render(): JSX.Element {
    return (
      <Dialog open={this.props.show} onClose={this.props.onClose}>
        <DialogTitle>选择一个音乐文件作为输入</DialogTitle>
        <DialogContent>
          <input
            type="file" accept=".mp3, .ogg"
            id="musicselect"
            ref={ref => this.input = ref}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
