import * as React from 'react';
import moment from 'moment';
import Router from "next/router";
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Schedule from '@material-ui/icons/Schedule';
import Face from '@material-ui/icons/Face';

import { getCookie } from "../../utils/cookies";
import PageTitle from '../common/PageTitle';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';

import { BookingDetailsComponent } from './constants';

interface Props {
  headingMessage?: string;
  handleContinue: () => void;
}

export const BookingDetails = (props: Props) => {
  const addAnotherChild = () => {
    return Router.push(Routes.ScheduleTrial + Routes.LessonDetails);
  }

  const lessonDate = moment(getCookie('lessonDate')).format('MMM D');
  const lessonTime = moment(getCookie('lessonTime'), "h:mm").format("h:mA");

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle pageTitle={BookingDetailsComponent.pageTitle} />
      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-section nabi-background-white nabi-margin-center"
      >
        <p className="nabi-color-nabi nabi-text-center nabi-jennasue-title nabi-margin-bottom-small nabi-margin-top-xsmall">
          {props.headingMessage ? props.headingMessage : getCookie('role') === Role.parent ?
            BookingDetailsComponent.parentMessage.replace(
              BookingDetailsComponent.studentNamePlaceholder,
              getCookie('studentName')
            ) :
            BookingDetailsComponent.studentMessage
          }
        </p>
        <div>
          <DateRangeIcon className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-text-mediumbold nabi-margin-left-xsmall">
            {lessonDate} @ {lessonTime}
          </Typography>
        </div>
        <div>
          <Schedule className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-text-mediumbold nabi-margin-left-xsmall">
            {BookingDetailsComponent.lessonDuration}
          </Typography>
        </div>
        <div>
          <Face className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-text-mediumbold nabi-margin-left-xsmall">
            {BookingDetailsComponent.instructorDetails}
          </Typography>
        </div>
        <div className="nabi-text-right nabi-margin-top-large">
          {props.headingMessage &&
            <Button color="primary" className="nabi-margin-right-xsmall" onClick={addAnotherChild}>
              {BookingDetailsComponent.addChildButton}
            </Button>
          }
          <Button color="primary" variant="contained" onClick={props.handleContinue}>
            {BookingDetailsComponent.continueButton}
          </Button>
        </div>
      </Grid>
    </div>
  )
}

export default BookingDetails;
