import * as React from 'react';
import moment from 'moment';
import Link from 'next/link';

import {
  Button,
  Grid,
  Icon,
  Typography
} from '@material-ui/core';

import { Request } from '../../redux/models/RequestModel';

import { CommonConstants } from '../common/constants/common';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import { PlaceForLessons } from '../PlaceForLessons/constants';
import { instruments } from '../../../assets/data/instruments';
import { SkillLevel } from '../Instruments/constants';
import { RequestCardComponent } from './constants';

interface Props {
  request: Request;
}

const RequestCard: React.StatelessComponent<Props> = props => {
  const {
    id,
    instrument,
    placeForLessons,
    lessonDuration,
    requestTitle,
    requestMessage,
    applicationsReceived,
    studentDetails,
    createdAt,
    applied,
    displayName,
    role,
    distance,
    skillLevel,
  } = props.request;

  const studentsDetails = studentDetails.map((student: any, i: any) => (
    <li key={i} className="nabi-list nabi-margin-top-xsmall">
      <Typography className="nabi-color-default">
        {`${student.name}, ${student.age} ${RequestCardComponent.Text.YrsOld} (${SkillLevel[skillLevel]})`}
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
        {applied &&
          <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
            <Icon className="nabi-vertical-bottom">check</Icon> Applied
          </Typography>}
      </div>
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={12} md={8} className="nabi-text-center nabi-text-left-md">
          <Grid item={true} xs={8} md={12} className="nabi-margin-center">
            <Link
              href={`${Routes.Request}/${id}`}
            >
              <a>
                <Typography color="primary" className="nabi-margin-top-xsmall nabi-text-mediumbold">
                  {displayName + role}
                </Typography>
              </a>
            </Link>
            <Typography>
              {distance && String(distance.toFixed(1))}
            </Typography>
            <Typography className="nabi-margin-top-small nabi-text-mediumbold">
              {requestTitle}
            </Typography>
          </Grid>
          <Typography>
            {requestMessage}
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
            {applicationsReceived} {RequestCardComponent.Text.Applications}
            </Typography>
            <br />
            <Link
              href={`${Routes.Request}/${id}`}
            >
              <a>
                <Button
                  color="primary"
                  className="nabi-responsive-button nabi-margin-top-xsmall"
                  variant="contained"
                >
                  {RequestCardComponent.Text.SendApplication}
                </Button>
              </a>
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
