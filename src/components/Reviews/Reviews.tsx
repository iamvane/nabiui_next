import * as React from 'react';
import moment from 'moment';

import {
  Avatar,
  Grid,
  Typography
} from '@material-ui/core';
import Star from '@material-ui/icons/Star';

import { ReviewsType } from './model';

interface Props extends ReviewsType {}

const getRatingStars = (ratingNumber: number ) => {
  let ratingStars: JSX.Element[] = [];
  let roundedNumber = Math.round(ratingNumber);
  for (let i = 0; i < roundedNumber; i++ ) {
    ratingStars.push(<Star color="primary" key={i} />);
  }
  return ratingStars;
};

const getReviewDate = (date: string): string => {
  const reviewDate = new Date(date);
  const today = new Date();

  const end = moment(today);
  return end.to(reviewDate);
};

/**
 * Reviews component
 */
const Reviews: React.StatelessComponent<Props> = props => {
  const AvatarStyles = { width: '60px', height: '60px'};
  const { avatarImage, name, comment } = props;

  const ratingStars = getRatingStars(props.rating);
  const date = getReviewDate(props.date);

  return (
    <div className="nabi-margin-top-xsmall">
      <Grid container={true}>
        <Grid item={true} xs={12} md={2} className="nabi-text-center">
          <Avatar
            src={avatarImage}
            style={AvatarStyles}
            className="nabi-margin-center"
          />
        </Grid>
        <Grid item={true} xs={12} md={10}>
          <div className="nabi-text-center nabi-text-left-md">
            <Typography className="nabi-text-mediumbold nabi-display-inline-block-md nabi-margin-right-xsmall-md">
              {name}
            </Typography>
            <div className="nabi-display-inline-block-md nabi-position-relative reviews-stars-wrapper">
              {ratingStars}
            </div>
          </div>
          <Typography className="nabi-margin-top-xsmall">
            {comment}
          </Typography>
          <Typography className="nabi-margin-top-xsmall nabi-margin-bottom-xsmall">
            {date}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reviews;
