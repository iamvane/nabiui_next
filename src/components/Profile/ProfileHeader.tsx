import * as React from 'react';

import {
  Avatar,
  Grid,
} from '@material-ui/core';
import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});
import '../../../assets/scss/ProfileHeader.scss';
import { InstructorProfileType } from "../../redux/models/InstructorModel";

interface Props {
  instructor: InstructorProfileType;
}

/**
 * Profile Header
 */
export const ProfileHeader = (props: Props) => {
  const defaultAvatar = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png';

  return (
    <Grid container={true} className="nabi-margin-top-xsmall">
      <Grid item={true} xs={4} className="nabi-text-center nabi-margin-bottom-xsmall">
        <Avatar alt={props.instructor?.name} src={(props.instructor as any)?.avatar  || defaultAvatar} className="profile-avatar"/>
      </Grid>
      <Grid item={true} xs={8}>
        <span className="nabi-display-block nabi-text-mediumbold">{props.instructor?.name}</span>
        <Star color="secondary" className="profile-star"/>
          <span className="nabi-margin-left-xsmall nabi-margin-right-xsmall nabi-color-orange">
            {props.instructor?.reviews?.rating}
          </span>
          <span className="nabi-color-orange">
            ({props.instructor?.reviews?.quantity})
            </span>
        <div className="profile-instruments">
          {props.instructor?.instruments?.map((instrument, i) =>
            <span key={i} className="profile-instrument">{instrument.charAt(0).toUpperCase() + instrument.slice(1)}</span>
          )}
        </div>
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
          <span className="nabi-color-nabi nabi-text-mediumbold">${props.instructor?.rate}</span>
        </Grid>
        <Grid item={true} xs={4}>
          <span className="nabi-color-nabi nabi-text-mediumbold">{props.instructor?.timezone}</span>
        </Grid>
        <Grid item={true} xs={4}>
          <span className="nabi-color-nabi nabi-text-mediumbold">Yes</span>
        </Grid>
      </Grid>
      <span className="nabi-text-mediumbold nabi-margin-bottom-xsmall nabi-margin-top-xsmall">About me</span>
      {props.instructor?.bioDescription}
    </Grid>
  );
};

export default ProfileHeader;
