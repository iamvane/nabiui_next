import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { StoreState } from '../reducers/store';
import {
  unauthorizedError,
  defaultApiError
} from '../../constants/apiConstants';
import { getError } from '../../utils/handleApiErros';
import { ApiEndpoints } from '../../constants/apiEndpoints';
import { StudentDetailsType } from '../../components/Dashboard/StudentDashboard/model';
import { StudentActions } from './StudentsActionTypes';
import {
  requestAction,
  withDataAction,
  withErrorAction,
} from './actions';

let errorMessage = defaultApiError;

export const updateStudentDetails = (
  data: StudentDetailsType,
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
    dispatch(requestAction(StudentActions.UPDATE_STUDENT_DETAILS));
    try {
      const state = getState();
      const authToken = (state as StoreState).user.token;
      const response = await axios.put(
        ApiEndpoints.updateStudentDetail,
        data,
        {
          headers: { 'Authorization': `Bearer ${authToken}` }
        }
      );
      dispatch(withDataAction(StudentActions.UPDATE_STUDENT_DETAILS_SUCCESS, response.data));
    } catch (e) {
      if (getError(e) && typeof getError(e) === 'string') {
        errorMessage = getError(e);
      }

      dispatch(withErrorAction(StudentActions.UPDATE_STUDENT_DETAILS_FAILURE, errorMessage));
    }
  };

export const fetchStudentDetails = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(StudentActions.FETCH_STUDENT_DETAILS));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
    const response = await axios.get(
      ApiEndpoints.fetchStudentDetail,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
    dispatch(withDataAction(StudentActions.FETCH_STUDENT_DETAILS_SUCCESS, response.data));
  } catch (e) {
    dispatch(withErrorAction(StudentActions.FETCH_STUDENT_DETAILS_FAILURE, unauthorizedError));
  }
};
