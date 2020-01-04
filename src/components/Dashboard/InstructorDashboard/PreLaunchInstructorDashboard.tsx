import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import {
  Button,
  Typography,
} from '@material-ui/core';

import { StoreState } from '../../../redux/reducers/store';
import { UserType } from '../../../redux/models/UserModel';
import { InstructorType } from '../../../redux/models/InstructorModel';
import { Routes } from '../../common/constants/Routes';
import SectionTitle from '../../common/SectionTitle';
import InviteFriends from '../../InviteFriends/InviteFriends';
import { PreLaunchInstructorDashboardComponent as constants }  from '../constants';

interface OwnProps {
}

interface State {
  // errors: BuyMoreLessonsModalComponent.BuyMoreLessonsErrors;
}

interface StateProps {
  // TODO: set to RequestType when api integration is done
  user: UserType;
  profile: InstructorType;
}

interface Props extends OwnProps, StateProps {}

export class PreLaunchInstructorDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let editLinks = [];
    let completed: number = 0;
    const { user, profile } = this.props;

    if (
        user.firstName && user.lastName && user.birthday && user.displayName &&
        user.location
    ) {
      completed += 9.09;
    } else {
      editLinks.push(
        {route: 'account-info', description: 'Your basic information is not complete.', linkText: 'Edit Basic Info'}
      );
    }
    if (user.isPhoneVerified) {
      completed += 9.09;
    } else {
      editLinks.push(
        {route: 'account-info', description: 'Your basic information is not complete.', linkText: 'Edit Basic Info'}
      );
    }
    if (profile) {
      if (
        profile.bioTitle && profile.bioDescription && profile.music) {
        completed += 9.09;
      } else {
        editLinks.push(
          {route: 'profile', description: 'Your profile is not complete.', linkText: 'Edit profile'}
        );
      }
      if (profile.instruments && profile.instruments.length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'job-preferences',
            description: 'Your instruments are not listed.',
            linkText: 'Edit Job Preferences'
          }
        );
      }
      if (profile.lessonSize && (Object.keys(profile.lessonSize)).length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'job-preferences',
            description: 'Your lesson size is missing.',
            linkText: 'Edit Job Preferences'
          }
        );
      }
      if (profile.ageGroup && (Object.keys(profile.ageGroup)).length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'job-preferences',
            description: 'Your age groups are missing.',
            linkText: 'Edit Job Preferences'
          }
        );
      }
      if (profile.rates && (Object.keys(profile.rates)).length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'job-preferences',
            description: 'Your rates are not listed.',
            linkText: 'Edit Job Preferences'
          }
        );
      }
      if (profile.qualifications && (Object.keys(profile.qualifications)).length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'job-preferences',
            description: 'Your qualifications are missing.',
            linkText: 'Edit Job Preferences'
          }
        );
      }
      if (profile.availability && (Object.keys(profile.availability)).length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'job-preferences',
            description: 'Your availability is not set.',
            linkText: 'Edit Job Preferences'
          }
        );
      }

      if (profile.employment && profile.employment.length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'employment',
            description: 'Your employment history is missing.',
            linkText: 'Edit Employment'
          }
        );
      }
      if (profile.education && profile.education.length > 0) {
        completed += 9.09;
      } else {
        editLinks.push(
          {
            route: 'education',
            description: 'Your previous education is not listed.',
            linkText: 'Edit Education'
          }
        );
      }
    }

    completed = Math.round(completed);

    const editLinksDisplay = editLinks.map((item, i) => (
      <Typography key={i}>
        - {item.description} <Link href={`${Routes.BuildProfile}/${item.route}`}><a>{item.linkText}</a></Link>
      </Typography>
    ));

    return (
      <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
        <SectionTitle text={constants.profileCompletionSectionTitle} />
        <Typography>{constants.descriptionText}</Typography>
        <Button
          color="primary"
          variant="contained"
          className={`completed-button completed-button-${completed}
          nabi-display-block nabi-margin-bottom-small nabi-margin-top-small`}
        >
          {constants.completionText.replace(
            constants.percentPlaceholder,
            String(completed)
          )}
        </Button>
        {completed === 100 ?
          <Typography><Link href={Routes.BuildProfile}><a>{constants.editProfileLink}</a></Link></Typography> : editLinksDisplay
        }
        <div className="nabi-margin-top-medium">
          <SectionTitle text={constants.profileSectionTitle} />
          <Link href={`profile/${this.props.profile.instructorId}`}>
            <a>
              <img
                src="https://nabimusic.s3.us-east-2.amazonaws.com/nabimusic-instructor-profiles.png"
                className="dashboard-view-profile-image"
              />
              <Typography color="primary">{constants.viewProfileLink}</Typography>
            </a>
          </Link>
        </div>
        <InviteFriends />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  return {
    user: state.user.user,
    profile: state.user.user.profile as InstructorType
  };
};

export default connect(mapStateToProps, {})(PreLaunchInstructorDashboard);
