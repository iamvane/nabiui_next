import { AvailabilityType } from '../Availability/model';

export interface Application {
  applicationId: number;
  instructorId: number;
  applicationMessage: string;
  applicationRate: string;
  availability: AvailabilityType;
  avatar: string;
  displayName: string;
  reviews: number;
  yearsOfExperience: number;
  age: number;
  backgroundCheckStatus: string;

}
export interface ApplicationListType {
  id: number;
  requestTitle: string;
  dateCreated: string;
  applications: Application[];
  freeTrial: boolean;
}
