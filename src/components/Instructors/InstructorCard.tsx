import * as React from "react";
import moment from "moment";
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

import { Rates } from "../../redux/models/InstructorModel";
import PlaceForlessons from "../PlaceForLessons/PlaceForLessons";
import { BackgroundCheckStatus } from "../ProfileBuilder/constants";
import { ProfileHeaderComponent } from "../Profile/constants";
import { InstructorCardComponent } from "./constants";

interface Props {
  id: number;
  age: number;
  displayName: string;
  bioTitle: string;
  bioDescription: string;
  reviewsNumber: number;
  rateStartAt: Rates;
  instruments: string[];
  lessonsTaught: number;
  lastLogin: string;
  backgroundCheckStatus: string;
  distance: number;
  experience: number;
  favorite: boolean;
  memberSince: string;
  avatarImage: string;
  placeForLessons: {
    studio?: boolean;
    online?: boolean;
    home?: boolean;
  };
  fetchInstructor: (id: number) => void;
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

const selectStartingRate = (rates: Rates) => {
  const rateClasses = ["mins30", "mins45", "min60", "mins90"];
  let selectedRate = [] as number[];
  rateClasses.forEach(rate => {
    if (rates[rate]) {
      selectedRate.push(Number(rates[rate]));
    }
  });
  return selectedRate.length
    ? Math.min(...selectedRate)
        .toFixed(2)
        .toString()
    : "";
};

const InstructorCard: React.StatelessComponent<Props> = props => {
  const BackgroundCheckIcon =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg";
  const AvatarStyles = { width: "120px", height: "120px" };
  const {
    age,
    lastLogin,
    lessonsTaught,
    bioDescription,
    bioTitle,
    avatarImage,
    displayName,
    memberSince,
    backgroundCheckStatus,
    instruments,
    rateStartAt,
    id,
    experience,
    distance,
    placeForLessons
  } = props;
  let instrumentItem: string[] = [];
  instruments.map(instrument => {
    instrumentItem.push(
      (instrument as String).charAt(0).toUpperCase() + instrument.slice(1)
    );
    return instrumentItem;
  });
  const navigateToProfile = () => {
    Router.push(`/profile/${id}`);
  };
  return (
    <div onClick={navigateToProfile} className="nabi-section nabi-padding-top-small nabi-padding-bottom-small nabi-background-white nabi-margin-bottom-small nabi-position-relative nabi-cursor-pointer item-card">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} md={3} className="nabi-text-center">
          <Avatar
            src={avatarImage}
            style={AvatarStyles}
            className="nabi-margin-center"
          />
          <Typography className="nabi-margin-top-xsmall nabi-text-semibold">
            {displayName}
          </Typography>
          <div className="nabi-cursor-pointer nabi-color-nabi">
            {displayRatingStars(props.reviewsNumber)}
          </div>
          <Typography className="nabi-text-uppercase">
            {experience} {ProfileHeaderComponent.Text.YearExperiece} | {age}{" "}
            {ProfileHeaderComponent.Text.YearOld}
          </Typography>
          <Typography>
            {distance && String(distance.toFixed(1)) + " mi away"}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} md={6}>
          <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-top-zero nabi-text-center nabi-margin-bottom-xsmall nabi-text-left-md">
            {bioTitle}
          </p>
          <div>
            <Typography className="nabi-margin-top-xsmall">
              {bioDescription &&
                `${bioDescription.slice(
                  0,
                  InstructorCardComponent.maxBioDescriptionLength
                )}...`}
            </Typography>
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
              <Grid item={true} md={6}>
                <Typography>
                  <span className="nabi-text-semibold nabi-color-nabi">
                    {" "}
                    Teaches:{" "}
                  </span>
                  {instrumentItem.join(" ")}
                </Typography>
              </Grid>
              <Grid item={true} md={6}>
                <Typography color="primary" className="nabi-text-semibold">
                  Teaching locations:
                </Typography>
                <PlaceForlessons
                  online={placeForLessons.online}
                  studio={placeForLessons.studio}
                  home={placeForLessons.home}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={3} className="nabi-text-center">
          <Typography className="nabi-text-mediumbold">
            {InstructorCardComponent.Text.StartAt}
          </Typography>
          <Typography className="nabi-text-mediumbold">
            {reactStringReplace(
              InstructorCardComponent.Text.LessonRate,
              InstructorCardComponent.Text.LessonRatePlaceholder,
              (i: string) => (
                <span key={i} className="nabi-font-large">
                  ${selectStartingRate(rateStartAt)}
                </span>
              )
            )}
          </Typography>
          <Button
            color="primary"
            className="nabi-responsive-button nabi-margin-top-xsmall"
            variant="contained"
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
