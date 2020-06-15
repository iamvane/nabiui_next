import * as React from 'react';
import Router from "next/router";
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import * as _ from "lodash";

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import {
  fetchUser,
  requestToken
} from '../../redux/actions/UserActions';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import PhoneValidation from '../AccountInfo/PhoneValidation';
import PageTitle from '../common/PageTitle';
import { VerificationChannel } from '../AccountInfo/models';
import { Routes } from '../common/constants/Routes';
import { LessonDetailsComponent } from './constants';

interface DispatchProps {
  fetchUser: () => void;
  requestToken: (phoneNumber: string, channel: VerificationChannel) => void;
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
    redirectUrl: string;
  }


export const LessonDetails = (props: Props) => {
  const [numberOfChildren, setNumberOfChildren] = React.useState('');

  React.useEffect(() => {
    //get user
    const fetchData = async () => {
      await props.fetchUser();
    };
    fetchData();
  },[]);

  React.useEffect(() => {
    if (props.user.phoneNumber && !props.user.isPhoneVerified) {
      const requestToken = async () => {
        await props.requestToken(props.user.phoneNumber, VerificationChannel.Text);
      };
      requestToken();
    }
  },[props.user.phoneNumber, props.user.isPhoneVerified]);

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>): void => {
      const target = event.currentTarget;
      const value = target.value;
      const name = target.name;

      switch (name) {
        case LessonDetailsComponent.FieldNames.NumberOfChildren:
          setNumberOfChildren(value);
          break;
        // case RegistrationFormComponent.FieldNames.LastName:
        //   setLastName(value);
        //   break;
        // case RegistrationFormComponent.FieldNames.Email:
        //   setEmail(value);
        //   break;
        // case RegistrationFormComponent.FieldNames.Password:
        //   setPassword(value);
        //   break;
        // case RegistrationFormComponent.FieldNames.Reference:
        //   setReference(value);
        //   break;
        // case RegistrationFormComponent.FieldNames.OtherText:
        //   setOtherText(value);
        //   break;
        // case RegistrationFormComponent.FieldNames.AgreeWithTerms:
        //   setAgreeWithTerms(target.checked);
        //   break;
        default:
          return;
        }
      },
    []
  );

  return (
    <div className="nabi-container">
      <PageTitle pageTitle={LessonDetailsComponent.pageTitle} />
      <div className="nabi-section nabi-background-white">
      <FormControl
        fullWidth={true}
        className="nabi-margin-top-small"
        // error={!!formErrors.reference}
      >
        <Select
          native={true}
          value={numberOfChildren}
          onChange={() => handleChange}
          input={<Input name={LessonDetailsComponent.FieldNames.NumberOfChildren} />}
        >
          <option value="" disabled={true}>
            How many children are learning?
          </option>
          <option value="1">
            1
          </option>
          <option value="2">
            2
          </option>
          <option value="3">
            3
          </option>
          <option value="4">
            4
          </option>
        </Select>
        {/* <FormHelperText>{formErrors.reference}</FormHelperText> */}
      </FormControl>
      </div>
      <div className="nabi-text-right">
        <Link href={Routes.BuildRequest + Routes.LessonDetails}>
          <Button
            color="primary"
            className="nabi-text-uppercase nabi-margin-top-small nabi-margin-bottom-medium"
            variant="contained"
          >
            {LessonDetailsComponent.nextButton}
          </Button>
        </Link>
      </div>
    </div>
  )
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
  requestToken: (phoneNumber: string, channel: VerificationChannel) =>
    dispatch(requestToken(phoneNumber, channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetails);
