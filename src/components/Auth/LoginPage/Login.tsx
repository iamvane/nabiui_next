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
  fetchUser
} from '../../../redux/actions/UserActions';
import { LoginComponent } from './constants';
import PageTitle from '../../common/PageTitle';
import { Routes } from '../../common/constants/Routes';
import SnackBar from '../../common/SnackBar';
import { LoginType } from './model';
import LoginForm from './LoginForm';
import PrivateRoute from '../ProtectRoutes/PrivateRoute';

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
  fetchUser: () => void;
}

interface Props extends
  OwnProps,
  DispatchProps,
  StateProps { }

export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showSnackbar: false,
    };
  }

  public componentDidMount() {
    this.setState({
      showSnackbar: this.props.passwordSetMessage ? true : false
    });
    const analiticsProps = {
      properties: {
        referrer: document.referrer
      }
    };
    page('Login', analiticsProps);
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  public handleSubmit = async (event: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    await this.props.authenticateUser(this.state.email.toLocaleLowerCase(), this.state.password);

    if (!this.props.loginError) {
      const analiticsProps = {
        userId: this.state.email,
        properties: {
          referrer: document.referrer
        }
      };
      track('Logged in', analiticsProps);
    }
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false });

  public render(): JSX.Element {
    if (this.props.token) {
      Router.push(Routes.Dashboard);
      return null;
    }
    return (
      <div className="nabi-margin-bottom-xlarge">
        <PageTitle pageTitle={LoginComponent.pageTitle} />
        <Grid item={true} md={6} xs={10} sm={8} className="nabi-margin-center">
          <div className="form-card nabi-background-white nabi-section">
            <LoginForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              apiError={this.props.loginError}
              isRequesting={this.props.isRequesting || this.props.isRequestingUser}
            />
          </div>
        </Grid>
        {
          this.props.passwordSetMessage &&
          <SnackBar
            isOpen={this.state.showSnackbar}
            message={this.props.passwordSetMessage ? this.props.passwordSetMessage : ''}
            handleClose={this.closeSnackbar}
            variant="success"
          />
        }
      </div>
    );
  }
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
  fetchUser: () => dispatch(fetchUser())
});

export default 
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(Login, 'Public'));