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
  Grid
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
import { ValidatePhoneComponent } from './constants';

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

export const ValidatePhone = (props: Props) => {
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

  return (
    <div className="nabi-container">
      <PageTitle pageTitle={ValidatePhoneComponent.pageTitle} />
      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-margin-center"
      >
        <div className="nabi-section nabi-background-white">
          <PhoneValidation error="" />
        </div>
        {props.user.isPhoneVerified &&
          <div className="nabi-text-right">
            <Link href={Routes.ScheduleTrial + Routes.LessonDetails}>
              <Button
                color="primary"
                className="nabi-text-uppercase nabi-margin-top-small nabi-margin-bottom-medium"
                variant="contained"
              >
                {ValidatePhoneComponent.nextButton}
              </Button>
            </Link>
          </div>
        }
      </Grid>
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