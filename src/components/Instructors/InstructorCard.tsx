import * as React from 'react';
import moment from 'moment';
const reactStringReplace = require('react-string-replace');
import Link from 'next/link';

import {
  Avatar,
  Button,
  Grid,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';

import { Rates } from '../../redux/models/InstructorModel';
// import { InstrumentsType } from 'components/Instruments/model';
import { InstructorCardComponent } from './constants';
// import { Routes } from 'components/common/constants/Routes';

interface Props {
  id: number;
  age: number;
  address: string;
  displayName: string;
  bioTitle: string;
  bioDescription: string;
  reviewsNumber: number;
  rateStartAt: Rates;
  instruments: string[];
  lessonsTaught: number;
  lastLogin: string;
  backgroundCheck: boolean;
  favorite: boolean;
  memberSince: string;
  avatarImage: string;
  fetchInstructor: (id: number) => void;
}

const displayRatingStars = (reviewsNumber: number) => {
  let ratingStars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++ ) {
    if (i < reviewsNumber) {
      ratingStars.push(<Icon key={i}>star</Icon>);
    } else {
      ratingStars.push(<Icon color="disabled" key={i}>star</Icon>);
    }
  }
  return ratingStars;
};

const selectStartingRate = (rates: Rates) => {
  const rateClasses = ['mins30', 'mins45', 'min60', 'mins90'];
  let selectedRate = [] as number[];
  rateClasses.forEach((rate) => {
    if (rates[rate]) {
      selectedRate.push(Number(rates[rate]));
    }
  });
  return selectedRate.length ? Math.min(...selectedRate).toFixed(2).toString() : '';
};

const InstructorCard: React.StatelessComponent<Props> = props => {
  const BackgroundCheckIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg';
  const AvatarStyles = { width: '100px', height: '100px'};
  const {
    age,
    lastLogin,
    lessonsTaught,
    bioDescription,
    bioTitle,
    address,
    avatarImage,
    displayName,
    memberSince,
    backgroundCheck,
    // favorite,
    instruments,
    rateStartAt,
    fetchInstructor,
    id
  } = props;
  let instrumentItem: string[] = [];
  instruments.map(instrument => {
    instrumentItem.push((instrument as String).charAt(0).toUpperCase() + instrument.slice(1));
    return instrumentItem;
  });
  return (
    <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small nabi-position-relative">
      {/* <div style={{right: '20px'}} className="nabi-float-right nabi-position-absolute">
        <IconButton color={favorite ? 'primary' : 'secondary'}>
          <Icon>favorite</Icon>
        </IconButton>
      </div> */}
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={12} md={3} className="nabi-text-center">
          <Avatar src={avatarImage} style={AvatarStyles} className="nabi-margin-center" />
          <Typography className="nabi-margin-top-xsmall">
            {InstructorCardComponent.Text.Age} {age}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} md={5} className="nabi-text-center nabi-text-left-md">
          <Typography className="nabi-margin-top-xsmall nabi-text-mediumbold">
            {displayName}
          </Typography>
          <Typography className="nabi-margin-top-xsmall">
            {bioTitle}
          </Typography>
          <div className="nabi-cursor-pointer nabi-color-nabi">
            {displayRatingStars(props.reviewsNumber)}
          </div>
          <div>
            <Typography className="nabi-display-inline-block">
              {address}
            </Typography>
            <IconButton
              color={backgroundCheck ? 'primary' : 'secondary'}
              className="nabi-margin-left-xsmall nabi-display-inline-block"
            >
              <img src={BackgroundCheckIcon} className="nabi-custom-button-icon" alt="background-check" />
            </IconButton>
            <Typography className="nabi-margin-top-xsmall">
              {
                bioDescription ?
                bioDescription.slice(0, InstructorCardComponent.maxBioDescriptionLength) :
                null
              }
                <Link href={`/profile/${props.id}`}>
                  <a className="nabi-color-nabi nabi-cursor-pointer nabi-margin-left-xsmall">
                    {
                      !bioDescription ?
                      null :
                      bioDescription.length > InstructorCardComponent.maxBioDescriptionLength
                      ? InstructorCardComponent.Text.ViewMore
                    :
                      InstructorCardComponent.Text.ViewMore.slice(3)}
                  </a>
                </Link>
            </Typography>
            <Typography color="primary" className="nabi-margin-top-xsmall nabi-color-nabi">
              {instrumentItem.join(' ')}
            </Typography>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={4} className="nabi-text-center nabi-margin-top-small">
          <Typography className="nabi-text-mediumbold">
            {InstructorCardComponent.Text.StartAt}
          </Typography>
          <Typography className="nabi-text-mediumbold">
            {reactStringReplace(
              InstructorCardComponent.Text.LessonRate,
              InstructorCardComponent.Text.LessonRatePlaceholder,
              (i: string) => <span key={i} className="nabi-font-large">${selectStartingRate(rateStartAt)}</span>
            )}
          </Typography>
          <Button
            color="primary"
            className="nabi-responsive-button nabi-margin-top-xsmall"
            variant="contained"
            onClick={() => {
              fetchInstructor(id);
            }}
          >
            {InstructorCardComponent.Text.ViewProfile}
          </Button>
          <div className="nabi-margin-top-small">
            <Typography className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block">
              {InstructorCardComponent.Text.LessonsTaught}
            </Typography>
            <Typography className="nabi-display-inline-block">
              {lessonsTaught}
            </Typography>
            <br />
            <Typography className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block">
              {InstructorCardComponent.Text.LastLogin}
            </Typography>
            <Typography className="nabi-display-inline-block">
              {moment(lastLogin).fromNow()}
            </Typography>
            <br />
            <Typography className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block">
              {InstructorCardComponent.Text.MemberSince}
            </Typography>
            <Typography className="nabi-display-inline-block">
              {memberSince}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InstructorCard;
