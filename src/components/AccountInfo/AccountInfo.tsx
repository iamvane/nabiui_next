import * as React from 'react';
import Router from "next/router";
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import 'react-datepicker/dist/react-datepicker.css';

import {
  CircularProgress,
  Typography
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { StoreState } from '../../redux/reducers/store';
import {
  fetchUser,
  updateUser,
} from '../../redux/actions/UserActions';
import { UserType } from '../../redux/models/UserModel';
import { Routes } from '../common/constants/Routes';
import { validateNames } from '../../utils/formValidation';
import { CommonStepperButtons } from '../CommonStepper/constants';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import AccountInfoForm  from './AccountInfoForm';
import { AccountInfoComponent } from './constants';
import {
  AccountInfoType,
  VerificationChannel
} from './models';

interface DispatchProps {
  fetchUser: () => void;
  updateUser: (user: Partial<AccountInfoType>) => void;
}

interface OwnProps {
  nextPath: string;
}

interface StateProps {
  user: UserType;
  isRequestingFetch: boolean;
  isRequestingUpdate: boolean;
  errorUpdate: string;
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {
    hasImageUploader?: boolean;
    redirectUrl: string;
  }

interface State {
  accountInfo: AccountInfoType;
  verificationChannel: VerificationChannel;
  isPhoneSet: boolean;
  token: string;
  errors: AccountInfoComponent.Errors;
  performRedirect: boolean;
  redirectToLogin: boolean;
}

export class AccountInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      verificationChannel: VerificationChannel.Text,
      isPhoneSet: false,
      token: '',
      performRedirect: false,
      accountInfo: {
        firstName: '',
        lastName: '',
        gender: '',
        location: '',
        lat: '',
        lng: '',
      },
      errors: {},
      redirectToLogin: false
    };
  }

  public componentDidMount(): void {
    this.props.fetchUser();
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.currentTarget;
    this.setState({
      accountInfo: {
        ...this.state.accountInfo,
        [name]: value
      }
    });
  }

  public validate = (userValues: AccountInfoComponent.Errors) => {
    const {
      firstName,
      lastName,
      gender,
    } = userValues;

    const {
      errorMessages,
      FieldKey,
      firstNameMinVal,
      firstNameMaxVal,
      lastNameMinVal,
      lastNameMaxVal
    } = AccountInfoComponent;

    const formErrors: AccountInfoComponent.Errors = {
      firstName: '',
      lastName: '',
      gender: '',
    };

    // Validate first name
    if (!firstName || firstName.trim().length < firstNameMinVal || firstName.trim().length > firstNameMaxVal) {
      formErrors[FieldKey.FirstName] = errorMessages[FieldKey.FirstName].emptyFirstName;
    } else if (validateNames(firstName)) {
      formErrors[FieldKey.FirstName] = errorMessages[FieldKey.FirstName].invalidFirstName;
    }

    // Validate last name
    if (!lastName || lastName.trim().length < lastNameMinVal || lastName.trim().length > lastNameMaxVal) {
      formErrors[FieldKey.LastName] = errorMessages[FieldKey.LastName].emptyLastName;
    } else if (validateNames(lastName)) {
      formErrors[FieldKey.LastName] = errorMessages[FieldKey.LastName].invalidLastName;
    }

    // Validate gender
    if (!gender) {
      formErrors[FieldKey.Gender] = errorMessages[FieldKey.Gender];
    }

    // Validate phone number
    if (!this.props.user.isPhoneVerified) {
      formErrors[FieldKey.PhoneNumber] = errorMessages.PhoneNumberNotVerified;
    }

    return formErrors;
  }

  public handleNext = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
    }

    const valuesToValidate: AccountInfoComponent.Errors = {
      firstName: this.state.accountInfo.firstName,
      lastName: this.state.accountInfo.lastName,
      gender: this.state.accountInfo.gender,
      token: this.state.token
    };

    const formErrors = this.validate(valuesToValidate);

    this.setState({errors: formErrors}, () => {
      const errorsArray = Object.values(this.state.errors);
      const isError = errorsArray.some(value => value);
      if (!isError) {
        this.props.updateUser({...this.state.accountInfo});
        this.props.fetchUser();
        if (!this.props.errorUpdate) {
          this.setState({performRedirect: true});
        }
      }
    });
  }

  public handleLocationChange = (location: string) => {
    this.setState({
      accountInfo: {
        ...this.state.accountInfo,
        location
      }
    });
  }

  public handleLocationSelect = (location: string) => {
    this.setState({
      accountInfo: {
        ...this.state.accountInfo,
        location
      }
    });
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(coordinates => this.setState({
        accountInfo: {
          ...this.state.accountInfo,
          lat: String(coordinates.lat),
          lng: String(coordinates.lng)
        }
      }))
      .catch(error => console.log('Error', error));
  }

  public render(): JSX.Element {
    return (
      this.props.isRequestingFetch || this.props.isRequestingUpdate ? (
        <div className="nabi-text-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <AccountInfoForm
            user={this.props.user}
            accountInfo={this.state.accountInfo}
            verificationChannel={this.state.verificationChannel}
            errors={this.state.errors}
            hasImageUploader={this.props.hasImageUploader}
            redirectUrl={this.props.redirectUrl}
            handleChange={this.handleChange}
            handleLocationSelect={this.handleLocationSelect}
            handleLocationChange={this.handleLocationChange}
            location={this.state.accountInfo.location || ''}
            phoneError={this.state.errors.phoneNumber}
          />
          {this.state.performRedirect && Router.push(this.props.redirectUrl)}
          {this.state.redirectToLogin && Router.push(Routes.Login)}
          {this.props.errorUpdate &&
            <Typography className="nabi-text-center" color="error">{this.props.errorUpdate}</Typography>
          }
          <StepperButtons
            buttonText={CommonStepperButtons.Continue}
            handleNext={this.handleNext}
            icon={<ArrowForward />}
          />
        </div>
      )
    );
  }
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    user,
    actions: {
      fetchUser: {
        isRequesting: isRequestingFetch,
      },
      updateUser: {
        isRequesting: isRequestingUpdate,
        error: errorUpdate
      }
    },
  } = state.user;

  return {
    user,
    isRequestingFetch,
    isRequestingUpdate,
    errorUpdate
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
  updateUser: (user: AccountInfoType) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
