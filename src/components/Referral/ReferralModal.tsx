import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { Routes } from "../common/constants/Routes";

import "../../../assets/scss/ReferralModal.scss";
import { StoreState } from "../../redux/reducers/store";
import { setUserEmail } from "../../redux/actions/UserActions";

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
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [submitEmail, setSubmitEmail] = useState(false);
  const referralInfo = useSelector(
    (state: StoreState) => state.user.referralInfo
  );

  React.useEffect(() => {
    if (submitEmail && !emailError) {
      dispatch(setUserEmail(email));
      Router.push(Routes.Registration);
    }
  }, [submitEmail]);

  const handleSetEmail = () => {
    validateEmail();
    setSubmitEmail(true);
  };

  const validateEmail = () => {
    if (
      !/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/.test(
        email
      ) ||
      /^\s*$/.test(email)
    ) {
      setEmailError("Invalid email. Enter a valid email address.");
    }
  };

  const handleChangeEmail = event => {
    setEmail(event.target.value);
    setEmailError("");
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
            error={!!emailError}
            helperText={emailError}
            onChange={handleChangeEmail}
          />
          <div className="nabi-text-center nabi-margin-top-small">
            <Button
              color="primary"
              className="nabi-text-uppercase"
              variant="contained"
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
