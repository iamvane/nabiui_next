import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import Head from 'next/head';

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import { StoreState } from '../../../redux/reducers/store';
import { requestPasswordRecovery } from '../../../redux/actions/UserActions';
import { UserType } from '../../../redux/models/UserModel';
import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import SnackBar from '../../common/SnackBar';
import PageTitle from '../../common/PageTitle';
import {
  PasswordRecoveryComponent,
  menuItems,
  headerMenuItems
} from './constants';
import { checkErrors } from "../../../utils/checkErrors";
import { Header } from '../../Header/Header';
import { Footer } from "../../common/Footer";

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  message: string;
  error: string;
}

interface DispatchProps {
  requestPasswordRecovery: (email: string) => void;
}

interface Props extends
  DispatchProps,
  StateProps { }

  export const PasswordRecovery = (props: Props) => {
    const [formErrors, setFormErrors] = React.useState(PasswordRecoveryComponent.defaultErrors);
    const [email, setEmail] = React.useState('');
    const [isSnackbarOpen, toggleSnackbar] = React.useState(false);
    const [passwordRecovery, setPasswordRecovery] = React.useState(false);

    React.useEffect(() => {
      if (passwordRecovery) {
        const isError = checkErrors(Object.values(formErrors));

        if (!isError) {
          sendResetLink();
        }
      }

      if (props.message) {
        toggleSnackbar(true);
      }
    }, [
      passwordRecovery,
      props.message
    ]);

  const sendResetLink = async () => {
    setPasswordRecovery(false);
    await props.requestPasswordRecovery(email.toLocaleLowerCase());
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;

    setEmail(value);
  }

  const validate = () => {
    const formErrors: PasswordRecoveryComponent.Errors = {};

    if (!email) {
      formErrors[PasswordRecoveryComponent.FieldNames.Email] = PasswordRecoveryComponent.errorMessages.noValue;
    } else if (email) {
      if (!(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
        formErrors[PasswordRecoveryComponent.FieldNames.Email] = PasswordRecoveryComponent.errorMessages.invalidEmail;
      }
    }
    return setFormErrors(formErrors);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }
    validate();
    setPasswordRecovery(true);
  }

  return (
    <div className="nabi-margin-bottom-xlarge">
      <Head>
        <title>{pageTitlesAndDescriptions.accountRecovery.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.accountRecovery.description}></meta>
      </Head>
      <Header 
        drawerMenuItems={menuItems}
        headerMenuItems={headerMenuItems}
      />
      <PageTitle pageTitle={PasswordRecoveryComponent.pageTitle} />
      <Grid item={true} md={6} xs={10} sm={8} className="nabi-margin-center">
        <div className="form-card nabi-background-white nabi-section">
          <form noValidate={true} autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth={true}
              id={PasswordRecoveryComponent.Ids.Email}
              margin="normal"
              onChange={handleChange}
              name={PasswordRecoveryComponent.FieldNames.Email}
              placeholder={PasswordRecoveryComponent.Placeholders.Email}
              required={true}
              helperText={formErrors.email}
              error={!!formErrors.email}
              value={email}
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
                disabled={!email}
              >
                {PasswordRecoveryComponent.Text.PasswordRecovery}
              </Button>
            </div>
          </form>
        </div>
      </Grid>
      <SnackBar
        isOpen={isSnackbarOpen}
        message={props.message ? props.message : ''}
        handleClose={() => toggleSnackbar(false)}
        variant="success"
      />
      <Footer bottomPlacement={true} />
    </div>
  );
};


function mapStateToProps(state: StoreState): StateProps {
  const {
    user,
    actions: {
      requestPasswordRecovery: {
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
  requestPasswordRecovery: (email: string) => dispatch(requestPasswordRecovery(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
