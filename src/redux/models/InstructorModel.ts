import {
  ActionStatus,
  ActionStatusWithMessage,
  ListResource
} from 'redux/models/models';
import { PlaceForLessonsType } from 'components/PlaceForLessons/model';
import { RatesType } from 'components/Rates/model';
import { EducationType } from 'components/Education/model';
import { EmploymentType } from 'components/Employment/model';
import { AvailabilityType } from 'components/Availability/model';
import { InstrumentsType } from 'components/Instruments/model';
import {
  LessonSizeType,
  AgeGroupType
} from 'components/JobPreferences/model';
import { QualificationsType } from 'components/Qualifications/model';

export interface InstructorType {
  userId?: number;
  bioTitle?: string;
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
}

export interface Rates {
  [x: string]: string;
}

export interface Instructor {
  age?: number;
  avatar?: string | null;
  bioDescription?: string | null;
  bioTitle?: string | null;
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
  backgroundCheck?: boolean;
  address?: string;
}

export interface InstructorState {
  instructor: InstructorType;
  instructors: ListResource<Instructor>;
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
    fetchInstructor: ActionStatus;
  };
}

export const defaultInstructorState: InstructorState = {
  instructor: {
    userId: 0,
  },
  instructors: {
    count: 0,
    previous: '',
    next: '',
    results: []
  },
  actions: {
    buildProfile: {
      isRequesting: false,
      error: '',
    },
    buildJobPreferences: {
      isRequesting: false,
      error: '',
    },
    fetchProfile: {
      isRequesting: false,
      error: '',
    },
    addEducation: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchEducation: {
      isRequesting: false,
      error: '',
    },
    editEducation: {
      isRequesting: false,
      error: '',
      message: ''
    },
    deleteEducation: {
      isRequesting: false,
      error: '',
      message: ''
    },
    addEmployment: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchEmployment: {
      isRequesting: false,
      error: '',
    },
    editEmployment: {
      isRequesting: false,
      error: '',
      message: ''
    },
    deleteEmployment: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchInstructors: {
      isRequesting: false,
      error: ''
    },
    fetchInstructor: {
      isRequesting: false,
      error: ''
    }
  },
};
