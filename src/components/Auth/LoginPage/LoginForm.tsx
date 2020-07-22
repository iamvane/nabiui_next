import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography
} from '@material-ui/core';

import { Routes } from '../../common/constants/Routes';
import { LoginFormComponent } from './constants';

interface Props {
  handleChange: (event: React.FormEvent<{}>) => void;
  handleSubmit: (event: React.FormEvent<{}>) => void;
  apiError: string;
  isRequesting: boolean;
  isDisabled?: boolean;
}

const LoginForm: React.StatelessComponent<Props> = props => {
  const { handleChange, handleSubmit, isRequesting} = props;

  return (
    <form noValidate={true} autoComplete="off" onSubmit={handleSubmit} id="login-form">
      <TextField
        fullWidth={true}
        id={LoginFormComponent.Ids.Email}
        margin="normal"
        onChange={handleChange}
        name={LoginFormComponent.FieldNames.Email}
        placeholder={LoginFormComponent.Placeholders.Email}
        required={true}
      />

      <TextField
        fullWidth={true}
        id={LoginFormComponent.Ids.Password}
        margin="normal"
        onChange={handleChange}
        name={LoginFormComponent.FieldNames.Password}
        placeholder={LoginFormComponent.Placeholders.Password}
        required={true}
        type={LoginFormComponent.FieldNames.Password}
      />

      <div className="nabi-text-center nabi-padding-top-xsmall nabi-padding-bottom-xsmall">
        {isRequesting && <CircularProgress />}

        <Typography className="nabi-margin-top-small nabi-margin-bottom-small" color="error">
          {props.apiError}
        </Typography>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          className="nabi-text-uppercase"
          disabled={props.isDisabled}
        >
          {LoginFormComponent.Text.Login}
        </Button>
      </div>

      <Divider className="nabi-margin-top-small nabi-margin-bottom-xsmall"/>

      <Typography align="center" className="nabi-margin-top-small nabi-cursor-pointer">
        <Link prefetch={false} href={Routes.AccountRecovery}>
          <a>
            {LoginFormComponent.Text.ForgotPassword}
          </a>
        </Link>
      </Typography>

      <Typography align="center" className="nabi-margin-top-xsmall">
        {reactStringReplace(
          LoginFormComponent.registerInvite,
          LoginFormComponent.singUpPlaceholder,
          (i: number) => (
            <Link prefetch={false} key={i} href={Routes.Registration}><a>{LoginFormComponent.Text.SingUp}</a></Link>
          )
        )}
      </Typography>
    </form>
  );
};

export default LoginForm;
