import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '../components/Snackbar';

import { MessageStore } from '../stores/messageStore';
import { inject, observer } from 'mobx-react';

interface Props {
  message?: MessageStore;
}

@inject('messageStore')
@observer
export default class Layout extends React.Component<Props> {
  public render(): JSX.Element {
    const message = this.props.message as MessageStore;
    return (<>
      <Dialog
        open={message.alertMessage.show}
        onClose={message.closeAlert}
        id="dialog"
      >
        <DialogTitle>{message.alertMessage.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message.alertMessage.content}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={message.closeAlert}
          >好的</Button>
        </DialogActions>
      </Dialog>
      <Snackbar messageStore={message}/>
      { this.props.children }
    </>);
  }
}