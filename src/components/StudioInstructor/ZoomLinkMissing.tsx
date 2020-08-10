import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import { ZoomMissingLinkDialog } from "./constants";

interface Props {
  handleRedirect?: () => void;
  isOpen?: boolean;
}

export function ZoomMissingLink(props: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.isOpen !== open) {
      setOpen(props.isOpen)
    }
  }, [props.isOpen])

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{ZoomMissingLinkDialog.Title.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {ZoomMissingLinkDialog.Content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="nabi-responsive-button"
            onClick={handleClose}
          >
            {ZoomMissingLinkDialog.Cancel}
        </Button>
          <Button
            variant="contained"
            className="nabi-responsive-button"
            color="primary"
            onClick={props.handleRedirect}
          >
            {ZoomMissingLinkDialog.Continue}
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
