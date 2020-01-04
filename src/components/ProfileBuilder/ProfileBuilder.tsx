import * as React from 'react';

const reactStringReplace = require('react-string-replace');
import { useRouter } from 'next/router';

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
import References from '../Recommendations/Recommendations';

interface State {
  showSnackbar: boolean;
}

interface Props {}

export const ProfileBuilder = (props: Props) => {
  const [isSnackbarOpen, toggleSnackbar] = React.useState(false);

  const onClickSnackbar = () => {
    toggleSnackbar(prevOpen => !prevOpen);
  };

  const router = useRouter();
  console.log(router);
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
        nextPath={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Profile}
        redirectUrl={Routes.BuildProfile + ProfileBuilderStepper.StepsPaths.Profile}
        key={0}
      />
    ),
    <ProfileStep key={1} />,
    <JobPreferencesStep key={2} />,
    <Education key={3} />,
    <Employment key={4} />,
    <References key={5} />,
    <Screening key={6} />
  ];

  return(
    <React.Fragment>
      <CommonStepper
        steps={ProfileBuilderStepper.steps}
        pageTitle={ProfileBuilderComponent.pageTitle}
        stepsPaths={ProfileBuilderStepper.StepsPaths}
        content={components}
        baseRoute={Routes.BuildProfile}
        stepQueries={ProfileBuilderStepper.stepsQueries}
      />
      <SnackBar
        isOpen={isSnackbarOpen}
        message={snackBarMessage}
        handleClose={onClickSnackbar}
        variant="success"
        hideIcon={true}
      />
    </React.Fragment>
  );
}

export default ProfileBuilder;
