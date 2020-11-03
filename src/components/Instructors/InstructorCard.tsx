import * as React from "react";
import Router from "next/router";

import {
  Avatar,
  Grid,
  Typography
} from "@material-ui/core";
import Star from "@material-ui/icons/Star";

import { InstructorListType } from "../../redux/models/InstructorModel";
import '../../../assets/scss/InstructorCard.scss';

interface Props {
  instructor: InstructorListType;
}

const InstructorCard = (props: Props) => {
  const AvatarStyles = { width: "69px", height: "69px" };

  const navigateToProfile = () => {
    Router.push(`/profile/${props.instructor?.id}`);
  };

  const displayInstruments = () => {
    let instruments = [];
    props.instructor?.instruments.map(instrument => {
      instruments.push(instrument.charAt(0).toUpperCase() + instrument.slice(1))
    }) 
    return instruments.join(', ')
  }

  return (
    <div onClick={navigateToProfile} className="nabi-section nabi-padding-top-small nabi-padding-bottom-small nabi-background-white nabi-margin-bottom-small nabi-position-relative nabi-cursor-pointer item-card">
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4} className="nabi-text-center">
          <Avatar
            src={props.instructor?.avatar}
            style={AvatarStyles}
            className="nabi-margin-center"
          />
          <Star color="secondary" className="profile-star"/>
          <span className="nabi-margin-left-xsmall nabi-margin-right-xsmall nabi-color-orange">
            {props.instructor?.reviews?.rating || 0.0}
          </span>
          <span className="nabi-color-orange">
            ({props.instructor?.reviews?.quantity || 0})
          </span>
        </Grid>
        <Grid item={true} xs={8} className="">
          <p color="primary" className="nabi-text-semibold nabi-color-nabi nabi-margin-top-zero">
            {props.instructor?.name}
          </p>
          <p className=" nabi-margin-right-xsmall ">
            ${props.instructor?.rate}/ half hour
          </p>
          <p className="nabi-display-block">{props.instructor?.timezone}</p>
          <div>
            {displayInstruments()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InstructorCard;
