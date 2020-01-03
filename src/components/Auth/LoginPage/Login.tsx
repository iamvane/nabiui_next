import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import Router from 'next/router';

import { Grid } from '@material-ui/core';

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
import { LoginComponent } from './constants';
import PageTitle from '../../common/PageTitle';
import { Routes } from '../../common/constants/Routes';
import SnackBar from '../../common/SnackBar';
import { LoginType } from './model';
import LoginForm from './LoginForm';
import { LoginFormComponent } from './constants';

interface State extends LoginType {
  showSnackbar: boolean;
}

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

  React.useEffect(() => {
    if (props.passwordSetMessage) {
      setDisplaySnackBar(true)
    }
    const analiticsProps = {
      properties: {
        referrer: document.referrer
      }
    };
    page('Login', analiticsProps);
  }, []);

// export class Login extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       showSnackbar: false,
//     };
//   }

  // public componentDidMount() {
  //   this.setState({
  //     showSnackbar: this.props.passwordSetMessage ? true : false
  //   });
  //   const analiticsProps = {
  //     properties: {
  //       referrer: document.referrer
  //     }
  //   };
  //   page('Login', analiticsProps);
  // }

  // public componentDidUpdate(prevProps: Props): void {
  //   if (prevProps.token !== this.props.token) {
  //     this.props.fetchUser(this.props.token);
  //   }
  // }
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === LoginFormComponent.FieldNames.Email) {
      setEmail(value);
    } else if (name === LoginFormComponent.FieldNames.Password) {
      setPassword(value);
    }
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    await props.authenticateUser(email.toLocaleLowerCase(), password);

    if (!props.loginError) {
      await props.fetchUser(props.token);

      const analiticsProps = {
        userId: email,
        properties: {
          referrer: document.referrer
        }
      };
      track('Logged in', analiticsProps);
      props.user.email && Router.push(Routes.Dashboard)
    }
  }

  return (
    <div className="nabi-margin-bottom-xlarge">
      <PageTitle pageTitle={LoginComponent.pageTitle} />
      <Grid item={true} md={6} xs={10} sm={8} className="nabi-margin-center">
        <div className="form-card nabi-background-white nabi-section">
          <LoginForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            apiError={props.loginError}
            isRequesting={props.isRequesting || props.isRequestingUser}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
