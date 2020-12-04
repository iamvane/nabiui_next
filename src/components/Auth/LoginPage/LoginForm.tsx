import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import { CircularProgress, TextField, Button } from "nabi_web_components";
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

        <p className="nabi-margin-top-small nabi-margin-bottom-small nabi-text-color-red">
          {props.apiError}
        </p>

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

      <hr className="nabi-margin-top-small nabi-margin-bottom-xsmall"/>

      <p className="nabi-margin-top-small nabi-cursor-pointer nabi-text-center">
        <Link prefetch={false} href={Routes.AccountRecovery}>
          <a>
            {LoginFormComponent.Text.ForgotPassword}
          </a>
        </Link>
      </p>

      <p className="nabi-margin-top-xsmall nabi-text-center">
        {reactStringReplace(
          LoginFormComponent.registerInvite,
          LoginFormComponent.singUpPlaceholder,
          (i: number) => (
            <Link prefetch={false} key={i} href={Routes.Registration}><a>{LoginFormComponent.Text.SingUp}</a></Link>
          )
        )}
      </p>
    </form>
  );
};

export default LoginForm;
