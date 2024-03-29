import { ActionStatus, ActionStatusWithMessage, ListResource } from "./models";
import { PlaceForLessonsType } from "../../components/PlaceForLessons/model";
import { RatesType } from "../../components/Rates/model";
import { EducationType } from "../../components/Education/model";
import { EmploymentType } from "../../components/Employment/model";
import { AvailabilityType } from "../../components/Availability/model";
import { InstrumentsType } from "../../components/Instruments/model";
import {
  LessonSizeType,
  AgeGroupType
} from "../../components/JobPreferences/model";
import { QualificationsType } from "../../components/Qualifications/model";

interface ReviewsType {
  rating: string;
  quantity: number;
  items: {
    date: string,
    rating: number,
    comment: string;
    user: string;
  }[]
}

export interface InstructorProfileType {
  id: number;
  avatar: string;
  name: string;
  reviews: ReviewsType;
  instruments: string[],
  rate: number,
  timezone: '',
  bioTitle: string,
  bioDescription: string,
  yearsOfExperience: number,
  tutoredStudents: number,
  languages: string[];
  levelsTaught: string[];
  lessonsTaught: number;
  verified: boolean;
}

export interface InstructorListType {
  id: number;
  name: string;
  avatar: string;
  reviews: {
    rating: number;
    quantity: number;
  };
  instruments: string[];
  rate: number;
  timezone: string;
}

export interface InstructorType {
  userId?: number;
  bioTitle?: string;
  video?: string;
  bioDescription?: string;
  music?: string[];
  id?: number;
  avatar?: string | null;
  instruments?: InstrumentsType[];
  lessonSize?: LessonSizeType;
  ageGroup?: AgeGroupType;
  rates?: RatesType;
  placeForLessons?: PlaceForLessonsType;
  availability?: AvailabilityType;
  qualifications?: QualificationsType;
  languages?: string[];
  studioAddress?: string;
  travelDistance?: string;
  education?: EducationType[];
  employment?: EmploymentType[];
  lessonsTaught?: number;
  memberSince?: string;
  reviews?: number;
  displayName?: string;
  yearsOfExperience?: number;
  age?: number;
  instructorId?: number;
  references?: string[];
  backgroundCheckStatus?: string;
  backgroundCheckResults?: {
    requestorEmail: string;
    status: string;
    result: string;
    createdAt: string;
  };
  signedFile?: string;
  zoomLink?: string;
}

export interface Rates {
  [x: string]: string;
}

export interface Instructor {
  age?: number;
  avatar?: string | null;
  bioDescription?: string | null;
  bioTitle?: string | null;
  video?: string;
  displayName?: string;
  id?: number;
  instruments?: InstrumentsType[];
  lessonsTaught?: number;
  memberSince?: string;
  rates?: Rates;
  reviews?: number;
  lastLogin?: string;
  location?: string;
  lessonStartAt?: string;
  favorite?: boolean;
  backgroundCheckStatus?: string;
  address?: string;
  distance: number;
  yearsOfExperience: number;
  placeForLessons: {
    studio?: boolean;
    online?: boolean;
    home?: boolean;
  };
}

export interface InstructorState {
  instructorProfile?: InstructorProfileType;
  instructorList?: InstructorListType[];
  instructor: InstructorType;
  instructors: ListResource<Instructor>;
  instructorReview?: InstructorReview,
  actions: {
    buildProfile: ActionStatus;
    fetchProfile: ActionStatus;
    buildJobPreferences: ActionStatus;
    addEducation: ActionStatusWithMessage;
    fetchEducation: ActionStatus;
    editEducation: ActionStatusWithMessage;
    deleteEducation: ActionStatusWithMessage;
    addEmployment: ActionStatusWithMessage;
    fetchEmployment: ActionStatus;
    editEmployment: ActionStatusWithMessage;
    deleteEmployment: ActionStatusWithMessage;
    fetchInstructors: ActionStatus;
    fetchMoreInstructors: ActionStatus;
    fetchInstructor: ActionStatus;
    requestReference: ActionStatusWithMessage;
    fetchReferences: ActionStatus;
    requestBackgroundCheck: ActionStatusWithMessage;
    fetchBackgroundCheckStatus: ActionStatus;
    submitApplication: ActionStatusWithMessage;
    gradeLesson: ActionStatusWithMessage;
    signFile: ActionStatusWithMessage;
    uploadVideoProfile: ActionStatusWithMessage;
    rateInstructor: ActionStatus;
    rateInstructorUnauthenticated: ActionStatus;
  };
}

export interface InstructorReview {
  instructor: string,
  rating: number,
  comment: string
}

export const defaultInstructorState: InstructorState = {
  instructor: {
    userId: 0,
    backgroundCheckResults: {
      requestorEmail: '',
      status: '',
      result: '',
      createdAt: '',
    },
  },
  instructors: {
    count: 0,
    previous: "",
    next: "",
    results: []
  },
  actions: {
    buildProfile: {
      isRequesting: false,
      error: ""
    },
    buildJobPreferences: {
      isRequesting: false,
      error: ""
    },
    fetchProfile: {
      isRequesting: false,
      error: ""
    },
    addEducation: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchEducation: {
      isRequesting: false,
      error: ""
    },
    editEducation: {
      isRequesting: false,
      error: "",
      message: ""
    },
    deleteEducation: {
      isRequesting: false,
      error: "",
      message: ""
    },
    addEmployment: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchEmployment: {
      isRequesting: false,
      error: ""
    },
    editEmployment: {
      isRequesting: false,
      error: "",
      message: ""
    },
    deleteEmployment: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchInstructors: {
      isRequesting: false,
      error: ""
    },
    fetchInstructor: {
      isRequesting: false,
      error: ""
    },
    fetchMoreInstructors: {
      isRequesting: false,
      error: ""
    },
    requestReference: {
      isRequesting: false,
      error: "",
      message: ""
    },
    fetchReferences: {
      isRequesting: false,
      error: ''
    },
    requestBackgroundCheck: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchBackgroundCheckStatus: {
      isRequesting: false,
      error: ''
    },
    submitApplication: {
      isRequesting: false,
      error: '',
      message: ''
    },
    gradeLesson: {
      isRequesting: false,
      error: '',
      message: ''
    },
    signFile: {
      isRequesting: false,
      error: "",
      message: ""
    },
    uploadVideoProfile: {
      isRequesting: false,
      error: "",
      message: ""
    },
    rateInstructor: {
      isRequesting: false,
      error: "",
    },
    rateInstructorUnauthenticated: {
      isRequesting: false,
      error: "",
    }
  }
};
