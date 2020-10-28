import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import { StoreState } from '../../redux/reducers/store';
import {
  requestToken,
  verifyToken
} from '../../redux/actions/UserActions';
import { UserActions } from '../../redux/actions/UserActionTypes';
import { requestAction } from '../../redux/actions/actions';
import SnackBar from '../common/SnackBar';
import PhoneValidationForm from './PhoneValidationForm';
import { AccountInfoComponent, PhoneValidationComponent } from './constants';
import { VerificationChannel } from './models';

interface DispatchProps {
  requestToken: (phoneNumber: string, channel: VerificationChannel) => void;
  verifyToken: (phoneNumber: string, token: string) => void;
  resetRequestTokenMessage: () => void;
}

interface StateProps {
  isRequestingToken: boolean;
  isVerifyingToken: boolean;
  errorRequestToken: string;
  errorVerifyToken: string;
  requestTokenMessage: string;
  verifyTokenMessage: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
}

interface OwnProps {
  toggleChangePhoneNumber?: () => void;
  isEditing?: boolean;
  error?: string;
  customClass?: string;
  hideLabel?: boolean;
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {}

interface State {
  verificationChannel: string;
  isPhoneSet: boolean;
  token: string;
  errors: any;
  showSnackbar: boolean;
  snackbarMessage: string;
  phoneNumber: string;
  isPhoneVerified?: boolean;
}

export class PhoneValidation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verificationChannel: VerificationChannel.Text,
      isPhoneSet: false,
      token: '',
      errors: {},
      showSnackbar: false,
      snackbarMessage: '',
      phoneNumber: ''
    };
  }

  public componentDidMount() {
    if (this.props.phoneNumber) {
      this.setState({
        phoneNumber: this.props.phoneNumber
      })
    }
    if (this.props.isPhoneVerified) {
      this.setState({
        isPhoneVerified: this.props.isPhoneVerified
      })
    }
    if (this.props.requestTokenMessage) {
      this.setState({
        isPhoneSet: true
      })
    }
  }

  public handleNumberChange = (value: string): void => {
    this.setState({
      ...this.state,
      ...(Boolean(value) && {
        phoneNumber: value
      })
    });
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  public componentDidUpdate(prevProps: Props): void {
    if ((prevProps.phoneNumber !== this.props.phoneNumber) && this.props.phoneNumber) {
      this.setState({
        ...this.state,
        phoneNumber: this.props.phoneNumber
      })
    }
    if ((prevProps.isPhoneVerified !== this.props.isPhoneVerified) && this.props.isPhoneVerified) {
      this.setState({
        ...this.state,
        isPhoneVerified: this.props.isPhoneVerified
      })
    }

    if ((prevProps.requestTokenMessage !== this.props.requestTokenMessage) && this.props.requestTokenMessage) {
      this.setState({
        ...this.state,
        showSnackbar: true,
        snackbarMessage: this.props.requestTokenMessage,
        isPhoneSet: true
      });
    }

    if ((prevProps.verifyTokenMessage !== this.props.verifyTokenMessage) && this.props.verifyTokenMessage) {
      this.setState({
        ...this.state,
        showSnackbar: true,
        snackbarMessage: this.props.verifyTokenMessage
      });
    }

    if ((prevProps.errorVerifyToken !== this.props.errorVerifyToken) && this.props.errorVerifyToken) {
      this.setState({
        ...this.state,
        errors: {...this.state.errors, [AccountInfoComponent.FieldKey.Token]: this.props.errorVerifyToken}
      });
    }
    if (!this.state.isPhoneSet && this.props.requestTokenMessage) {
      this.setState({
        ...this.state,
        isPhoneSet: true
      });
    }
  }

  public resendCode = () => {
    this.setState({
      isPhoneSet: false,
      token: ''
    });
    this.props.resetRequestTokenMessage();
  }

  public sendVerificationToken = async () => {
    const { errorMessages, FieldKey } = AccountInfoComponent;

    if ((document.querySelector("select[name='phoneNumberCountry']") as any).value === 'ZZ') {
      return this.setState({errors: {...this.state.errors, [FieldKey.PhoneNumber]: errorMessages.PhoneMissingCountryCode}});
    }

    if (!this.state.phoneNumber ||
      this.state.phoneNumber.length < PhoneValidationComponent.usPhoneNumberLenght) {
      return this.setState({errors: {...this.state.errors, [FieldKey.PhoneNumber]: errorMessages.PhoneNumberEmpty}});
    }

    await this.props.requestToken(
      this.state.phoneNumber,
      this.state.verificationChannel as VerificationChannel
    );

    if (this.props.errorRequestToken) {
      return this.setState({
        errors: {...this.state.errors, [FieldKey.PhoneNumber]: this.props.errorRequestToken}
      });
    }

    this.setState(prevState => ({
      isPhoneSet: !prevState.isPhoneSet,
      errors: {...this.state.errors, [FieldKey.Token]: ''},
    }));
  }

  public verifyToken = async () => {
    const { errorMessages, FieldKey } = AccountInfoComponent;
    const phoneNumber = this.state.phoneNumber || '';

    if (!this.state.token) {
      this.setState({
        errors: {...this.state.errors, [FieldKey.Token]: errorMessages.token.enterYourVerificationCode}
      });
    } else {
        await this.props.verifyToken(phoneNumber, this.state.token);
        if (this.props.errorVerifyToken) {
          return this.setState({
            errors: {...this.state.errors, [AccountInfoComponent.FieldKey.Token]: this.props.errorVerifyToken}
          });
        } else {
          this.setState({ isPhoneVerified: true });
        }
    }
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false});

  public render(): JSX.Element {
    return (
      <div className={this.props.customClass ? this.props.customClass : ''}>
        <PhoneValidationForm
          phoneNumber={this.state.phoneNumber}
          isPhoneSet={this.state.isPhoneSet}
          handleChange={this.handleChange}
          handleNumberChange={this.handleNumberChange}
          token={this.state.token}
          sendVerificationToken={this.sendVerificationToken}
          verifyToken={this.verifyToken}
          verificationChannel={this.state.verificationChannel}
          toggleChangePhoneNumber={this.props.toggleChangePhoneNumber}
          resendCode={this.resendCode}
          isEditing={this.props.isEditing}
          errors={this.state.errors}
          isRequesting={this.props.isRequestingToken || this.props.isVerifyingToken}
          phoneError={this.props.error}
          isPhoneVerified={this.state.isPhoneVerified}
          hideLabel={this.props.hideLabel}
        />
        <SnackBar
          isOpen={this.state.showSnackbar}
          message={this.state.snackbarMessage}
          handleClose={this.closeSnackbar}
          variant="success"
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    user: {
      phoneNumber,
      isPhoneVerified
    },
    actions: {
      requestToken: {
        isRequesting: isRequestingToken,
        error: errorRequestToken,
        message: requestTokenMessage
      },
      verifyToken: {
        isRequesting: isVerifyingToken,
        error: errorVerifyToken,
        message: verifyTokenMessage
      }
    },
  } = state.user;

  return {
    phoneNumber,
    isPhoneVerified,
    isRequestingToken,
    isVerifyingToken,
    errorRequestToken,
    errorVerifyToken,
    requestTokenMessage,
    verifyTokenMessage,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  requestToken: (phoneNumber: string, channel: VerificationChannel) =>
    dispatch(requestToken(phoneNumber, channel)),
  verifyToken: (phoneNumber: string, token: string) =>
    dispatch(verifyToken(phoneNumber, token)),
  resetRequestTokenMessage: () => dispatch(requestAction(UserActions.RESET_REQUEST_TOKEN_MESSAGE))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidation);
