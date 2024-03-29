import * as React from "react";

import { Avatar, Button, Grid } from "@material-ui/core";
import dynamic from "next/dynamic";
const Star = dynamic(() => import("@material-ui/icons/Star"), {
  ssr: false,
});
import { InstructorProfileType } from "../../redux/models/InstructorModel";
import CollapsibleBalloonList from "../CollapsibleBalloonList/CollapsibleBalloonList";
import { useRouter } from "next/router";
import { StreamChat } from "stream-chat";
import { Action} from "redux";
import {
  Dispatch,
} from 'redux-fixed';

import { StoreState } from "../../redux/reducers/store";
import { fetchUser } from "../../redux/actions/UserActions";
import { UserType } from "../../redux/models/UserModel";
import { connect, useSelector } from "react-redux";

const chatClient = StreamChat.getInstance("9srtnzz4hrxh");
interface Props extends DispatchProps, StateProps, OwnProps {
  instructor: InstructorProfileType;
}

interface StateProps {
  user: UserType;
  isRequestingFetch: boolean;
  isRequestingUpdate: boolean;
  errorUpdate: string;
  updateAvatarMessage: string;
}

interface DispatchProps {
  fetchUser: () => void;
}

interface OwnProps {
  nextPath: string;
}

/**
 * Profile Header
 */
export const ProfileHeader = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  const defaultAvatar =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png";
  const user = useSelector((state: StateProps) => {
    const user = state.user.user;
    return user;
  });

  return (
    <Grid container={true} className="nabi-margin-top-xsmall">
      <Grid
        item={true}
        xs={4}
        className="nabi-text-center nabi-margin-bottom-xsmall"
      >
        <Avatar
          alt={props.instructor?.name}
          src={props.instructor?.avatar || defaultAvatar}
          className="profile-avatar"
        />
      </Grid>
      <Grid item={true} xs={8}>
        <span className="nabi-display-block nabi-text-mediumbold">
          {props.instructor?.name}
        </span>
        <Star color="secondary" className="profile-star" />
        <span className="nabi-margin-left-xsmall nabi-margin-right-xsmall nabi-color-orange">
          {props.instructor?.reviews?.rating}
        </span>
        <span className="nabi-color-orange">
          ({props.instructor?.reviews?.quantity})
        </span>
        <CollapsibleBalloonList
          classForDiv="profile-instruments"
          classForSpan="profile-instrument"
          mainList={props.instructor?.instruments.slice(0, 5)}
          auxList={props.instructor?.instruments.slice(5)}
        />
      </Grid>
      <Grid container={true} className="stats-wrapper">
        <Grid item={true} xs={4}>
          <p className="stats-label nabi-text-mediumbold">Rate</p>
        </Grid>
        <Grid item={true} xs={4}>
          <p className="stats-label nabi-text-mediumbold">Timezone</p>
        </Grid>
        <Grid item={true} xs={4}>
          <p className="stats-label nabi-text-mediumbold">Verified</p>
        </Grid>
        <Grid item={true} xs={4}>
          <span className="nabi-color-nabi nabi-text-mediumbold">
            ${props.instructor?.rate || "N/A"}
          </span>
        </Grid>
        <Grid item={true} xs={4}>
          <span className="nabi-color-nabi nabi-text-mediumbold">
            {props.instructor?.timezone || "N/A"}
          </span>
        </Grid>
        <Grid item={true} xs={4}>
          <span className="nabi-color-nabi nabi-text-mediumbold">
            {props.instructor?.verified || "N/A"}
          </span>
        </Grid>
      </Grid>
      <span className="nabi-text-mediumbold nabi-margin-bottom-xsmall nabi-margin-top-xsmall">
        About me
      </span>
      {props.instructor?.bioDescription || "N/A"}
    </Grid>
  );
};

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    user,
    actions: {
      fetchUser: { isRequesting: isRequestingFetch },
      updateUser: { isRequesting: isRequestingUpdate, error: errorUpdate },
      uploadAvatar: { message: updateAvatarMessage },
    },
  } = state.user;

  return {
    user,
    isRequestingFetch,
    isRequestingUpdate,
    errorUpdate,
    updateAvatarMessage,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
