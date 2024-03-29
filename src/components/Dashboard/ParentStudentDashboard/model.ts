export interface StudentDetailsType {
  id?: number;
  name?: string;
  age?: Date | number;
  instrument?: string;
  skillLevel?: string;
  lessonPlace?: string;
  lessonDuration?: string;
  studentId?: number;
  specialNeeds?: string[];
  notes?: string;
}

export interface ParentProfileType {
  students: StudentDetailsType[];
}
