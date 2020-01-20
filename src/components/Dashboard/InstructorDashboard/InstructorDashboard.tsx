import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import {
  Button,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';
import Check from '@material-ui/icons/Check';

import { UserType } from '../../../redux/models/UserModel';
import { Routes } from '../../common/constants/Routes';
import SectionTitle from '../../common/SectionTitle';
import { BackgroundCheckStatus } from '../../ProfileBuilder/constants';
import RequestCard from '../../Request/RequestCard';
import { InstructorDashboardComponent as constants }  from '../constants';
import { InstructorDashboardType } from '../models';

interface Props {
  user: UserType;
  dashboard: InstructorDashboardType;
}

export const InstructorDashboard = (props: Props) => {

  const displayMissingFields = () => (
    props.dashboard.missingFields.map((item, i) => (
      <Typography key={i}>
        - Add {" "}
        <Link href={Routes.BuildProfile + constants.missingFieldsDisplay[item].url}>
          <a>{constants.missingFieldsDisplay[item].label}</a>
        </Link>
      </Typography>
    ))
  );

  const displayLessons = () => (
    props.dashboard.lessons.map((item, i) => (
      <Grid container={true} key={i}>
        <Grid item={true} xs={12} md={4} className="nabi-text-center">
          <p className="nabi-font-large nabi-color-nabi nabi-margin-top-xsmall nabi-margin-bottom-zero nabi-text-semibold">{item.lessonsRemaining}</p>
          <Typography color="primary">{constants.lessonsRemaining}</Typography>
          <Button
            variant="contained"
            color="primary"
            className="nabi-responsive-button"
          >
            {constants.gradeLessonButton}
          </Button>
        </Grid>
        <Grid item={true} xs={12} md={8}>
          <Grid container={true} className="nabi-margin-top-small">
            {item.parent ?
            <React.Fragment>
              <Grid item={true} xs={6}>
                <Typography>{constants.lessonDetailLabels.parent}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography>{item.parent}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography>{constants.lessonDetailLabels.students}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography>
                  {item.students.map((student, i) =>
                    <span key={i}>{`${student.name} ${student.age} ${item.students[item.students.length - 1] ? '' : ', '}`}</span>
                )}
                </Typography>
              </Grid>
            </React.Fragment>
            :
            <React.Fragment>
              <Grid item={true} xs={6}>
                <Typography>{constants.lessonDetailLabels.name}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography>{item.studentName}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography>{constants.lessonDetailLabels.age}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography>{item.age}</Typography>
              </Grid>
              </React.Fragment>
            }
            <Grid item={true} xs={6}>
              <Typography>{constants.lessonDetailLabels.instrument}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{item.instrument}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{constants.lessonDetailLabels.skillLevel}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{item.skillLevel}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {i !== props.dashboard.lessons.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
      </Grid>
    ))
  );

  return (
    <React.Fragment>
      {props.dashboard &&
        <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small nabi-padding-bottom-large">
          <SectionTitle text={constants.profileStatusSectionTitle} />
          <Typography className="nabi-text-mediumbold nabi-display-inline nabi-margin-right-xsmall">{constants.profileStatusText}</Typography>
          {props.dashboard.complete ?
            <React.Fragment>
              <Typography className="nabi-display-inline nabi-text-uppercase nabi-margin-right-xsmall">{constants.profileStatusLabels.complete}</Typography>
              <Check className="nabi-position-absolute" color="primary" />
              {props.dashboard.missingFields ?
              <div className="nabi-margin-top-medium">
                <SectionTitle text={constants.profileRecommendationsSectionTitle} />
                {displayMissingFields()}
              </div>
              : '' }
            </React.Fragment>
            :
            <React.Fragment>
              <Typography className="nabi-display-inline nabi-text-uppercase nabi-margin-right-xsmall">{constants.profileStatusLabels.incomplete}</Typography>
              <Warning className="nabi-position-absolute" color="error" />
              <Typography>{constants.incompleteText}</Typography>
              {displayMissingFields()}
            </React.Fragment>
          }

          <div className="nabi-margin-top-medium">
            <SectionTitle text={constants.backgroundCheckSectionTitle} />
            <Typography className="nabi-text-mediumbold nabi-display-inline nabi-margin-right-xsmall">{constants.backgroundCheckStatusText}</Typography>
            {props.dashboard.backgroundCheckStatus === BackgroundCheckStatus.verified ?
              <React.Fragment>
                <Typography className="nabi-display-inline nabi-text-uppercase nabi-margin-right-xsmall">{constants.backgroundCheckStatusLabels.verified}</Typography>
                <Check className="nabi-position-absolute" color="primary" />
              </React.Fragment>
              :
              <React.Fragment>
                <Typography className="nabi-display-inline nabi-text-uppercase nabi-margin-right-xsmall">{constants.backgroundCheckStatusLabels.notVerified}</Typography>
                <Warning className="nabi-position-absolute" color="error" />
                <Typography className="nabi-margin-top-xsmall">
                {reactStringReplace(
                  constants.backgroundCheckCTA.text,
                  constants.backgroundCheckCTA.textPlaceholder,
                  (i: string) => <Link href={Routes.BuildProfile + constants.backgroundCheckCTA.url} key={i}><a>{constants.backgroundCheckCTA.backgroundCheckText}</a></Link>
                )}
              </Typography>
              </React.Fragment>
              }
          </div>
          <div className="nabi-margin-top-medium">
            <SectionTitle text={constants.myStudentsSectionTitle} />
            {props.dashboard.lessons.length > 0 ?
              displayLessons()
              :
              <React.Fragment>
                <Typography className="nabi-margin-bottom-xsmall">{constants.noStundetsText}</Typography>
                <Link href={Routes.Requests}>
                  <a>
                    <Button
                      variant="contained"
                      color="primary"
                      className="nabi-responsive-button"
                    >
                      {constants.findJobsButton}
                    </Button>
                  </a>
                </Link>
              </React.Fragment>
            }
          </div>

        </div>
      }

      {props.dashboard && props.dashboard.requests.length > 0 &&
        <div className="nabi-section-widest nabi-background-white">
          <SectionTitle
            text={constants.applyToJobs}
            cta={
              <Link href={Routes.Requests}>
                <a>
                  <Typography color="primary">{constants.viewAll}</Typography>
                </a>
              </Link>}
          />
          {props.dashboard.requests.map((request, i) => (
            <React.Fragment key={i}>
              <RequestCard request={request} isLoggedIn={true} inDashboard={true} />
              {i !== props.dashboard.requests.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
            </React.Fragment>
          ))}
        </div>
      }
    </React.Fragment>
  );
}
export default InstructorDashboard;
