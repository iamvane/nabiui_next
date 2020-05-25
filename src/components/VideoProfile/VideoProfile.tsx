import * as React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import {
  title,
  closeButton,
} from './constants';

interface Props {
  isDialogOpen: boolean;
  closeHandler: () => void;
  video: string;
}

const VideoProfile: React.StatelessComponent <Props> = props => {
  return (
    <div>
      <Dialog
        open={props.isDialogOpen}
        onClose={props.closeHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title nabi-text-uppercase">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <video width="400" controls>
            <source src={props.video} type="video/mp4" />
          </video>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={props.closeHandler} color="primary">
            {closeButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoProfile;
