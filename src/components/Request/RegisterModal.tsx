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
        <DialogTitle id="form-dialog-title nabi-text-uppercase">REGISTER OR LOGIN TO APPLY</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Sign up today and start teaching! Login if you have an account.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Link href={Routes.RegistrationInstructor}>
            <a>
              <Button variant="contained" color="primary">Register</Button>
            </a>
          </Link>
          <Link href={Routes.Login}>
            <a>
              <Button variant="contained" color="secondary" onClick={props.handleClose}>
                Login
              </Button>
            </a>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterModal;
