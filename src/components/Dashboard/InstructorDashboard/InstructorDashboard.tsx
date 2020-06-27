import * as React from 'react';
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');

import {
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';
import Check from '@material-ui/icons/Check';

import { UserType } from '../../../redux/models/UserModel';
import { Routes } from '../../common/constants/Routes';
import SectionTitle from '../../common/SectionTitle';
import { BackgroundCheckStatus } from '../../ProfileBuilder/constants';
import { InstructorDashboardComponent as constants }  from '../constants';
import {
  LessonType,
  InstructorDashboardType
} from '../models';
import LessonCard from './LessonCard';

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
    props.dashboard.lessons.map((lesson: LessonType, i) => (
      <React.Fragment key={i}>
        <LessonCard lesson={lesson} />
        {i !== props.dashboard.lessons.length - 1 && <Divider className="nabi-margin-bottom-xsmall nabi-margin-top-small" />}
      </React.Fragment>
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
              {props.dashboard.missingFields &&  props.dashboard.missingFields.length > 0 ?
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
              {props.dashboard.missingFields.length > 0 && displayMissingFields()}
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
            {props.dashboard.lessons && props.dashboard.lessons.length > 0 ?
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
    </React.Fragment>
  );
}
export default InstructorDashboard;
