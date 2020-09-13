import {
  ActionStatus,
  ActionStatusWithMessage,
  ListResource
} from './models';
import { ApplicationListType } from '../../components/ApplicationList/model';
import { BookLessonsData } from '../../components/BookLessons/model';
import { StudentDetailsType } from '../../components/Dashboard/ParentStudentDashboard/model';
import { RequestType } from '../../components/Request/models';

export interface RequestState extends BookLessonsData {
  request: RequestType;
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
  };
  bookingId: number;
}

export const defaultRequestState: RequestState = {
  request: {
    id: 0,
    displayName: '',
    instrument: '',
    lessonDuration: '',
    skillLevel: '',
    requestMessage: '',
    requestTitle: '',
    placeForLessons: '',
    studentDetails: [
      { age: 0, name: ''}
    ],
    role: '',
    applicationsReceived: 0,
    applied: false,
    avatar: '',
    location: '',
    status: '',
    availability: [],
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
    }
  }
};
