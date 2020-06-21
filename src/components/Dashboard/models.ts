import { Request } from '../../redux/models/RequestModel';

interface StudentType {
  name: string;
  age: number;
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

export interface NextLesson {
  date: string;
  time: string;
  timezone: string;
  student_details: StudentType[];
}

export interface InstructorDashboardType {
  complete?: boolean;
  missingFields?: string[]
  backgroundCheckStatus: string;
  lessons: LessonType[];
  nextLesson: NextLesson;
  requests: Request[];
}

export interface ParentStudentDashboardType {
  bookings: Booking[];
  requests: MyRequestType[];
}
