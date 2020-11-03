import {
  ActionStatus,
  ActionStatusWithMessage,
} from './models';
import { BookLessonsData } from '../../components/BookLessons/model';
import { StudentDetailsType } from '../../components/Dashboard/ParentStudentDashboard/model';
import { RequestType } from '../../components/Request/models';
import { InstructorProfileType, InstructorProfilesType } from './InstructorModel';

export interface RequestState extends BookLessonsData {
  request?: RequestType;
  bestMatch?: InstructorProfileType;
  instructorsMatch?: InstructorProfilesType[];
  students: StudentDetailsType[];
  student: StudentDetailsType;
  actions: {
    createStudent: ActionStatus;
    createRequest: ActionStatus;
    fetchRequest: ActionStatus;
    editRequest: ActionStatusWithMessage;
    deleteRequest: ActionStatusWithMessage;
    bookLessons: ActionStatusWithMessage;
    fetchBookLessonsData: ActionStatus;
    chooseLessonsPackage: ActionStatus;
    scheduleLessons: ActionStatusWithMessage;
    fetchStudents: ActionStatus;
    deleteStudent: ActionStatus;
    fetchBestMatch: ActionStatus;
    fetchInstructorsMatch: ActionStatus;
  };
  bookingId: number;
}

export const defaultRequestState: RequestState = {
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
    fetchBestMatch: {
      isRequesting: false,
      error: '',
    },
    fetchInstructorsMatch: {
      isRequesting: false,
      error: '',
    }
  }
};
