export interface StudentDetailsType {
  id?: number;
  name?: string;
  age?: number;
  instrument?: string;
  skillLevel?: string;
  lessonPlace?: string;
  lessonDuration?: string;
}

export interface ParentProfileType {
  students: StudentDetailsType[];
}
