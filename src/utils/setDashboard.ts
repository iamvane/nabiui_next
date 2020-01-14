import { Role } from '../constants/Roles';

interface StudentType {
  name: string;
  age: number;
}

interface RequestType {
  requestId: number;
  requestTitle: string;
  displayName: string;
  distance: string;
  instrument: string;
  lessonDuration: string;
  placeForLessons: string;
  skillLevel: string;
  elapsedTime: string;
  role: string;
  applications: 1,
  studentDetails: StudentType[];
}

export interface LessonsType {
  lessonsRemaining: number;
  studentName: string;
  age: number;
  isntrument: string;
  skillLevel: string;
  parent: string,
  studentDetails: StudentType[]
}

export interface InstructorDashboardType {
  completed?: boolean;
  missingFields?: string[]
  backgroundCheckStatus: string;
  lessons: LessonsType[];
  requests: RequestType[];
}

export interface ParentDashboardType {
  instrument: string;
  skillLevel: string;
  instrtructor: string;
  lessonsRemaining: number;
  students: StudentType[]
}

export interface StudentDashboardType {
  instrument: string;
  skillLevel: string;
  instructor: string;
  lessonsRemaining: number;
}

export const setDashboard = (data) => {
  let dashboard;
  if (data.role === Role.instructor) {

    return (dashboard as InstructorDashboardType)  = {
      completed: data.apiResponse.completed,
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
