import { Role } from '../constants/Roles';
import {
  InstructorDashboardType,
  StudentDashboardType
} from '../components/Dashboard/models';

export const setDashboard = (data) => {
  let dashboard;
  if (data.role === Role.instructor) {

    return (dashboard as InstructorDashboardType)  = {
      complete: data.apiResponse.complete,
      missingFields: data.apiResponse.missingFields,
      backgroundCheckStatus: data.apiResponse.backgroundCheckStatus,
      lessons: data.apiResponse.lessons,
      requests: data.apiResponse.requests
    };
  }
  if (data.role === Role.student) {
    return (dashboard as StudentDashboardType)  =  {
      instrument: data.instrument,
      skillLevel: data.skillLevel,
      instructor: data.instrtructor,
      lessonsRemaining: data.lessonsRemaining
    };
  }

  return;
};
