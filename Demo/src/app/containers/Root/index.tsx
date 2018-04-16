import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';

import { inject, observer } from 'mobx-react';
import { ErrorStore } from '../../stores';

import * as styles from './style.css';

interface State {
}

interface Props {
  error?: ErrorStore,
}

@inject('error')
@observer
export class Root extends React.Component<Props, State> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.props.error.toastError.show}
          autoHideDuration={3000}
          onClose={this.props.error.closeToast}
          message={<span>{this.props.error.toastError.content}</span>}
          action={[
            <IconButton
              onClick={this.props.error.closeToast}
              key="close"
              style={{"color": "#fff"}}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <Dialog
          open={this.props.error.alertError.show}
          onClose={this.props.error.closeAlert}
          id="dialog"
        >
          <DialogTitle>{this.props.error.alertError.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.error.alertError.content}</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.props.error.alertError.onCancel || this.props.error.closeAlert}
            >{this.props.error.alertError.cancel || '好的'}</Button>
            { this.props.error.alertError.onEnter && <Button onClick={this.props.error.alertError.onEnter}>
              {this.props.error.alertError.enter || '确定'}
            </Button> }
          </DialogActions>
        </Dialog>

        <Dialog open={this.props.error.loading.show}>
          <DialogContent className={styles.loadingContent}>
            <CircularProgress className={styles.loading} />
            <DialogContentText>{this.props.error.loading.content}</DialogContentText>
          </DialogContent>
        </Dialog>

        {this.props.children}
      </div>
    );
  }
}
