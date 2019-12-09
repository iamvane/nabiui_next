import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
  Action,
  Dispatch
} from 'redux';
import { Redirect } from 'react-router';

import { StoreState } from '../../../redux/reducers/store';
import { RedirectState } from '../../../redux/models/models';
import { createUser } from '../../../redux/actions/UserActions';
import PageTitle from '../../common/PageTitle';
import { Routes } from '../../common/constants/Routes';
import RegistrationForm from './RegistrationForm';
import AgeDisclaimer from './AgeDisclaimer';

import {
  Role,
  RegistrationComponent,
  RegistrationFormComponent
} from './constants';
import { RegistrationType } from './models';
import {
  page,
  track
} from '../../../utils/analytics';

export interface RegistrationErrors {
  [RegistrationFormComponent.FieldKey.Email]?: string;
  [RegistrationFormComponent.FieldKey.Password]?: string;
}

interface StateProps {
  invitationToken: string;
  isRequesting: boolean;
  apiError: string;
}

interface OwnProps {
  role?: Role;
}

interface DispatchProps {
  createUser: (user: RegistrationType) => void;
}

interface OwnProps {
  role?: Role;
}

interface Props extends
  WithRouterProps,
  NextRouter,
  OwnProps,
  DispatchProps,
  StateProps { }

interface OpenModalState {
  openModal: boolean;
  isDisabled: boolean;
}

interface State extends
  RegistrationType,
  RedirectState,
  OpenModalState {
  errors: RegistrationErrors;
  isUnderAge: boolean;
  agreeWithTerms: boolean;
}

/**
 * Contains a form to register new users
 */
export class Registration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: Role.student,
      birthday: undefined,
      openModal: false,
      isDisabled: true,
      isUnderAge: false,
      errors: {},
      performRedirect: false,
      agreeWithTerms: false
    };
  }

  componentDidMount() {
    if (this.props.role) {
      this.setState({ role: this.props.role });
    }

    const analiticsProps = {
      properties: {
        referrer: document.referrer
      }
    };
    page('Registration', analiticsProps);
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

  public handleBirthdayChange = (date: moment.Moment): void => {
    this.setState({ birthday: String(date) });
  }

  public displayAgeDisclaimer(): void {
    const userAge = Math.abs(moment(this.state.birthday).diff(moment(), 'years'));

    if (userAge >= RegistrationComponent.minimumAge) {
      return this.setState({ isUnderAge: false });
    }
    return this.setState({ openModal: true, isUnderAge: true });
  }

  public validate = (userValues: RegistrationErrors) => {
    const {
      email,
      password,
    } = userValues;

    const { FieldKey } = RegistrationFormComponent;

    const formErrors: RegistrationErrors = {
      email: '',
      password: '',
    };

    // Validate email
    if (!email) {
      formErrors[FieldKey.Email] = RegistrationFormComponent.ErrorMessages.Email;
    } else if (email) {
      if (!(/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/).test(email) ||
        (/^\s*$/).test(email)) {
        formErrors[FieldKey.Email] = RegistrationFormComponent.ErrorMessages.Email;
      }
    }

    // Validate password
    if (!password) {
      formErrors[FieldKey.Password] = RegistrationFormComponent.ErrorMessages.Password;
    } else if (password) {
      if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W\-_]{5,}$/).test(password) || (/^\s*$/).test(password)) {
        formErrors[FieldKey.Password] = RegistrationFormComponent.ErrorMessages.Password;
      }
    }

    // Validate birthday
    this.displayAgeDisclaimer();

    return formErrors;
  }

  public handleSubmit = async (event: React.SyntheticEvent<HTMLInputElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }
    const valuesToValidate: RegistrationErrors = {
      email: this.state.email.trim().toLocaleLowerCase(),
      password: this.state.password,
    };

    const formErrors = this.validate(valuesToValidate);

    await this.setState({ errors: formErrors }, () => {
      const checkErrors = (array: string[]) => {
        for (var i = 0; i < array.length; i++) {
          if (array[i]) {
            return true;
          }
        }
        return false;
      };
      const errorsArray = Object.values(this.state.errors);
      const isError = checkErrors(errorsArray);

      if (!isError && !this.state.isUnderAge) {
        let userValues: RegistrationType = {
          birthday: moment(this.state.birthday).format('YYYY-MM-DD'),
          email: this.state.email.toLocaleLowerCase(),
          password: this.state.password,
          role: this.state.role,
        };
        if (this.props.invitationToken) {
          userValues.referringCode = this.props.invitationToken;
        }
        this.props.createUser(userValues);
      }

      if (!isError && !this.props.apiError && !this.state.isUnderAge) {
        const analiticsProps = {
          userId: this.state.email,
          properties: {
            referrer: document.referrer
          }
        };
        track('Created Account', analiticsProps);
        if (this.props.apiError) {
          console.log(this.props.apiError);
        }
        this.setState({ performRedirect: true });
      }
    });
  }

  public render(): JSX.Element {
    const closeModal = () => { this.setState({ openModal: false }); };
    return (
      <div className="nabi-container">
        <PageTitle pageTitle={RegistrationComponent.pageTitle} />

        <div className="nabi-background-white nabi-section">
          <RegistrationForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleBirthdayChange={this.handleBirthdayChange}
            birthday={this.state.birthday ? this.state.birthday : ''}
            selectedRole={this.state.role || ''}
            formErrors={this.state.errors}
            apiError={this.props.apiError}
            isRequesting={this.props.isRequesting}
            agreeWithTerms={this.state.agreeWithTerms}
          />
        </div>

        <AgeDisclaimer
          isFormDialogOpen={this.state.openModal}
          closeHandler={closeModal}
        />

        {this.state.performRedirect && !this.props.apiError && !this.props.isRequesting && (
          this.state.role === Role.instructor ?
            <Redirect
              to={{
                pathname: Routes.BuildProfile + Routes.AccountInfo,
                state: { redirectedFrom: Routes.Registration }
              }}
            /> :
            <Redirect
              to={{
                pathname: Routes.BuildRequest + Routes.AccountInfo,
                state: { redirectedFrom: Routes.Registration }
              }}
            />
        )}
      </div>
    );
  }
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    invitationToken,
    actions: {
      createUser: {
        isRequesting,
        error
      }
    },
  } = state.user;

  return {
    invitationToken,
    isRequesting,
    apiError: error
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  createUser: (user: RegistrationType) => dispatch(createUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));
