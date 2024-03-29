import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  //Dispatch
} from 'redux';
import {
  Dispatch,
  ThunkAction
} from 'redux-fixed';

import Router from 'next/router';
import Head from 'next/head';

import { Grid } from 'nabi_web_components';

import { StoreState } from '../../../redux/reducers/store';
import {
  page,
  track
} from '../../../utils/analytics';
import { UserType } from '../../../redux/models/UserModel';
import {
  authenticateUser,
  fetchUserOnLogin
} from '../../../redux/actions/UserActions';
import { validateEmail } from '../../../utils/formValidation';
import PageTitle from '../../common/PageTitle';
import { Routes } from '../../common/constants/Routes';
import { pageTitlesAndDescriptions } from '../../common/constants/TitlesAndDescriptions';
import SnackBar from '../../common/SnackBar';
import PrivateRoute from '../../Auth/PrivateRoutes';
import { Header } from '../../Header/Header';
import { Footer } from "../../common/Footer";
import { Role } from '../Registration/constants';
import LoginForm from './LoginForm';
import {
  LoginComponent,
  LoginFormComponent,
  menuItems,
  headerMenuItems
} from './constants';

interface StateProps {
  user: UserType;
  isRequesting: boolean;
  loginError: string;
  isRequestingUser: boolean;
  token: string;
  passwordSetMessage: string;
}

interface OwnProps {
  error?: string;
}

interface DispatchProps {
  authenticateUser: (email: string, password: string) => void;
  fetchUser: (token: string) => void;
}

interface Props extends
  OwnProps,
  DispatchProps,
  StateProps { }

const Login = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displaySnackBar, setDisplaySnackBar] = React.useState(false);
  const [login, setLogin ] = React.useState(false);
  const [validEmail, confirmValidEmail] = React.useState(false);
  const [validPassword, confirmValidPassword] = React.useState(false);

  React.useEffect(() => {
    if (props.passwordSetMessage && !login) {
      setDisplaySnackBar(true)
    }
    if (!login) {
      const analiticsProps = {
        properties: {
          referrer: document.referrer
        }
      };
      page('Login', analiticsProps);
    }

    if (!props.loginError && props.token && login) {
      const analiticsProps = {
        userId: email,
        properties: {
          referrer: document.referrer
        }
      };
      track('Logged in', analiticsProps);

      const fetchUser = async () => {
        await props.fetchUser(props.token);
      };
      fetchUser();
      if (props.user.email) {
        if (props.user.role === Role.instructor) {
          Router.push(Routes.InstructorStudio);
        } else {
          Router.push(Routes.ParentStudio);
        }
      }
    }
  }, [props.loginError, props.token, props.passwordSetMessage, login, props.user.email]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === LoginFormComponent.FieldNames.Email) {
      confirmValidEmail(validateEmail(value))
      setEmail(value);
    } else if (name === LoginFormComponent.FieldNames.Password) {
      confirmValidPassword(Boolean(value));
      setPassword(value);
    }
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    props.authenticateUser(email.toLocaleLowerCase(), password);

    setLogin(true);
    setDisplaySnackBar(false)
  }

  return (
    <div className="nabi-margin-bottom-xlarge">
      <Head>
        <title>{pageTitlesAndDescriptions.login.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.login.description}></meta>
      </Head>
      <Header
        drawerMenuItems={menuItems}
        headerMenuItems={headerMenuItems}
      />
      <PageTitle pageTitle={LoginComponent.pageTitle} />
      <Grid item={true} md={6} xs={10} sm={8} className="nabi-margin-center">
        <div className="form-card nabi-background-white nabi-section">
          <LoginForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            apiError={props.loginError}
            isRequesting={props.isRequesting || props.isRequestingUser}
            isDisabled={validEmail && validPassword ? false : true}
          />
        </div>
      </Grid>
      {
        props.passwordSetMessage &&
        <SnackBar
          isOpen={displaySnackBar}
          message={props.passwordSetMessage ? props.passwordSetMessage : ''}
          handleClose={() => setDisplaySnackBar(false)}
          variant="success"
        />
      }
      <Footer bottomPlacement={true} />
    </div>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    user,
    token,
    actions: {
      authenticateUser: {
        isRequesting,
        error: loginError
      },
      fetchUser: {
        isRequesting: isRequestingUser
      },
      setPassword: {
        message: passwordSetMessage
      }
    },
  } = state.user;

  return {
    token,
    user,
    isRequesting,
    loginError,
    isRequestingUser,
    passwordSetMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  authenticateUser: (email: string, password: string) => dispatch(authenticateUser(email, password)),
  fetchUser: (token: string) => dispatch(fetchUserOnLogin(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(Login, 'Public'));
