import * as React from 'react';

import {
  Avatar,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});
import '../../../assets/scss/ProfileHeader.scss';
import { BackgroundCheckStatus } from '../ProfileBuilder/constants';
import { ProfileHeaderComponent } from './constants';
import VideoProfile from '../VideoProfile/VideoProfile';

interface Props {
  instructor: any;
}

/**
 * Profile Header
 */
export const ProfileHeader = (props: Props) => {
  const [viewMore, setViewMore] = React.useState(false);
  const [displayVideo, setDisplayVideo] =  React.useState(false);

  const toggleViewMore = () => {
    setViewMore(prevOpen => !prevOpen);
  };

  const defaultAvatar = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png';
  const BackgroundCheckIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg';
  const playVideo = 'https://nabimusic.s3.us-east-2.amazonaws.com/play-video_1.png';

  const {
    bioTitle,
    avatar,
    displayName,
    reviews,
    yearsOfExperience,
    age,
    rates,
    memberSince,
    backgroundCheckStatus,
    lessonsTaught,
    instruments,
    video
  } = props.instructor;

  const displayRatingStars = (reviewsNumber: number) => {
    let ratingStars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++ ) {
      if (i < reviewsNumber) {
        ratingStars.push(<Star key={i} />);
      } else {
        ratingStars.push(<Star color="disabled" key={i} />);
      }
    }
    return ratingStars;
  };

  let instrumentItems = instruments && instruments.map((instrument: any) => {
    let instrumentItem = [];
    // tslint:disable-next-line:max-line-length
    instrumentItem.push(instrument.name.charAt(0).toUpperCase() + instrument.name.slice(1) + ' (' + instrument.skillLevel + ')');
    return (
      instrumentItem
    );
  });

  const formattedRates = {
    mins30: parseFloat(rates && rates.mins30.toString()).toFixed(2),
    mins45: parseFloat(rates && rates.mins45.toString()).toFixed(2),
    mins60: parseFloat(rates && rates.mins60.toString()).toFixed(2),
    mins90: parseFloat(rates && rates.mins90.toString()).toFixed(2),
  };

  const getRenderedItems = () => {
    if (viewMore) {
      return instrumentItems;
    }
    return instrumentItems && instrumentItems.slice(0, 2);
  };


  return (
    <Grid container={true}>
      <Grid item={true} md={3} xs={12} className="nabi-text-center nabi-margin-bottom-xsmall">
        <div className="hide-on-desktop nabi-margin-bottom-xsmall">
          <div className="nabi-display-inline-block">
            {/*tslint:disable-next-line:max-line-length*/}
            <h1 className="nabi-text-normalbold nabi-color-nabi nabi-margin-remove nabi-jennasue-title">
              {bioTitle}
            </h1>
          </div>
        </div>
        <div>
          <div className="nabi-display-inline-block">
            <div className="play-video-wrapper">
              <Avatar alt={displayName} src={avatar ? avatar : defaultAvatar} className="profile-avatar"/>
              {video && <img src={playVideo} className="play-video-icon" onClick={() => setDisplayVideo(true)} />}
            </div>
            {/*tslint:disable-next-line:max-line-length*/}
            {/* <AvatarUploader originalImage={avatarImage} imageChanged={(avatarImg: string) => { props.changeAvatar(avatarImg); }} /> */}
          </div>
        </div>
        <div className="nabi-margin-top-xsmall">
          <Typography
            className={`nabi-text-center nabi-text-mediumbold nabi-margin-bottom-xsmall
            nabi-display-inline-block`}
          >
            {displayName}
          </Typography>
        </div>
        <div className="nabi-cursor-pointer nabi-color-nabi">
          {displayRatingStars(reviews)}
          <span className="nabi-color-nabi">{reviews}</span>
        </div>
        <Typography className="nabi-text-uppercase">
          {yearsOfExperience} {ProfileHeaderComponent.Text.YearExperiece} | {age} {ProfileHeaderComponent.Text.YearOld}
        </Typography>
      </Grid>
      <Grid item={true} md={7} xs={12} className="nabi-text-center nabi-text-left-md nabi-padding-left-large-md">
        <Grid container={true}>
          <Grid container={true} item={true} xs={10}>
            <div className="hide-on-mobile">
              <div>
                <div className="nabi-display-inline-block">
                  {/*tslint:disable-next-line:max-line-length*/}
                  <h1 className="nabi-text-normalbold nabi-color-nabi nabi-margin-remove nabi-jennasue-title">
                    {bioTitle}
                  </h1>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item={true}
            md={5}
            xs={12}
            className="nabi-text-left-md nabi-margin-bottom-xsmall nabi-margin-top-xsmall"
          >
            <div>
              <Typography
                className="nabi-text-mediumbold nabi-text-uppercase nabi-color-nabi"
              >
                {ProfileHeaderComponent.Text.LessonsRates}
              </Typography>
              <Typography className="nabi-display-inline-block">
                <mark>
                  {ProfileHeaderComponent.rates.ThirtyMinsRate}
                  <span className="nabi-margin-left-xsmall">${formattedRates.mins30}</span><br/>
                  {ProfileHeaderComponent.rates.FortyFiveMinsRate}
                  <span className="nabi-margin-left-xsmall">${formattedRates.mins45}</span><br/>
                  {ProfileHeaderComponent.rates.SixtyMinsRate}
                  <span className="nabi-margin-left-xsmall">${formattedRates.mins60}</span><br/>
                  {ProfileHeaderComponent.rates.NinetyMinsRate}
                  <span className="nabi-margin-left-xsmall">${formattedRates.mins90}</span><br/>
                </mark>
              </Typography>
            </div>
          </Grid>
          <Grid
            item={true}
            xs={9}
            md={6}
            className="nabi-margin-center nabi-margin-bottom-small nabi-margin-top-xsmall"
          >
            <div>
              <Typography className="nabi-display-inline-block">
                <span className="nabi-color-nabi nabi-text-mediumbold">{ProfileHeaderComponent.Text.Teaches} </span>
                {getRenderedItems() && getRenderedItems().join(', ')}
                {instrumentItems && instrumentItems.length > 2 &&
                  <span
                    className="nabi-color-nabi nabi-cursor-pointer nabi-margin-left-xsmall"
                    onClick={toggleViewMore}
                  >
                    {viewMore ?
                      ProfileHeaderComponent.Text.ViewLess :
                      ProfileHeaderComponent.Text.ViewMore}
                  </span>
                }
              </Typography>
            </div>
            <ul className="nabi-padding-left-small">
              <li className="nabi-list nabi-list-style-position-inside">
                <Typography className="nabi-color-default nabi-display-inline">
                  {ProfileHeaderComponent.Text.MemberSince} {memberSince}
                </Typography>
              </li>
              <li className="nabi-list nabi-list-style-position-inside">
                <Typography className="nabi-color-default nabi-display-inline">
                  {lessonsTaught} {ProfileHeaderComponent.Text.LessonsTaught}
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
      {/* Start of background check & favorites*/}
      {backgroundCheckStatus === BackgroundCheckStatus.verified &&
        <Grid
          item={true}
          md={2}
          xs={12}
          className="nabi-text-center nabi-padding-left-large-md nabi-margin-center"
        >
          <IconButton
            color="secondary"
            className="nabi-display-inline-block"
          >
            <img src={BackgroundCheckIcon} className="nabi-custom-button-icon" alt="background-check" />
          </IconButton>
          <Typography className="nabi-margin-left-xsmall nabi-display-inline-block">Background Check</Typography>
        </Grid>
      }
      {video &&
        <VideoProfile
          isDialogOpen={displayVideo}
          closeHandler={() => setDisplayVideo(false)}
          video={video}
        />
      }
    </Grid>
  );
};

export default ProfileHeader;
