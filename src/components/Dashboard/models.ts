import { Request } from '../../redux/models/RequestModel';

interface StudentType {
  name: string;
  age: number;
}

export interface NextLessonType {
  id: number;
  date: string;
  time: string;
  timezone: string;
  studentDetails: StudentType;
  instructor: string;
}

export interface LessonType {
  bookingId: number;
  instrument: string;
  skillLevel: string;
  lessonsRemaining: number;
  parent?: string;
  studentName?: string;
  students?: StudentType[];
  age?: number;
  lastLessonId: number;
}

export interface Booking {
  applicationId: number;
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
  id: number;
  complete?: boolean;
  missingFields?: string[]
  backgroundCheckStatus: string;
  lessons: LessonType[];
  requests: Request[];
  nextLesson: NextLessonType;
}

export interface StudentLessonType {
  id: number;
  date: string;
  timezone: string;
  instructor: string;
  instructorId: number;
  status: string;
  grade: number;
  gradeComment: string;
}

export interface StudentDetailsType {
  id: number;
  name: string;
  instrument: string;
  nextLesson: NextLessonType;
  lessons: StudentLessonType[];
}

export interface ParentStudentDashboardType {
  students: StudentDetailsType[];
}
