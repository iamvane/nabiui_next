import {
  ActionStatus,
  ActionStatusWithMessage
} from './models';
import { StudentDetailsType } from '../../components/Dashboard/ParentStudentDashboard/model';

export interface ParentType {
  userId?: string;
  students?: StudentDetailsType[];
}

export interface ParentState {
  parent: ParentType;
  actions: {
    addStudent: ActionStatusWithMessage;
    fetchStudents: ActionStatus;
    editStudent: ActionStatusWithMessage;
    deleteStudent: ActionStatusWithMessage;
  };
}

export const defaultParentState: ParentState = {
  parent: {},
  actions: {
    addStudent: {
      isRequesting: false,
      error: '',
      message: ''
    },
    fetchStudents: {
      isRequesting: false,
      error: '',
    },
    editStudent: {
      isRequesting: false,
      error: '',
      message: ''
    },
    deleteStudent: {
      isRequesting: false,
      error: '',
      message: ''
    }
  }
};
