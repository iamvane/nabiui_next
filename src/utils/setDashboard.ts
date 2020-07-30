import { Role } from '../constants/Roles';
import {
  InstructorDashboardType,
  ParentStudentDashboardType
} from '../components/Dashboard/models';
import { getCookie } from './cookies';

const role = getCookie('role');

export const setDashboard = (data) => {
  let dashboard;
  if (role === Role.instructor) {
    return (dashboard as InstructorDashboardType) = {
      complete: data.complete,
      missingFields: data.missingFields,
      backgroundCheckStatus: data.backgroundCheckStatus,
      lessons: data.lessons,
      requests: data.requests,
      nextLesson: data.nextLesson
    };
  }
  return (dashboard as ParentStudentDashboardType) =  {
    students: data.students,
  };
};
