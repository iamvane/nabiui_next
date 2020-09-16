import * as React from 'react';

import { getCookie } from '../../utils/cookies';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import { ScheduleTrialComponent } from './constants';
import ScheduleLessons from '../ScheduleLessons/ScheduleLessons';
import PrivateRoute from '../Auth/PrivateRoutes';

export const ScheduleTrial = () => {
  const role = getCookie('role');

  const pageTitle = role === Role.parent ?
    ScheduleTrialComponent.pageTitleParent.replace(
      ScheduleTrialComponent.studentPlaceholder,
      getCookie('studentName')
    ) :
    ScheduleTrialComponent.pageTitle;

  return (
    <ScheduleLessons nextPath={Routes.ScheduleTrial + Routes.TrialConfirmation} pageTitle={pageTitle} isTrial={true} />
  )
}

export default PrivateRoute(ScheduleTrial, 'Private', ['Student', 'Parent']);
