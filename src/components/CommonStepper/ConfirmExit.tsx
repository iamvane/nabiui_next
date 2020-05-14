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
  ConfirmExitComponent
} from './constants';

interface Props {
  isFormDialogOpen: boolean;
  closeHandler: () => void;
  handleProceed: () => void;
}

const ConfirmExit: React.StatelessComponent <Props> = props => {
  return (
    <div>
      <Dialog
        open={props.isFormDialogOpen}
        onClose={props.closeHandler}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <DialogTitle id="form-dialog-title nabi-text-uppercase">{ConfirmExitComponent.dialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {ConfirmExitComponent.dialogMessage}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={props.handleProceed}>{ConfirmExitComponent.proceed}</Button>

          <Button variant="contained" onClick={props.closeHandler} color="primary">
            {ConfirmExitComponent.decline}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmExit;
