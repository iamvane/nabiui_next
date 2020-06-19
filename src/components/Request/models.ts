import { requestsMockData } from './mockData';

export interface StudentType {
  name: string;
  age: number;
  skillLevel?: string;
}

export interface  RequestType {
  id?: string;
  instrument: string;
  placeForLessons: string;
  lessonDuration: string;
  requestTitle: string;
  location?: string;
  requestMessage: string;
  applications?: number;
  createdAt?: string;
  students: StudentType[];
  distance?: string;
  time?: string;
  date?: string;
  timezone?: string;
}

export type IState = RequestType[];

export interface RequestsState {
  // TODO: change to RequestType when doing API integration
  requests: any [];
  request: any;
  actions: {
    createRequests: any;
    updateRequesst: any;
  };
}

export const defaultRequestsState: RequestsState = {
  requests: requestsMockData,
  request: {},
  actions: {
    createRequests: {},
    updateRequesst: {},
  },
};

export interface ApplicationPayload {
  requestId: number;
  rate: string;
  message: string;
}
