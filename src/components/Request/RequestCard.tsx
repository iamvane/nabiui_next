import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  Button,
  Grid,
  Icon,
  IconButton,
  Typography
} from '@material-ui/core';

import { instruments } from '../../../assets/data/instruments';
import { CommonConstants } from '../common/constants/common';
import { Routes } from '../common/constants/Routes';
import { Role } from '../Auth/Registration/constants';
import { PlaceForLessons } from '../PlaceForLessons/constants';
import { SkillLevel } from '../Instruments/constants';
import { RequestCardComponent } from './constants';

interface Props {
  // TODO: change to Re1uestType when doing API integration
  request: any;
}

const RequestCard: React.StatelessComponent<Props> = props => {
  const {
    id,
    instrument,
    placeForLessons,
    lessonDuration,
    title,
    message,
    applications,
    students,
    createdAt,
    user,
    applied
  } = props.request;

  const capitalRequestTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const studentDetails =
    `${students[0].age} ${RequestCardComponent.Text.YrsOld} (${SkillLevel[students[0].skillLevel]})`;
  const studentsDetails = students.map((student: any, i: any) => (
    <li key={i} className="nabi-list nabi-margin-top-xsmall">
      <Typography className="nabi-color-default">
        {`${student.name}, ${student.age} ${RequestCardComponent.Text.YrsOld} (${SkillLevel[student.skillLevel]})`}
      </Typography>
    </li>
  ));
  const instrumentDisplay = instruments.find(t => t.value === instrument);

  return (
    <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small nabi-position-relative">
      <div
        style={{right: '20px'}}
        className={`nabi-float-right ${!applied && 'nabi-position-absolute'} nabi-position-absolute-md`}
      >
        {!applied && <IconButton color="primary">
          <Icon>favorite</Icon>
        </IconButton>}
        {applied &&
          <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
            <Icon className="nabi-vertical-bottom">check</Icon> Applied
          </Typography>}
      </div>
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={12} md={8} className="nabi-text-center nabi-text-left-md">
          <Grid item={true} xs={8} md={12} className="nabi-margin-center">
            <Link
              className="nabi-cursor-pointer"
              to={`${Routes.Request}/${id}`}
            >
              <Typography color="primary" className="nabi-margin-top-xsmall nabi-text-mediumbold">
                {`${user.displayName} ${user.role === Role.parent ? '(parent)' : ''}`}
              </Typography>
            </Link>
            <Typography>
              {user.distance}
            </Typography>
            <Typography className="nabi-margin-top-small nabi-text-mediumbold">
              {capitalRequestTitle}
            </Typography>
          </Grid>
          <Typography>
            {message}
            <Link
              className="nabi-color-nabi nabi-cursor-pointer nabi-margin-left-xsmall"
              to={`${Routes.Request}/${id}`}
            >
              {message.length > RequestCardComponent.maxRequestMessageLength ?
                CommonConstants.viewMore :
                CommonConstants.viewMore.slice(3)
              }
            </Link>
          </Typography>
          <div className="nabi-margin-top-small">
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {RequestCardComponent.Text.Instrument}
            </Typography>
            <Typography className="nabi-display-inline-block">{instrumentDisplay && instrumentDisplay.name}</Typography>
            <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {RequestCardComponent.Text.PlaceForLessons}
            </Typography>
            <Typography className="nabi-display-inline-block">{PlaceForLessons[placeForLessons]}</Typography>
             <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {RequestCardComponent.Text.lessonDuration}
            </Typography>
            <Typography className="nabi-display-inline-block">{lessonDuration} mins</Typography>
             <br />
            <Typography
              color="primary"
              className="nabi-text-mediumbold nabi-margin-right-xsmall nabi-display-inline-block"
            >
              {RequestCardComponent.Text.StudentDetails}
            </Typography>
            {
              user.role === Role.student &&
              <Typography className="nabi-display-inline-block">{studentDetails}</Typography>
            }
            {
              user.role === Role.parent &&
              <ul className="nabi-margin-top-xsmall">
                {studentsDetails}
              </ul>
            }
          </div>
        </Grid>
        <Grid item={true} xs={12} md={4} className="nabi-text-center nabi-text-left-md">
          <div className="nabi-margin-top-small-md">
            <Typography className="nabi-display-inline-block nabi-margin-top-small-md">
              {moment(new Date()).to(new Date(createdAt ? createdAt : String(new Date())))}
            </Typography>
            <br />
            <Typography className="nabi-margin-right-xsmall nabi-display-inline-block">
            {applications} {RequestCardComponent.Text.Applications}
            </Typography>
            <br />
            <Link
              className="nabi-cursor-pointer"
              to={`${Routes.Request}/${id}`}
            >
              <Button
                color="primary"
                className="nabi-responsive-button nabi-margin-top-xsmall"
                variant="contained"
              >
                {RequestCardComponent.Text.SendApplication}
              </Button>
            </Link>
            <br />
            <Button
              color="default"
              className="nabi-responsive-button nabi-margin-top-xsmall"
              variant="contained"
            >
              <Icon className="nabi-margin-right-xsmall">close</Icon>
              {RequestCardComponent.Text.Pass}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RequestCard;
