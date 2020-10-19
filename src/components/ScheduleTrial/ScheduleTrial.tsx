import * as React from 'react';

import { getCookie } from '../../utils/cookies';
import { Routes } from '../common/constants/Routes';
import { ScheduleTrialComponent } from './constants';
import ScheduleLessons from '../ScheduleLessons/ScheduleLessons';
import PrivateRoute from '../Auth/PrivateRoutes';

export const ScheduleTrial = () => {
  const role = getCookie('role');

  return (
    <ScheduleLessons nextPath={Routes.ScheduleTrial + Routes.TrialConfirmation} pageTitle={ScheduleTrialComponent.pageTitle} isTrial={true} />
  )
}

export default PrivateRoute(ScheduleTrial, 'Private', ['Student', 'Parent']);
