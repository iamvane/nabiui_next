import {
  ActionStatus,
  ActionStatusWithMessage,
  ListResource
} from './models';
import { StudentType } from '../../components/Request/models';
import { ApplicationListType } from '../../components/ApplicationList/model';

export interface RequestType {
  id: number;
  instrument: string;
  lessonDuration: string;
  skillLevel: string;
  requestTitle: string;
  requestMessage: string;
  placeForLessons: string;
  travelDistance?: string;
  students?: StudentType[];
  [x: string]: any;
}

export interface Request {
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
}

export interface RequestState {
  request: RequestType;
  requestsList: ListResource<Request>;
  requests: RequestType[];
  applicationList: ApplicationListType;
  bookingRate: number;
  actions: {
    createRequest: ActionStatus;
    fetchRequests: ActionStatus;
    fetchRequest: ActionStatus;
    editRequest: ActionStatusWithMessage;
    deleteRequest: ActionStatusWithMessage;
    fetchRequestList: ActionStatus;
    fetchApplicationList: ActionStatus;
    bookLessons: ActionStatusWithMessage;
    fetchBookLessonsData: ActionStatus;
  };
}

export const defaultRequestState: RequestState = {
  request: {
    id: 0,
    instrument: '',
    lessonDuration: '',
    skillLevel: '',
    requestMessage: '',
    requestTitle: '',
    placeForLessons: '',
    students: [
      { age: 0, name: '', skillLevel: '' }
    ]
  },
  requests: [],
  requestsList: {
    count: 0,
    previous: '',
    next: '',
    results: []
  },
  applicationList: {
    id: 0,
    requestTitle: '',
    dateCreated: '',
    applications: []
  },
  bookingRate: 0,
  actions: {
    createRequest: {
      isRequesting: false,
      error: '',
    },
    fetchRequests: {
      isRequesting: false,
      error: '',
    },
    fetchRequest: {
      isRequesting: false,
      error: '',
    },
    editRequest: {
      isRequesting: false,
      error: '',
      message: ''
    },
    deleteRequest: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchRequestList: {
      isRequesting: false,
      error: '',
    },
    fetchApplicationList: {
      isRequesting: false,
      error: '',
    },
    bookLessons: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchBookLessonsData: {
      isRequesting: false,
      error: '',
    }
  }
};
