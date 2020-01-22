import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { Routes } from "../common/constants/Routes";

import "../../../assets/scss/ReferralModal.scss";
import { StoreState } from "../../redux/reducers/store";
import { setUserEmail } from '../../redux/actions/UserActions';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  Avatar,
  TextField,
  Button
} from "@material-ui/core";


interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ReferralModal: React.StatelessComponent<Props> = props => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const referralInfo = useSelector((state: StoreState) => state.user.referralInfo);

  const handleSetEmail = () => {
    dispatch(setUserEmail(email))
    Router.push(Routes.Registration)
  };

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
            src={referralInfo.avatar}
            className="nabi-margin-center avatar nabi-margin-bottom-small"
          />

          <DialogContentText className="nabi-text-center">
            Sign up today to get 20% off your first lesson package. Your invite
            from {referralInfo.displayName} expires in 30 days
          </DialogContentText>
          <TextField
            fullWidth={true}
            margin="normal"
            placeholder="Email address"
            required={true}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <div className="nabi-text-center nabi-margin-top-small">
            <Button
              color="primary"
              className="nabi-text-uppercase"
              variant="contained"
              type="submit"
              onClick={handleSetEmail}
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
