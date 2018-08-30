/*
 * index.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

interface State {
}

interface Props {
  classes: any;
  checked: boolean;
  onChange: any;
}

const style = {
  bar: {
    backgroundColor: '#fff',
  },
};

class DarkSwitch extends React.Component<Props, State> {
  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Switch
        classes={{
          bar: classes.bar,
        }}
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}

export default withStyles(style)(DarkSwitch);
