import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const reactStringReplace = require('react-string-replace');

import CommonStepper from '../CommonStepper/CommonStepper';
import { Routes } from '../common/constants/Routes';
import { AnnouncementConstants } from '../common/constants/Announcements';
import SnackBar from '../common/SnackBar';
import {
  ProfileBuilderStepper,
  ProfileBuilderComponent
} from '../ProfileBuilder/constants';
import Education from '../Education/Education';
import Employment from '../Employment/Employment';
import AccountInfo from '../AccountInfo/AccountInfo';
import ProfileStep from './ProfileStep/ProfileStep';
import JobPreferencesStep from './JobPreferencesStep';
import Screening from './Screening';

interface State {
  showSnackbar: boolean;
}

interface Props extends RouteComponentProps<{}> {}

export class ProfileBuilder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSnackbar: false
    };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.redirectedFrom === Routes.Registration) {
      this.setState({
        showSnackbar: true
      });
    }
  }

  public closeSnackbar = () => this.setState({ showSnackbar: false});

  public render () {
    const snackBarMessage = reactStringReplace(
      AnnouncementConstants.preLaunchWelcomeInstructor,
      AnnouncementConstants.welcomePlaceholder,
      (i: number) => (
        <span key={i} className="nabi-text-mediumbold">{AnnouncementConstants.welcomeText}</span>
      )
    );

    const components = [
      (
        <AccountInfo
          nextPath={ProfileBuilderStepper.StepsPaths.Profile}
          redirectUrl={ProfileBuilderStepper.StepsPaths.Profile}
          key={0}
        />
      ),
      <ProfileStep key={1} />,
      <JobPreferencesStep key={2} />,
      <Education key={3} />,
      <Employment key={4} />,
      <Screening key={5} />
    ];

    return(
      <React.Fragment>
        <CommonStepper
          steps={ProfileBuilderStepper.steps}
          pageTitle={ProfileBuilderComponent.pageTitle}
          stepsPaths={ProfileBuilderStepper.StepsPaths}
          content={components}
          baseRoute={Routes.BuildProfile}
        />
        <SnackBar
          isOpen={this.state.showSnackbar}
          message={snackBarMessage}
          handleClose={this.closeSnackbar}
          variant="success"
          hideIcon={true}
        />
      </React.Fragment>
    );
  }
}

export default ProfileBuilder;
