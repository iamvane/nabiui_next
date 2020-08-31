import {
  ActionStatus,
  ActionStatusWithMessage,
  ListResource
} from './models';
import { ApplicationListType } from '../../components/ApplicationList/model';
import { BookLessonsData } from '../../components/BookLessons/model';
import { StudentDetailsType } from '../../components/Dashboard/ParentStudentDashboard/model';

interface StudentType {
  name: string;
  age: number;
}

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
  date?: string;
  time?: string;
  timezone?: string;
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
  timezone: string;
  date: string;
  time: string;
}

export interface RequestState extends BookLessonsData {
  request: RequestType;
  requestsList: ListResource<Request>;
  requests: RequestType[];
  applicationList: ApplicationListType;
  students: StudentDetailsType[];
  student: StudentDetailsType;
  actions: {
    createStudent: ActionStatus;
    createRequest: ActionStatus;
    fetchRequests: ActionStatus;
    fetchRequest: ActionStatus;
    editRequest: ActionStatusWithMessage;
    deleteRequest: ActionStatusWithMessage;
    fetchRequestList: ActionStatus;
    fetchMoreRequestList: ActionStatus;
    fetchApplicationList: ActionStatus;
    bookLessons: ActionStatusWithMessage;
    fetchBookLessonsData: ActionStatus;
    chooseLessonsPackage: ActionStatus;
    scheduleLessons: ActionStatusWithMessage;
    fetchStudents: ActionStatus;
    deleteStudent: ActionStatus;
    fetchStudentsBookingData: ActionStatus;
    fetchStudentsBookingLessonsData: ActionStatus;
  };
  bookingId: number;
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
      { age: 0, name: ''}
    ]
  },
  instructor: {
    avatar: "",
		reviews: {
			rating: "",
			quantity: 0,
		},
		backgroundCheckStatus: "",
		display_name: "",
		rate: 0,
		yearsOfExperience: 0,
		age: 0

  },
  student: {},
  students: [],
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
    applications: [],
    freeTrial: false
  },
  bookingId: 0,
  actions: {
    createStudent: {
      isRequesting: false,
      error: ''
    },
    createRequest: {
      isRequesting: false,
      error: '',
    },
    fetchRequests: {
      isRequesting: false,
      error: '',
    },
    fetchMoreRequestList: {
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
    },
    chooseLessonsPackage: {
      isRequesting: false,
      error: '',
    },
    scheduleLessons: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchStudents: {
      isRequesting: false,
      error: '',
    },
    deleteStudent: {
      isRequesting: false,
      error: '',
    },
    fetchStudentsBookingData: {
      isRequesting: false,
      error: ''
    },
    fetchStudentsBookingLessonsData: {
      isRequesting: false,
      error: ''
    }
  }
};
