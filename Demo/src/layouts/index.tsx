import * as React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Snackbar from '../components/Snackbar';

import { MessageStore } from '../stores/messageStore';
import { inject, observer } from 'mobx-react';
import { MenuStore } from '../stores/menuStore';

const styles = (theme: Theme) => createStyles({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  dialogContentText: {
    margin: theme.spacing.unit * 2,
    lineHeight: '40px',
  },
});

interface Props extends WithStyles<typeof styles> {
  messageStore: MessageStore;
  menuStore: MenuStore;
  children?: React.ReactNode;
}

export default withStyles(styles)(inject('messageStore', 'menuStore')(observer(function Layout(props: Props) {
  const { classes, messageStore, menuStore } = props;
  return (<>
    <Dialog
      open={messageStore.alertMessage.show}
      onClose={messageStore.closeAlert}
      id="dialog"
    >
      <DialogTitle>{messageStore.alertMessage.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{messageStore.alertMessage.content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={messageStore.closeAlert}
        >好的</Button>
      </DialogActions>
    </Dialog>
    <Dialog
        open={messageStore.loadingOpen}
      >
        <DialogContent>
          <Grid
            container
            spacing={16}
            alignItems="center"
          >
            <Grid item>
              <CircularProgress size={40} className={classes.progress}/>
            </Grid>
            <Grid item xs={12} sm>
              <DialogContentText className={classes.dialogContentText}>{messageStore.loadingText}</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    <Snackbar messageStore={messageStore}/>
    <Menu
      anchorEl={menuStore.anchorEl}
      open={Boolean(menuStore.anchorEl)}
      onClose={menuStore.close}
      id="context_menu"
    >
      {menuStore.list.map((menu, key) => (
        <MenuItem
          {...menu}
          className="context_menuitem"
          key={key}
        />
      ))}
    </Menu>
    { props.children }
  </>);
})))
