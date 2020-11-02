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

interface ReviewsType {
  rating: string;
  quantity: number;
  items: {
    date: string,
    rating: number,
    comment: string;
    user: string;
  }[]
}

interface Props {
  reviews: ReviewsType;
}

/**
 * Profile Reviews Section
 */
export const Reviews = (props: Props) => {
  const defaultAvatar = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png';

  const displayRatingStars = (reviewsNumber: number) => {
    let ratingStars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < reviewsNumber) {
        ratingStars.push(<Star key={i} color="secondary" className="nabi-font-size-default" />);
      } else {
        ratingStars.push(<Star key={i} className="nabi-color-disabled nabi-font-size-default" />);
      }
    }
    return ratingStars;
  };

  return (
    <Grid container={true}>
      <span className="nabi-text-mediumbold nabi-margin-bottom-xsmall nabi-margin-top-small">Reviews</span>
      <div className="nabi-section nabi-background-white">
        {props.reviews?.items.map((review, index) =>
          <Grid container={true} key={index}>
            <Grid item={true} xs={6} className="">
              <span className="nabi-text-mediumbold">{review.user}</span>
            </Grid>
            <Grid item={true} xs={6} className="nabi-text-right">
              <span>{review.date}</span>
            </Grid>
            <Grid item={true} xs={12} className="">
              <span>{displayRatingStars(review.rating)}</span>
            </Grid>
            <Grid item={true} xs={12} className="">
              <span>{review.comment}</span>
            </Grid>
            {props.reviews.items.length - 1 !== index && <hr className="nabi-margin-top-small nabi-margin-bottom-small"/>}
          </Grid>
        )}
      </div>
    </Grid>
  );
};

export default Reviews;
