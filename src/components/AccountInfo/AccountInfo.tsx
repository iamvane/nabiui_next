import * as React from 'react';
import Router from "next/router";
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import * as _ from "lodash";

import 'react-datepicker/dist/react-datepicker.css';

import {
  CircularProgress,
  Typography
} from '@material-ui/core';
// import ArrowForward from '@material-ui/icons/ArrowForward';
import dynamic from "next/dynamic";
const ArrowForward = dynamic(() => import('@material-ui/icons/ArrowForward'), {
  ssr: false,
});

import { StoreState } from '../../redux/reducers/store';
import {
  fetchUser,
  updateUser,
  changeAvatar
} from '../../redux/actions/UserActions';
import { UserType } from '../../redux/models/UserModel';
import { Routes } from '../common/constants/Routes';
import { CommonStepperButtons } from '../CommonStepper/constants';
import { StepperButtons } from '../CommonStepper/StepperButtons';
import AccountInfoForm  from './AccountInfoForm';
import { AccountInfoComponent } from './constants';
import {
  AccountInfoType,
  VerificationChannel
} from './models';
import { checkErrors } from "../../utils/checkErrors";

interface DispatchProps {
  fetchUser: () => void;
  updateUser: (user: Partial<AccountInfoType>) => void;
  changeAvatar: (id: string, avatar: string) => void;
}

interface OwnProps {
  nextPath: string;
}

interface StateProps {
  user: UserType;
  isRequestingFetch: boolean;
  isRequestingUpdate: boolean;
  errorUpdate: string;
  updateAvatarMessage: string;
}

interface Props extends
  DispatchProps,
  StateProps,
  OwnProps {
    hasImageUploader?: boolean;
    redirectUrl: string;
  }

  export const AccountInfo = (props: Props) => {
    const [accountInfo, setAccountInfo] = React.useState({
      gender: '',
      location: '',
      lat: '',
      lng: ''
    });
    const [errors, setErrors] = React.useState({
      gender: '',
      phoneNumber: ''
    });
    const [performRedirect, setPerformRedirect] = React.useState(false);
    const [showSections, setShowSections] = React.useState(['avatar']);
    const [disableContinue, setDisableContinue] = React.useState(true);

    React.useEffect(() => {
      //get user
      const fetchData = async () => {
        await props.fetchUser();
      };
      fetchData();

      // set state
      if (props.user) {
        setAccountInfo({
          ...accountInfo,
          gender: props.user.gender,
          location: props.user.location
        })
      }

      // if user data exists show all fields
      if (props.user.gender && props.user.avatar && props.user.location && props.user.isPhoneVerified) {
        setShowSections(['showAll'])
      }
      // updates active section when avatar is chanegd
      if (props.updateAvatarMessage || props.user.avatar || props.user.isPhoneVerified) {
        setDisableContinue(false);
      }

    },[props.updateAvatarMessage, props.user.gender, props.user.avatar, props.user.location, props.user.isPhoneVerified]);

    // if phone is already verified disable continue button
    React.useEffect(() => {
      if (props.user.isPhoneVerified && showSections.includes('phone') && !showSections.includes('showAll') && !showSections.includes('location')) {
        setDisableContinue(false);
      }
    },[showSections, props.user.isPhoneVerified]);

    React.useEffect(() => {


    }, [performRedirect, props.errorUpdate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const { FieldNames } = AccountInfoComponent;

    if (name === FieldNames.gender) {
      setAccountInfo({
        ...accountInfo,
        gender: value
      })
      setDisableContinue(false);
    }
  };

  const validate = () => {
    const formErrors: AccountInfoComponent.Errors = {
    };

    const {
      errorMessages,
      FieldKey,
    } = AccountInfoComponent;
    // Validate gender
    if (!accountInfo.gender) {
      formErrors[FieldKey.Gender] = errorMessages[FieldKey.Gender];
    }

    // Validate phone number
    if (!props.user.isPhoneVerified) {
      formErrors[FieldKey.PhoneNumber] = errorMessages.PhoneNumberNotVerified;
    }

    // Validate location
    if (!accountInfo.location) {
      formErrors[FieldKey.Location] = errorMessages.location;
    }
    return formErrors;
  }

  const handleLocationChange = (location: string) => {
    setAccountInfo({
      ...accountInfo,
      location
    })
  }

  const getLatLng = (lat: string, lng: string) => {
    setAccountInfo({
      ...accountInfo,
      lat,
      lng
    })
    setDisableContinue(false);
  };

  const handleNext = async() => {
    if (showSections.includes('avatar')) {
      setShowSections([
        'gender'
      ]),
      setDisableContinue(true);
    }

    if (showSections.includes('gender')) {
      setShowSections([
        ...showSections,
        'phone'
      ]),
      setDisableContinue(true);
    }

    if (showSections.includes('phone')) {
      setShowSections([
        ...showSections,
        'location'
      ]),
      setDisableContinue(true);
    }


    const currentState = {
      gender: accountInfo.gender,
      location: accountInfo.location
    }

    const storeState = {
      gender: props.user.gender,
      location: props.user.location
    }

    if (showSections.includes('showAll') && _.isEqual(currentState, storeState)) {
      return setPerformRedirect(true);
    }

    if (showSections.includes('location') || showSections.includes('showAll')) {
      const formErrors = validate();
      const isError = checkErrors(Object.values(formErrors));

      if (isError) {
        return;
      }

      await props.updateUser({...accountInfo, gender: ''});

      if (!props.errorUpdate) {
        return alert('no error')
        // setPerformRedirect(true)
      }
      return alert('error')
    }
  }

  return (
    props.isRequestingFetch || props.isRequestingUpdate ? (
      <div className="nabi-text-center">
        <CircularProgress />
      </div>
    ) : (
      <div>
        <AccountInfoForm
          user={props.user}
          accountInfo={accountInfo}
          errors={errors}
          redirectUrl={props.redirectUrl}
          handleChange={handleChange}
          getLatLng={getLatLng}
          handleLocationChange={handleLocationChange}
          location={accountInfo.location || ''}
          phoneError={errors.phoneNumber}
          changeAvatar={props.changeAvatar}
          showSections={showSections}
        />
        {performRedirect && Router.push(props.redirectUrl)}
        {props.errorUpdate &&
          <Typography className="nabi-text-center" color="error">{props.errorUpdate}</Typography>
        }
        <StepperButtons
          buttonText={CommonStepperButtons.Continue}
          handleNext={handleNext}
          icon={<ArrowForward />}
          isNextDisabled={disableContinue}
        />
      </div>
    )
  );
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
      },
      uploadAvatar: {
        message: updateAvatarMessage
      }
    },
  } = state.user;

  return {
    user,
    isRequestingFetch,
    isRequestingUpdate,
    errorUpdate,
    updateAvatarMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
  updateUser: (user: AccountInfoType) => dispatch(updateUser(user)),
  changeAvatar: (id: string, avatar: string) => dispatch(changeAvatar(id, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
