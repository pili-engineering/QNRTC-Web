import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean;
  handleResumePlay: () => void;
}

export const ResumePlay = (props: Props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="恢复播放"
      >
        <DialogTitle id="恢复播放">播放被阻止</DialogTitle>
        <DialogContent>
          <DialogContentText>
            播放被阻止，点击恢复播放
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            props.handleResumePlay();
          }} color="primary">
            恢复播放
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};