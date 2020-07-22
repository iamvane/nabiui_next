export interface StudentDetailsType {
  id?: number;
  name?: string;
  age?: number;
  instrument?: string;
  skillLevel?: string;
  lessonPlace?: string;
  lessonDuration?: string;
  studentId?: number;
}

export interface ParentProfileType {
  students: StudentDetailsType[];
}
