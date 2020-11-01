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
 * Profile Experience Section
 */
export const Experience = (props: Props) => {
  const defaultAvatar = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png';

  return (
    <div>
       <span className="nabi-text-mediumbold nabi-margin-bottom-xsmall nabi-margin-top-small nabi-display-block">Experience</span>
       <div className="nabi-section nabi-background-white">
        <Grid container={true} className="stats-wrapper">
          <Grid item={true} xs={6}>
            <p className="stats-label nabi-text-mediumbold">Students tutored</p>
          </Grid>
          <Grid item={true} xs={6}>
            <p className="stats-label nabi-text-mediumbold">Years of experience</p>
          </Grid>
          <Grid item={true} xs={6}>
            <span className="nabi-color-nabi nabi-text-mediumbold">{props.instructor?.tutoredStudents || 'N/A'}</span>
          </Grid>
          <Grid item={true} xs={6}>
            <span className="nabi-color-nabi nabi-text-mediumbold">{props.instructor?.yearsOfExperience || 'N/A'}</span>
          </Grid>
          <Grid item={true} xs={6}>
            <p className="stats-label nabi-text-mediumbold">Languages</p>
          </Grid>
          <Grid item={true} xs={6}>
            <p className="stats-label nabi-text-mediumbold">Levels taught</p>
          </Grid>
          <Grid item={true} xs={6}>
            {props.instructor?.languages.map((language, index) => 
            <span key={index} className="nabi-color-nabi nabi-text-mediumbold">{language.charAt(0).toUpperCase() + language.slice(1)}
            </span>)}
          </Grid>
          <Grid item={true} xs={6}>
            {props.instructor?.levelsTaught.map((level, index) => 
            <span key={index} className="nabi-color-nabi nabi-text-mediumbold">
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>)}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Experience;
