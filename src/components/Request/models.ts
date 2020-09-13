import { number } from "../StudioInstructor/constants"

export interface ApplicationPayload {
  requestId: number;
  userId: string;
  accept: Boolean;
}

export interface StudentType {
  name: string;
  age: number;
}

export interface RequestAvailabilityType {
  name: string;
  age: number;
}

export interface RequestType {
  id: number;
  createdAt?: string;
  elapsedTime?: string;
  displayName: string;
  distance: number;
  instrument: string;
  lessonDuration: string;
  requestTitle: string;
  requestMessage: string;
  placeForLessons: string;
  skillLevel: string;
  role: string;
  applicationsReceived: number;
  applied?: boolean;
  studentDetails: StudentType[];
  avatar: string;
  location: string;
  status: string;
  availability: RequestAvailabilityType[]

}
