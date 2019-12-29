import {
  ActionStatus,
  ActionStatusWithMessage
} from './models';
import { StudentDetailsType } from '../../components/Dashboard/StudentDashboard/model';

export interface StudentState {
  userId?: number;
  studentDetails: StudentDetailsType;
  actions: {
    updateStudentDetails: ActionStatusWithMessage;
    fetchStudentDetails: ActionStatus;
  };
}

export const defaultStudentState: StudentState = {
  userId: 0,
  studentDetails: {
    instrument: '',
    skillLevel: '',
    lessonDuration: '',
    lessonPlace: '',
  },
  actions: {
    updateStudentDetails: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchStudentDetails: {
      isRequesting: false,
      error: ''
    }
  },
};
