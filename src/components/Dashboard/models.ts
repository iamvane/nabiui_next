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
  student_details: StudentType;
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
  complete?: boolean;
  missingFields?: string[]
  backgroundCheckStatus: string;
  lessons: LessonType[];
  requests: Request[];
  nextLesson: NextLessonType;
}

export interface ParentStudentDashboardType {
  bookings: Booking[];
  requests: MyRequestType[];
}
