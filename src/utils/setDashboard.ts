import { Role } from '../constants/Roles';
import {
  InstructorDashboardType,
  ParentStudentDashboardType
} from '../components/Dashboard/models';

export const setDashboard = (data) => {
  let dashboard;
  if (data.role === Role.instructor) {
    return (dashboard as InstructorDashboardType) = {
      complete: data.apiResponse.complete,
      missingFields: data.apiResponse.missingFields,
      backgroundCheckStatus: data.apiResponse.backgroundCheckStatus,
      lessons: data.apiResponse.lessons,
      requests: data.apiResponse.requests,
      nextLesson: data.apiResponse.nextLesson
    };
  }
  return (dashboard as ParentStudentDashboardType) =  {
    bookings: data.apiResponse.bookings,
    requests: data.apiResponse.requests
  };
};
