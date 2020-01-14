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

export interface InstructorDashboardType {
  complete?: boolean;
  missingFields?: string[]
  backgroundCheckStatus: string;
  lessons: LessonsType[];
  requests: Request[];
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
