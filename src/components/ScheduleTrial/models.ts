export interface InstructorCardType {
  id: number;
  displayName: string;
  reviews: number;
  experience: number;
  age: number
  backgroundCheckStatus: string;
  rate: number
  avatar: string;
  bioTitle: string;
}

export interface StudentDetailsType {
  name?: string;
  dob?: number;
  skillLevel: string;
  instrument: string;
}
