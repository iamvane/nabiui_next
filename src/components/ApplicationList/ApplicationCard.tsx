import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
// import Star from '@material-ui/icons/Star';
import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});

import { Rates } from '../../redux/models/InstructorModel';
import { Routes } from '../common/constants/Routes';
import SectionTitle from '../common/SectionTitle';
import AvailabilityTab from '../Availability/AvailabilityTab';
import { InstructorCardComponent } from '../Instructors/constants';
import { BackgroundCheckStatus } from '../ProfileBuilder/constants';
import { ProfileHeaderComponent } from '../Profile/constants';
import { ApplicationCardComponent } from './constants';
import { Application } from './model';

interface Props {
  application: Application;
  isTrial: boolean;
}

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

const ApplicationCard: React.StatelessComponent<Props> = props => {
  const BackgroundCheckIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg';
  const AvatarStyles = { width: '120px', height: '120px'};
  const {
    instructorId,
    applicationMessage,
    applicationRate,
    applicationId,
    availability,
    age,
    avatar,
    displayName,
    reviews,
    yearsOfExperience,
    backgroundCheckStatus,
  } = props.application;

  // const navigateToProfile = () => {
  //   Router.push(`/profile/${id}`)
  // };
  return (
    <div className="nabi-section nabi-padding-top-medium nabi-padding-bottom-medium nabi-background-white nabi-margin-bottom-small nabi-position-relative item-card">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} md={3} className="nabi-text-center">
          <Avatar src={avatar} style={AvatarStyles} className="nabi-margin-center" />
          <Typography className="nabi-margin-top-xsmall nabi-text-semibold">
            {displayName}
          </Typography>
          <div className="nabi-color-nabi">
            {displayRatingStars(reviews)}
          </div>
          <Typography className="nabi-text-uppercase">
            {yearsOfExperience} {ProfileHeaderComponent.Text.YearExperiece} | {age} {ProfileHeaderComponent.Text.YearOld}
          </Typography>
          {
            backgroundCheckStatus === BackgroundCheckStatus.verified &&
            <Grid item={true} xs={12} className="nabi-margin-top-xsmall">
              <IconButton
                color="secondary"
                className="nabi-display-inline-block"
              >
                <img src={BackgroundCheckIcon} className="nabi-custom-button-icon" alt="background-check" />
              </IconButton>
              <Typography className="nabi-margin-left-xsmall nabi-display-inline-block">Background Check</Typography>
            </Grid>
          }
        </Grid>
        <Grid item={true} xs={12} md={6}>
          <SectionTitle text={ApplicationCardComponent.availabilitySection} />
          <AvailabilityTab availability={availability} />

          <SectionTitle text={ApplicationCardComponent.messageSection} />
          <Typography className="nabi-margin-top-xsmall">
            {applicationMessage}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} md={3} className="nabi-text-center">
          <Typography className="nabi-text-mediumbold">
            {ApplicationCardComponent.rate}
          </Typography>
          <Typography className="nabi-text-mediumbold">
            {reactStringReplace(
              InstructorCardComponent.Text.LessonRate,
              InstructorCardComponent.Text.LessonRatePlaceholder,
              (i: string) => <span key={i} className="nabi-font-large">${Number(applicationRate).toFixed(2)}</span>
            )}
          </Typography>
          <Link href={`${Routes.BookLessons}/${applicationId}`}
          >
            <a>
              <Button
                color="primary"
                className="nabi-responsive-button nabi-margin-top-xsmall"
                variant="contained"
              >
                {props.isTrial ? ApplicationCardComponent.scheduleTrial : ApplicationCardComponent.bookLessons}
              </Button>
            </a>
          </Link>
          <Link href={`/profile/${instructorId}`}>
            <a>
              <Button
                color="primary"
                className="nabi-responsive-button nabi-margin-top-xsmall"
              >
                {InstructorCardComponent.Text.ViewProfile}
              </Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default ApplicationCard;
