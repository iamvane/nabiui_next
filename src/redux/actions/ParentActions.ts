import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { getError } from '../../utils/handleApiErros';
import {
  defaultApiError,
  unauthorizedError
} from '../../constants/apiConstants';
import { ApiEndpoints } from '../../constants/apiEndpoints';
import { getCookie } from '../../utils/cookies';
import { StudentDetailsType } from '../../components/Dashboard/ParentStudentDashboard/model';
import { ParentActions } from '../actions/ParentActionTypes';
import {
  requestAction,
  withDataAction,
  withErrorAction,
} from '../actions/actions';

// Default error message
let errorMessage = defaultApiError;
const authToken = getCookie('token');
/**
 * Action cretator to add a student object
 */

export const addStudent = (
  student: StudentDetailsType
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
    dispatch(requestAction(ParentActions.ADD_STUDENT));
    try {
      const response = await axios.post(
        ApiEndpoints.students,
        student,
        {
          headers: { 'Authorization': `Bearer ${authToken}` }
        }
      );
      dispatch(withDataAction(ParentActions.ADD_STUDENT_SUCCESS, response.data));
    } catch (e) {
      if (getError(e) && typeof getError(e) === 'string') {
        errorMessage = getError(e);
      }

      dispatch(withErrorAction(ParentActions.ADD_STUDENT_FAILURE, errorMessage));
    }
  };

/**
 * Action cretator to fetch students
 */

export const fetchStudents = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(ParentActions.FETCH_STUDENTS));
  try {
    const response = await axios.get(
      ApiEndpoints.students,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

    dispatch(withDataAction(ParentActions.FETCH_STUDENTS_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(ParentActions.FETCH_STUDENTS_FAILURE, unauthorizedError));
  }
};

/**
 * Action cretator to edit a student object
 */
export const editStudent = (
  student: Partial<StudentDetailsType>
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(ParentActions.EDIT_STUDENT));
  try {
    const response = await axios.put(
      `${ApiEndpoints.students}${student.id}/`,
      student,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(withDataAction(ParentActions.EDIT_STUDENT_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(ParentActions.EDIT_STUDENT_FAILURE, errorMessage));
  }
};

/**
 * Action cretator to delete a student object
 */
export const deleteStudent = (
  id: number,
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(ParentActions.DELETE_STUDENT));
  try {
    const response = await axios.delete(
      `${ApiEndpoints.students}${id}/`,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(withDataAction(ParentActions.DELETE_STUDENT_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(ParentActions.DELETE_STUDENT_FAILURE, errorMessage));
  }
};
