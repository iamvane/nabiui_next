import * as React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';

import {
  AccountInfoComponent,
  MiddleNameModalComponent
} from 'components/AccountInfo/constants';

interface Props {
  isFormDialogOpen: boolean;
  closeHandler: () => void;
  handleChange: (event: React.FormEvent<{}>) => void;
  middleName: string;
  confirmNoMiddleName: () => void;
  applyMiddleName: () => void;
  error?: string;
}

const MiddleNameModal: React.StatelessComponent <Props> = props => {
  const {
    FieldNames,
    FieldKey
  } = AccountInfoComponent;
  return (
    <div>
      <Dialog
        open={props.isFormDialogOpen}
        onClose={props.closeHandler}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <DialogTitle id="form-dialog-title nabi-text-uppercase">{MiddleNameModalComponent.title}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {MiddleNameModalComponent.message}
            <TextField
              fullWidth={true}
              name={FieldNames[FieldKey.MiddleName]}
              onChange={props.handleChange}
              placeholder={AccountInfoComponent.Placeholders.MiddleName}
              required={true}
              value={props.middleName}
              error={!!props.error}
              helperText={props.error}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={props.confirmNoMiddleName}>{MiddleNameModalComponent.noMiddleName}</Button>

          <Button variant="contained" onClick={props.applyMiddleName} color="primary">
            {MiddleNameModalComponent.applyButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MiddleNameModal;
