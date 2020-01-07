import * as React from 'react';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
  Icon
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Save';

import Rates from '../Rates/Rates';
import { RatesType } from '../Rates/model';
import {
  EditModalComponent,
  ProfileHeaderComponent
} from './constants';

interface Props extends RatesType {
  isFormDialogOpen: boolean;
  closeHandler: () => void;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleSubmit: (event: React.FormEvent<{}>) => void;
}

/**
 * Displays a dialog to edit the instructor's rate
 */
const EditRatesModal: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <Dialog
        open={props.isFormDialogOpen}
        onClose={props.closeHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{EditModalComponent.Text.EditRates}</DialogTitle>
        <DialogContent>
          <Rates
            handleChange={props.handleChange}
            mins30={props.mins30}
            mins45={props.mins45}
            mins60={props.mins60}
            mins90={props.mins90}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeHandler} color="default" variant="contained">
           <Close className="nabi-margin-right-xsmall" />
            {ProfileHeaderComponent.Text.Cancel}
          </Button>
          <Button variant="contained" onClick={props.handleSubmit} color="primary">
            <Save className="nabi-margin-right-xsmall" />
            {ProfileHeaderComponent.Text.Save}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditRatesModal;
