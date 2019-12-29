import {
  ActionStatus,
  ActionStatusWithMessage
} from '../models/models';
import { StudentType } from '../../components/Request/models';

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

export interface RequestState {
  request: RequestType;
  requests: RequestType[];
  actions: {
    createRequest: ActionStatus;
    fetchRequests: ActionStatus;
    fetchRequest: ActionStatus;
    editRequest: ActionStatusWithMessage;
    deleteRequest: ActionStatusWithMessage;
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
    }
  }
};
