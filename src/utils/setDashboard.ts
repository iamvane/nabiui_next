import { Role } from '../constants/Roles';
import {
  InstructorDashboardType,
  StudentDashboardType,
  ParentDashboardType
} from '../components/Dashboard/models';

export const setDashboard = (data) => {
  let dashboard;
  if (data.role === Role.instructor) {

    return (dashboard as InstructorDashboardType) = {
      complete: data.apiResponse.complete,
      missingFields: data.apiResponse.missingFields,
      backgroundCheckStatus: data.apiResponse.backgroundCheckStatus,
      lessons: data.apiResponse.lessons,
      requests: data.apiResponse.requests
    };
  }
  if (data.role === Role.student) {
    return (dashboard as StudentDashboardType) =  {
      bookings: data.apiResponse.bookings,
      requests: data.apiResponse.requests
    };
  }

  if (data.role === Role.parent) {
    return (dashboard as ParentDashboardType) =  {
      bookings: data.apiResponse.bookings,
      requests: data.apiResponse.requests
    };
  }

  return;
};
