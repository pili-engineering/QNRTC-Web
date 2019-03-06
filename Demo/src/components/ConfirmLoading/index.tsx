import React, { Suspense } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  title: string;
  content: string;
  lazy: Promise<{default: React.ComponentType<any>}>;
}


export const lazyConfirmLoading = (props: Props) => {

  let resolve1: any

  const LazyComp = React.lazy(() => new Promise<{default: React.ComponentType<any>}>((resolve) => {
    resolve1 = resolve;
  }));

  const handleClose = () => {
    resolve1 && resolve1(props.lazy);
  };

  const FormDialog = () => {
    return (
      <div>
        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> {props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              加入
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (props: any) => (
    <Suspense fallback={<FormDialog/>}>
      <LazyComp {...props}/>
    </Suspense>
  );
}
