/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import * as styles from './style.css';

interface Props {
  roomName: string;
  coverImage?: string;
  onEnter: (roomName: string) => void;
}

interface State {
}

export class RoomCard extends React.Component<Props, State> {
  render() {
    return (
      <Card
        onClick={() => this.props.onEnter(this.props.roomName)}
        className={styles.card}
      >
        <CardMedia
          title={this.props.roomName}
          image={this.props.coverImage}
          className={styles.image}
        />
        <CardContent>
          <Typography component="p">{this.props.roomName}</Typography>
        </CardContent>
      </Card>
    );
  }
}
