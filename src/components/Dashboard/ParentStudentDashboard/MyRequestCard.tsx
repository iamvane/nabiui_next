import * as React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';

import { instruments } from '../../../../assets/data/instruments';
import { Routes } from '../../common/constants/Routes';
import { PlaceForLessons } from '../../PlaceForLessons/constants';
import { ParentStudentDashboardComponent as constants } from '../constants';
import { MyRequestType } from '../models';

interface Props {
  request: MyRequestType;
}

const MyRequestCard: React.StatelessComponent<Props> = props => {
  const {
    id,
    instrument,
    placeForLessons,
    requestMessage,
    requestTitle,
    applications,
    lessonDuration,
    skillLevel,
    studentDetails,
    createdAt,
  } = props.request;

  const instrumentDisplay = instruments.find(t => t.value === instrument);

  const navigateToRequest = () => {
    if (applications < 1) {
      return;
    }
    Router.push(`${Routes.ApplicationList}/${id}`);
  }
  return (
    <div
      onClick={navigateToRequest}
      className={`${applications > 0 && 'nabi-cursor-pointer item-card'} nabi-section-widest nabi-padding-top-small nabi-padding-bottom-small nabi-background-white nabi-margin-bottom-small nabi-position-relative`}
    >
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} md={8}>
          <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-top-zero nabi-text-center nabi-margin-bottom-xsmall nabi-text-left-md">
            {requestTitle}
          </p>
          <Typography>
            {requestMessage}
          </Typography>
          <div className="nabi-margin-top-xsmall">
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {constants.requestCardLabels.instrument}
            </Typography>
            <Typography className="nabi-display-inline-block">{instrumentDisplay && instrumentDisplay.name}</Typography>
            <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {constants.requestCardLabels.skillLevel}
            </Typography>
            <Typography className="nabi-display-inline-block">{skillLevel}</Typography>
             <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {constants.requestCardLabels.placeForLessons}
            </Typography>
            <Typography className="nabi-display-inline-block">{PlaceForLessons[placeForLessons]}</Typography>
             <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {constants.requestCardLabels.lessonDuration}
            </Typography>
            <Typography className="nabi-display-inline-block">{lessonDuration}</Typography>
             <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {constants.requestCardLabels.students}
            </Typography>
            <Typography className="nabi-display-inline-block">
              {studentDetails && studentDetails.map((student) => <span>
                {`${student.name} ${student.age} ${studentDetails[studentDetails.length - 1] ? '' : ', '}`}</span>
              )}
            </Typography>
            <Typography className="nabi-margin-top-small">
              <Link href={Routes.BuildRequest + '/request'}><a className="nabi-text-decoration-underline">{constants.editRequestTextlink}</a></Link>
            </Typography>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={3} className="nabi-text-center nabi-text-left-md">
          <div className="nabi-margin-top-small-md">
            <Typography className="nabi-display-inline-block nabi-margin-top-small-md">
              {moment(createdAt).format("MMM Do YYYY")}
            </Typography>
            <br />
            <Button
              className="nabi-responsive-button"
              variant="contained"
              color="primary"
              disabled={applications < 1}
            >
              {constants.applicationButton.buttonText.replace(
                constants.applicationButton.textPlaceholder,
                String(applications)
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyRequestCard;
