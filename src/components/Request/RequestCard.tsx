import * as React from 'react';
import moment from 'moment';
import Link from 'next/link';

import {
  Avatar,
  Button,
  Grid,
  Icon,
  Typography
} from '@material-ui/core';

import { Request } from '../../redux/models/RequestModel';

import { Routes } from '../common/constants/Routes';
import {
  Role,
  RoleLabels
} from '../../constants/Roles';
import { PlaceForLessons } from '../PlaceForLessons/constants';
import { instruments } from '../../../assets/data/instruments';
import { SkillLevel } from '../Instruments/constants';
import { RequestCardComponent } from './constants';

interface Props {
  request: Request;
}

const RequestCard: React.StatelessComponent<Props> = props => {
  const AvatarStyles = { width: '120px', height: '120px'};
  const {
    id,
    avatar,
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

  const studentInfo =
    `${studentDetails[0].age} ${RequestCardComponent.Text.YrsOld} (${SkillLevel[skillLevel]})`;
  const studentsDetails = studentDetails.map((student: any, i: any) => (
    <li key={i} className="nabi-list nabi-margin-top-xsmall">
      <Typography className="nabi-color-default">
        {`${student.name}, ${student.age} ${RequestCardComponent.Text.YrsOld} (${SkillLevel[skillLevel]})`}
      </Typography>
    </li>
  ));
  const instrumentDisplay = instruments.find(t => t.value === instrument);

  return (
    <div className="nabi-section nabi-padding-top-small nabi-padding-bottom-small nabi-background-white nabi-margin-bottom-small nabi-position-relative">
      <div
        style={{right: '20px'}}
        className={`nabi-float-right ${!applied && 'nabi-position-absolute'} nabi-position-absolute-md`}
      >
        {applied &&
          <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
            <Icon className="nabi-vertical-bottom">check</Icon> Applied
          </Typography>}
      </div>
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12} md={3} className="nabi-text-center">
          <Avatar src={avatar} style={AvatarStyles} className="nabi-margin-center" />
          <Typography className="nabi-margin-top-xsmall nabi-text-semibold">
            {displayName}
          </Typography>
          <Typography color="primary" className="nabi-text-semibold">
            {RoleLabels[role]}
          </Typography>
          <Typography>
            {distance && String(distance.toFixed(1)) + ' mi away'}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} md={6}>
            <p className="nabi-jennasue-title nabi-color-nabi nabi-margin-top-zero nabi-text-center nabi-margin-bottom-xsmall nabi-text-mediumbold nabi-text-left-md">
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
              role === Role.student &&
              <Typography className="nabi-display-inline-block">{studentInfo}</Typography>
            }
            {
              role === Role.parent &&
              <ul className="nabi-margin-top-xsmall">
                {studentsDetails}
              </ul>
            }

          </div>
        </Grid>
        <Grid item={true} xs={12} md={3} className="nabi-text-center nabi-text-left-md">
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
                  {applied ? RequestCardComponent.Text.ViewApplication : RequestCardComponent.Text.SendApplication}
                </Button>
              </a>
            </Link>
            {/* <br />
            <Button
              color="default"
              className="nabi-responsive-button nabi-margin-top-xsmall"
              variant="contained"
            >
              <Icon className="nabi-margin-right-xsmall">close</Icon>
              {RequestCardComponent.Text.Pass}
            </Button> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RequestCard;
