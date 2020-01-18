import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Avatar,
  TextField,
  Button
} from "@material-ui/core";

import "../../../assets/scss/ReferralModal.scss";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ReferralModal: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <DialogContent>
          <Avatar
            alt="Remy Sharp"
            src="http://www.venmond.com/demo/vendroid/img/avatar/big.jpg"
            className="nabi-margin-center avatar nabi-margin-bottom-small"
          />

          <DialogContentText className="nabi-text-center">
            Sign up today to get 20% off your first lesson package. Your invite
            from mariana expires in 30 days
          </DialogContentText>
          <TextField
            fullWidth={true}
            margin="normal"
            placeholder="Email address"
            required={true}
          />
          <div className="nabi-text-center nabi-margin-top-small">
            <Button
              color="primary"
              className="nabi-text-uppercase"
              variant="contained"
              type="submit"
            >
              GET STARTED
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferralModal;
