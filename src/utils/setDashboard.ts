import { Role } from '../constants/Roles';
import {
  InstructorDashboardType,
  ParentStudentDashboardType
} from '../components/Dashboard/models';

export const setDashboard = (data) => {
  let dashboard;
  if (data.role === Role.instructor) {
    console.log('role ' + data.role);
    return (dashboard as InstructorDashboardType) = {
      complete: data.apiResponse.complete,
      missingFields: data.apiResponse.missingFields,
      backgroundCheckStatus: data.apiResponse.backgroundCheckStatus,
      lessons: data.apiResponse.lessons,
      requests: data.apiResponse.requests
    };
  }
  return (dashboard as ParentStudentDashboardType) =  {
    bookings: data.apiResponse.bookings,
    requests: data.apiResponse.requests
  };
};
