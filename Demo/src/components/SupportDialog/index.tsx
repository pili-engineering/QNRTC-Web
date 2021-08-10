import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { browserReport } from 'pili-rtc-web';

export default function SupportDialog() {
  return (
    <div>
      <Dialog
        open={!browserReport.support}
        aria-labelledby="webrtc-support"
      >
        <DialogTitle>浏览器不支持</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请检查当前浏览器的 WebRTC 支持情况，并确保当前页面处于 HTTPS 环境。
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
