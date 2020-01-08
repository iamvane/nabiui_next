import * as React from 'react';
import Link from 'next/link';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import { Routes } from '../common/constants/Routes';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const RegisterModal: React.StatelessComponent <Props> = props => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <DialogTitle id="form-dialog-title nabi-text-uppercase">REGISTER TO APPLY</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Sign up today and start teaching!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Link href={Routes.RegistrationInstructor}>
            <a>
              <Button variant="contained" color="primary">Register</Button>
            </a>
          </Link>
          <Button variant="contained" onClick={props.handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterModal;
