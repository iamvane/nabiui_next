import * as React from 'react';

const reactStringReplace = require('react-string-replace');
import Head from 'next/head';

import CommonStepper from '../CommonStepper/CommonStepper';
import { Routes } from '../common/constants/Routes';
import { AnnouncementConstants } from '../common/constants/Announcements';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import SnackBar from '../common/SnackBar';
import {
  ProfileBuilderStepper,
  ProfileBuilderComponent
} from '../ProfileBuilder/constants';
import Education from '../Education/Education';
import Employment from '../Employment/Employment';
import AccountInfo from '../AccountInfo/AccountInfo';
import References from '../Recommendations/Recommendations';
import PrivateRoute from '../Auth/PrivateRoutes';
import ProfileStep from './ProfileStep/ProfileStep';
import JobPreferencesStep from './JobPreferencesStep';
import Screening from './Screening';

interface State {
  showSnackbar: boolean;
}

interface Props {}

export const ProfileBuilder = (props: Props) => {
  const [isSnackbarOpen, toggleSnackbar] = React.useState(false);

  const onClickSnackbar = () => {
    toggleSnackbar(prevOpen => !prevOpen);
  };

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
      <Head>
        <title>{pageTitlesAndDescriptions.buildProfile.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.buildProfile.description}></meta>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
      </Head>
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

export default PrivateRoute(ProfileBuilder, 'Private', ['Instructor']);
