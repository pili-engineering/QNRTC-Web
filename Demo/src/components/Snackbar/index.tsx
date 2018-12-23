import React from 'react';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { observer } from 'mobx-react';
import { MessageStore } from '../../stores/messageStore';

const styles = (theme: Theme) => createStyles({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

interface Props extends WithStyles<typeof styles> {
  messageStore: MessageStore;
}


export default withStyles(styles)(observer((props: Props) => {
  const { classes , messageStore } = props;
  return (<Snackbar
    key={messageStore.messageInfo.key}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={messageStore.open}
    autoHideDuration={6000}
    onClose={messageStore.close}
    onExited={messageStore.processQueue}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{ messageStore.messageInfo.message }</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={messageStore.close}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />)
}));
