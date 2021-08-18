import * as React from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import {
  Action,
  //Dispatch
} from 'redux';
import {
  Dispatch,
  ThunkAction
} from 'redux-fixed';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import { checkErrors } from '../../../utils/checkErrors';
import { UserType } from '../../../redux/models/UserModel';
import { StoreState } from '../../../redux/reducers/store';
import { setPassword  } from '../../../redux/actions/UserActions';
import PageTitle from '../../common/PageTitle';
import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import { Routes } from '../../common/constants/Routes';

import {
  SetPasswordComponent,
  menuItems,
  headerMenuItems
} from './constants';
import { Header } from '../../Header/Header';
import { Footer } from "../../common/Footer";

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  message: string;
  error: string;
}

interface DispatchProps {
  setPassword: (password: string, token: string) => void;
}

interface Props extends
  DispatchProps,
  StateProps { }

export const PasswordRecovery = (props: Props) => {
  const [formErrors, setFormErrors] = React.useState(SetPasswordComponent.defaultErrors);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  React.useEffect(() => {
    if (password) {
      validate();
    }
    if (props.message) {
      Router.push(Routes.Login);
    }
  },[password, confirmPassword, props.message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === SetPasswordComponent.FieldNames.Password) {
      setPassword(value)
    } else if (name === SetPasswordComponent.FieldNames.ConfirmPassword) {
      setConfirmPassword(value)
    }
  }

  const validate = () => {
    const { FieldNames } = SetPasswordComponent;

    const formErrors: SetPasswordComponent.SetPasswordErrors = {};

    if (!password) {
      formErrors[FieldNames.Password] = SetPasswordComponent.errorMessages.noValue
    } else if (password) {
      if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W\-_]{5,}$/).test(password) || (/^\s*$/).test(password)) {
        formErrors[FieldNames.Password] = SetPasswordComponent.errorMessages.invalidPassword;
      }
      if (password !== confirmPassword) {
        formErrors[FieldNames.Password] = SetPasswordComponent.errorMessages.noMatch;
        formErrors[FieldNames.ConfirmPassword] = SetPasswordComponent.errorMessages.noMatch;
      } else {
        formErrors[FieldNames.Password] = ''
        formErrors[FieldNames.ConfirmPassword] = ''
      }
    }
    return setFormErrors(formErrors);
  }

  const router = useRouter();
  const token = router.query.token as string;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    await props.setPassword(password, token);
  }

  return (
    <div className="nabi-margin-bottom-xlarge">
      <Head>
        <title>{pageTitlesAndDescriptions.forgotPassword.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.forgotPassword.description}></meta>
      </Head>
      <Header 
        drawerMenuItems={menuItems}
        headerMenuItems={headerMenuItems}
      />
      <PageTitle pageTitle={SetPasswordComponent.pageTitle} />
      <Grid item={true} md={6} xs={10} sm={8} className="nabi-margin-center">
        <div className="form-card nabi-background-white nabi-section">
          <form noValidate={true} autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              type={SetPasswordComponent.FieldNames.Password}
              fullWidth={true}
              id={SetPasswordComponent.Ids.Password}
              margin="normal"
              onChange={handleChange}
              name={SetPasswordComponent.FieldNames.Password}
              placeholder={SetPasswordComponent.Placeholders.Password}
              error={!!formErrors.password}
              helperText={formErrors.password}
              required={true}
            />

            <TextField
              type={SetPasswordComponent.FieldNames.Password}
              fullWidth={true}
              id={SetPasswordComponent.Ids.ConfirmPassword}
              margin="normal"
              onChange={handleChange}
              name={SetPasswordComponent.FieldNames.ConfirmPassword}
              placeholder={SetPasswordComponent.Placeholders.ConfirmPassword}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              required={true}
            />

            <div className="nabi-text-center nabi-padding-top-xsmall nabi-padding-bottom-xsmall">
              {props.isRequesting && <CircularProgress />}

              <Typography className="nabi-margin-top-small nabi-margin-bottom-small" color="error">
                {props.error}
              </Typography>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                className="nabi-text-uppercase"
                disabled={(!password || checkErrors(Object.values(formErrors))) ? true : false}
              >
                {SetPasswordComponent.Text.SetPassword}
              </Button>
            </div>
          </form>
        </div>
      </Grid>
      <Footer bottomPlacement={true} />
    </div>
  );
}

function mapStateToProps(state: StoreState): StateProps {
  const {
    user,
    actions: {
      setPassword: {
        isRequesting,
        error,
        message
      }
    },
  } = state.user;

  return {
    user,
    isRequesting,
    error,
    message
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  setPassword: (email: string, token: string) => dispatch(setPassword(email, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
