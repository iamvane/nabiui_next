import * as React from 'react';
import Router from "next/router";

import { getCookie } from "../../utils/cookies";
import { BookingDetails } from '../ScheduleLessons/BookingDetails';
import { Role } from '../../constants/Roles';
import { TrialConfirmationComponent } from './constants';
import { Routes } from '../common/constants/Routes';

export const LessonDetails = () => {
  const handleContinue = () => {
    return Router.push(Routes.WelcomeToNabi);
  }

  return (
    <BookingDetails
      headingMessage={
        getCookie('role') === Role.parent ?
        TrialConfirmationComponent.parentMessage.replace(
          TrialConfirmationComponent.studentNamePlaceholder,
          getCookie('studentName')
        ) :
        TrialConfirmationComponent.studentMessage
      }
      handleContinue={handleContinue}
    />
  )
}

export default LessonDetails;
