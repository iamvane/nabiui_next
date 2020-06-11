import * as React from 'react';
import Router from "next/router";
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import * as _ from "lodash";

import {
  fetchUser,
  requestToken
} from '../../redux/actions/UserActions';
import { UserType } from '../../redux/models/UserModel';
import { StoreState } from '../../redux/reducers/store';
import PhoneValidation from '../../components/AccountInfo/PhoneValidation';
import { VerificationChannel } from '../../components/AccountInfo/models';

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
    hasImageUploader?: boolean;
    redirectUrl: string;
  }


export const ValidatePhone = (props: Props) => {
  React.useEffect(() => {
    //get user
    const fetchData = async () => {
      await props.fetchUser();
    };
    fetchData();
    if (props.user.phoneNumber && !props.user.isPhoneVerified) {
      props.requestToken(props.user.phoneNumber, VerificationChannel.Text);
    }
  },[]);

  return (
    <div className="nabi-container">
      <div className="nabi-section nabi-background-white">
        <PhoneValidation error="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePhone);
