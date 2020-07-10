import * as React from "react";
const reactStringReplace = require("react-string-replace");
import Router from "next/router";

import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import Star from "@material-ui/icons/Star";

import { BackgroundCheckStatus } from "../ProfileBuilder/constants";
import { ProfileHeaderComponent } from "../Profile/constants";
import { InstructorCardComponent } from "../Instructors/constants";
import { InstructorCardType } from './models';

interface Props extends
  InstructorCardType {
    bestMatch,
    show,
    handleContinue: (id: number) => void;
  }

const displayRatingStars = (reviewsNumber: number) => {
  let ratingStars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < reviewsNumber) {
      ratingStars.push(<Star key={i} />);
    } else {
      ratingStars.push(<Star color="disabled" key={i} />);
    }
  }
  return ratingStars;
};

const InstructorCard: React.StatelessComponent<Props> = props => {
  const BackgroundCheckIcon =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg";
  const AvatarStyles = { width: "120px", height: "120px" };
  const {
    age,
    bioTitle,
    avatar,
    displayName,
    backgroundCheckStatus,
    rate,
    id,
    experience,
    reviews,
    bestMatch,
    show,
    handleContinue
  } = props;

  return (
    <Grid container={true} spacing={3} className="nabi-text-center">
      <Grid
        item={true}
        xs={12}
        md={6}
        className={`nabi-padding-top-medium nabi-padding-bottom-medium nabi-background-white nabi-margin-center nabi-section nabi-margin-bottom-large ${show ? 'nabi-display-block' : 'nabi-display-none'}`}>
        {bestMatch &&
          <p className="nabi-jennasue-title nabi-color-orange nabi-margin-top-zero nabi-margin-bottom-xsmall">
            Best Match
          </p>}
        <Grid item={true} xs={12}>
          <Avatar
            src={avatar}
            style={AvatarStyles}
            className="nabi-margin-center"
          />
          <Typography className="nabi-margin-top-xsmall nabi-text-semibold">
            {displayName}
          </Typography>
          <div className="nabi-cursor-pointer nabi-color-nabi">
            {displayRatingStars(reviews)}
          </div>
          <Typography className="nabi-text-uppercase">
            {experience} {ProfileHeaderComponent.Text.YearExperiece} | {age}{" "}
            {ProfileHeaderComponent.Text.YearOld}
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-top-zero nabi-margin-bottom-xsmall">
            {bioTitle}
          </p>
          <div>
            <Grid container={true} spacing={1}>
              {backgroundCheckStatus === BackgroundCheckStatus.verified && (
                <Grid item={true} xs={12} className="nabi-margin-top-xsmall">
                  <IconButton
                    color="secondary"
                    className="nabi-display-inline-block"
                  >
                    <img
                      src={BackgroundCheckIcon}
                      className="nabi-custom-button-icon"
                      alt="background-check"
                    />
                  </IconButton>
                  <Typography className="nabi-margin-left-xsmall nabi-display-inline-block">
                    Background Check
                  </Typography>
                </Grid>
              )}

            </Grid>
          </div>
        </Grid>
        <Grid item={true} xs={12}>
          <Typography className="nabi-text-mediumbold nabi-margin-top-xsmall">
            {InstructorCardComponent.Text.StartAt}
          </Typography>
          <Typography className="nabi-text-mediumbold nabi-font-large">
            <span className="nabi-font-large">
              {InstructorCardComponent.Text.LessonRate.replace(
                InstructorCardComponent.Text.LessonRatePlaceholder,
                String(rate)
              )}
            </span>
          </Typography>
          <Button
            color="primary"
            className="nabi-responsive-button nabi-margin-top-xsmall"
            variant="contained"
            onClick={() => handleContinue(id)}
          >
            Continue with {displayName}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InstructorCard;
