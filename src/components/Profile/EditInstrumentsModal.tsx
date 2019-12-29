import * as React from 'react';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
  Icon
} from '@material-ui/core';

import Instruments from '../Instruments/Instruments';
import { InstrumentsType } from '../Instruments/model';
import {
  EditModalComponent,
  ProfileHeaderComponent
} from '../Profile/constants';

interface Props {
  isFormDialogOpen: boolean;
  closeHandler: () => void;
  instruments: InstrumentsType[];
  instrument: string;
  skillLevel: string;
  addInstrument: (event: React.FormEvent<{}>) => void;
  deleteInstrument: (instrument: string) => void;
  handleChange: (event: React.FormEvent<{}>) => void;
  handleSubmit: (event: React.FormEvent<{}>) => void;
}

/**
 * Displays a dialog to edit the intructor's instrument
 */
const EditInstrumentsModal: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <Dialog
        open={props.isFormDialogOpen}
        onClose={props.closeHandler}
        scroll="body"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{EditModalComponent.Text.EditInstruments}</DialogTitle>
        <DialogContent>
          <Instruments
            instruments={props.instruments}
            isEditing={true}
            instrument={props.instrument}
            skillLevel={props.skillLevel}
            handleChange={props.handleChange}
            addInstrument={props.addInstrument}
            deleteInstrument={props.deleteInstrument}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeHandler} color="default" variant="contained">
            <Icon className="nabi-margin-right-xsmall">close</Icon>
            {ProfileHeaderComponent.Text.Cancel}
          </Button>
          <Button variant="contained" onClick={props.handleSubmit} color="primary">
            <Icon className="nabi-margin-right-xsmall">save</Icon>
            {ProfileHeaderComponent.Text.Save}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditInstrumentsModal;
