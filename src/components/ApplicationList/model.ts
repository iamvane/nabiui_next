import { AvailabilityType } from '../Availability/model';

export interface ApplicationType {
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
  video: string;

}
export interface ApplicationListType {
  id: number;
  requestTitle: string;
  dateCreated: string;
  applications: ApplicationType[];
  freeTrial: boolean;
}
