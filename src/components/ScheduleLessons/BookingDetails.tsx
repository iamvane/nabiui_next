import * as React from 'react';
import moment from 'moment';
import Router, { useRouter } from "next/router";
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimezoneIcon from '@material-ui/icons/PublicOutlined';
import Schedule from '@material-ui/icons/Schedule';
import Face from '@material-ui/icons/Face';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import { Header } from '../Header/Header';
import { Footer } from "../common/Footer";
import { instruments } from '../../../assets/data/instruments';
import { getCookie } from "../../utils/cookies";
import PageTitle from '../common/PageTitle';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';

import { BookingDetailsComponent } from './constants';

interface Props {
  headingMessage?: string;
  handleContinue?: () => void;
}

export const BookingDetails = (props: Props) => {
  const router = useRouter();
  const instructorName = router.query.instructorName;

  const addAnotherChild = () => {
    return Router.push(Routes.BookTrial + Routes.LessonDetails);
  }

  const role = getCookie('role');
  const lessonDate = moment(getCookie('lessonDate')).format('MMM D');
  const lessonTime = moment(getCookie('lessonTime'), "h:mm").format("h:mmA");
  const timezone = getCookie('timezone');
  const instrumentDisplay = instruments.find(t => t.value === getCookie('instrumentName'));

  const handleNext = () => {
    if (props.handleContinue) {
      return props.handleContinue();
    }
    return Router.push(Routes.ParentStudio);
  }

  const displayAvailability = () => {
    const availability = getCookie('availability');
    // console.log("******************AVAILABILITY*********************")
    // console.log(Object.values(availability));
    const modifiedAvailability = [];
    if (availability?.length) {
      JSON.parse(availability).forEach(item =>
        modifiedAvailability.push(`${BookingDetailsComponent.weekdaysLabels[item.day]} ${BookingDetailsComponent.timeframeLabels[item.timeframe]}`)
      );
      return modifiedAvailability.join(', ').replace(/, ([^,]*)$/, ' and $1');
    }
    return '';
  }

  return (
    <div>
      <Header />
      <div className="nabi-container nabi-margin-bottom-medium">
        <PageTitle pageTitle={BookingDetailsComponent.pageTitle} />
        <Grid
          item={true}
          xs={12}
          md={8} className="nabi-section nabi-background-white nabi-margin-center"
        >
          <p className="nabi-color-nabi nabi-text-center nabi-jennasue-title nabi-margin-bottom-small nabi-margin-top-xsmall">
            {props.headingMessage ? props.headingMessage : role === Role.parent ?
              BookingDetailsComponent.parentMessage.replace(
                BookingDetailsComponent.studentNamePlaceholder,
                getCookie('studentName')
              ) :
              BookingDetailsComponent.studentMessage
            }
          </p>
          <div className="nabi-display-flex nabi-flex-align-center nabi-margin-top-xsmall">
            <DateRangeIcon color="primary" />
            <Typography className="nabi-display-inline nabi-margin-left-xsmall">
              <span className="nabi-margin-right-xsmall nabi-text-semibold">{BookingDetailsComponent.availability}</span>{props.headingMessage ? displayAvailability() : `${lessonDate} @ ${lessonTime}`}
            </Typography>
          </div>
          {timezone && (
            <div className="nabi-display-flex nabi-flex-align-center nabi-margin-top-xsmall">
              <TimezoneIcon color="primary" />
              <Typography className="nabi-margin-left-xsmall">
              <span className="nabi-margin-right-xsmall nabi-text-semibold">{BookingDetailsComponent.timezone}</span>
                {timezone}
              </Typography>
            </div>
          )}
          <div className="nabi-display-flex nabi-flex-align-center nabi-margin-top-xsmall">
            <Schedule color="primary" />
            <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            <span className="nabi-margin-right-xsmall nabi-text-semibold">{BookingDetailsComponent.duration}</span>
              {BookingDetailsComponent.lessonDuration}
            </Typography>
          </div>
          <div className="nabi-display-flex nabi-flex-align-center nabi-margin-top-xsmall">
            {instrumentDisplay?.name ? (
              <>
                <MusicNoteIcon color="primary" />
                <Typography className="nabi-display-inline nabi-margin-left-xsmall">
                <span className="nabi-margin-right-xsmall nabi-text-semibold">{BookingDetailsComponent.instrument}</span>
                  {instrumentDisplay?.name}
                </Typography>
              </>
            ) : null}
          </div>
          {props.headingMessage ?
            <div key="instructor-details" className="nabi-display-flex nabi-flex-align-center nabi-margin-top-xsmall">
              <Face color="primary" />
              <Typography className="nabi-display-inline nabi-margin-left-xsmall">
              <span className="nabi-margin-right-xsmall nabi-text-semibold">{BookingDetailsComponent.instructor}</span>
                {instructorName || BookingDetailsComponent.instructorDetails}
              </Typography>
            </div> : null
          }
          <div className="nabi-display-flex nabi-flex-justify-end nabi-margin-top-small">
            {props.headingMessage && role === Role.parent ?
              <Button color="primary" className="nabi-margin-left-xsmall" onClick={addAnotherChild}>
                {BookingDetailsComponent.addChildButton}
              </Button>
              : null}
            <Button color="primary" variant="contained" onClick={() => handleNext()}>
              {BookingDetailsComponent.continueButton}
            </Button>
          </div>
        </Grid>
      </div>
      <Footer />
    </div>
  )
}

export default BookingDetails;
