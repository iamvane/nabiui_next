import { Request } from '../../redux/models/RequestModel';

interface StudentType {
  name: string;
  age: number;
}

export interface LessonsType {
  lessonsRemaining: number;
  studentName: string;
  age: number;
  instrument: string;
  skillLevel: string;
  parent: string,
  students: StudentType[]
}

export interface Booking {
  instrument: string;
  skillLevel: string;
  instructor: string;
  lessonsRemaining: number;
  students: StudentType[];
}

export interface MyRequestType {
  id: number;
  instrument: string;
  placeForLessons: string;
  requestMessage: string;
  requestTitle: string;
  skillLevel: string;
  lessonDuration: string;
  applications: number;
  studentDetails: StudentType[];
  createdAt: string;
}

export interface InstructorDashboardType {
  complete?: boolean;
  missingFields?: string[]
  backgroundCheckStatus: string;
  lessons: LessonsType[];
  requests: Request[];
}

export interface ParentStudentDashboardType {
  bookings: Booking[];
  requests: MyRequestType[];
}
