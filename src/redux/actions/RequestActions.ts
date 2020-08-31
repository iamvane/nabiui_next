import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { getError } from '../../utils/handleApiErros';
import { ApiEndpoints } from '../../constants/apiEndpoints';
import { defaultApiError } from '../../constants/apiConstants';
import { getCookie } from '../../utils/cookies';
import { RequestType } from '../models/RequestModel';
import {
  BookLessonsPayload,
  LessonType,
} from '../../components/BookLessons/model';
import { StudentDetailsType } from '../../components/Dashboard/ParentStudentDashboard/model';
import { RequestActions } from './RequestActionTypes';

import {
  requestAction,
  withDataAction,
  withErrorAction,
} from './actions';

let errorMessage = defaultApiError;
const authToken = getCookie('token');

export const createRequest = (data: RequestType): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.CREATE_REQUEST));
  try {
    const response = await axios.post(
      ApiEndpoints.lessonRequest,
      data,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    dispatch(withDataAction(RequestActions.CREATE_REQUEST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.CREATE_REQUEST_FAILURE, errorMessage));
  }
};

export const fetchRequests = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_REQUESTS));
  try {
    const response = await axios.get(ApiEndpoints.lessonRequest, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    dispatch(withDataAction(RequestActions.FETCH_REQUESTS_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.FETCH_REQUESTS_FAILURE, errorMessage));
  }
};

export const fetchRequest = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_REQUEST));
  try {
    const response = await axios.get(ApiEndpoints.requestItem + id + '/', {});

    dispatch(withDataAction(RequestActions.FETCH_REQUEST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.FETCH_REQUEST_FAILURE, errorMessage));
  }
};

export const editRequestAsync = (id: number, data: RequestType): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.EDIT_REQUEST));
  try {
    const response = await axios.put(
      `${ApiEndpoints.lessonRequest}${id}/`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

    dispatch(withDataAction(RequestActions.EDIT_REQUEST_SUCCESS, response.data));
  } catch (e) {
    const errorMessage = getError(e);
    dispatch(withErrorAction(RequestActions.EDIT_REQUEST_FAILURE, errorMessage));
  }
};

export const deleteRequestAsnyc = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.DELETE_REQUEST));
  try {
    const response = await axios.delete(`${ApiEndpoints.lessonRequest}${id}/`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    dispatch(withDataAction(RequestActions.DELETE_REQUEST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.DELETE_REQUEST_FAILURE, errorMessage));
  }
};

export const fetchRequestsList = (params?: any): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_REQUESTS_LIST));
  try {
    let config = {
      headers: authToken && { 'Authorization': `Bearer ${authToken}` },
      params: params && params
    };
    const response = await axios.get(ApiEndpoints.requestList, config);
    dispatch(withDataAction(RequestActions.FETCH_REQUESTS_LIST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(RequestActions.FETCH_REQUESTS_LIST_FAILURE, errorMessage));
  }
};

let requestsPageCounter = 2

export const fetchMoreRequestsList = (params?: any): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
) => {
  dispatch(requestAction(RequestActions.FETCH_MORE_REQUESTS_LIST));
  try {
    let config = {
      headers: authToken && { 'Authorization': `Bearer ${authToken}` },
      params: params && params
    };
    const response = await axios.get(`${ApiEndpoints.fetchMoreRequests}${String(requestsPageCounter)}`, config);
    requestsPageCounter++
    dispatch(withDataAction(RequestActions.FETCH_MORE_REQUESTS_LIST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(RequestActions.FETCH_MORE_REQUESTS_LIST_FAILURE, errorMessage));
  }
};

export const fetchApplicationList = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_APPLICATION_LIST));
  try {
    const response = await axios.get(`${ApiEndpoints.applicationList}${id}/`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    dispatch(withDataAction(RequestActions.FETCH_APPLICATION_LIST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(RequestActions.FETCH_APPLICATION_LIST_FAILURE, errorMessage));
  }
};

export const bookLessons = (data: BookLessonsPayload): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.BOOK_LESSONS));
  try {
    const response = await axios.post(
      ApiEndpoints.bookLessons,
      data,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    dispatch(withDataAction(RequestActions.BOOK_LESSONS_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.BOOK_LESSONS_FAILURE, errorMessage));
  }
};

export const fetchBookLessonsData = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_BOOK_LESSONS_DATA));
  try {
    const response = await axios.get(`${ApiEndpoints.bookLessonsData}${id}/`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    dispatch(withDataAction(RequestActions.FETCH_BOOK_LESSONS_DATA_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(RequestActions.FETCH_BOOK_LESSONS_DATA_FAILURE, errorMessage));
  }
};

export const fetchStudentsBookingData = (email: string): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_STUDENTS_BOOKING_DATA));
  try {
    const response = await axios.get(`${ApiEndpoints.studentsBookingData}${email}/`);
    dispatch(withDataAction(RequestActions.FETCH_STUDENTS_BOOKING_DATA_SUCCESS, response.data));
  } catch (e) {

    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.FETCH_STUDENTS_BOOKING_DATA_FAILURE, errorMessage));
  }
};

export const fetchStudentsBookingLessonsData = (id: number, email: string): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_STUDENTS_BOOKING_LESSONS_DATA));
  try {
    const response = await axios.get(`${ApiEndpoints.studentsBookingData}${email}/${id}/`);
    dispatch(withDataAction(RequestActions.FETCH_STUDENTS_BOOKING_LESSONS_DATA_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }
    dispatch(withErrorAction(RequestActions.FETCH_STUDENTS_BOOKING_LESSONS_DATA_FAILURE, errorMessage));
  }
};

export const chooseLessonPackage = (packageName: string, applicationId: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.CHOOSE_LESSON_PACKAGE));
  try {
    const response = await axios.post(
      ApiEndpoints.bookLessonsData + applicationId + '/',
      {package: packageName},
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    dispatch(withDataAction(RequestActions.CHOOSE_LESSON_PACKAGE_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.CHOOSE_LESSON_PACKAGE_FAILURE, errorMessage));
  }
};

export const scheduleLesson = (data: Partial<LessonType>): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.SCHEDULE_LESSONS));
  try {
    let response;
    const lessonId = getCookie("lessonId");
    if (lessonId && lessonId !== undefined) {
      response = await axios.put(
        ApiEndpoints.scheduleLesson + lessonId + '/',
        data,
        {
          headers: { 'Authorization': `Bearer ${authToken}` }
        }
      );
    } else {
      response = await axios.post(
        ApiEndpoints.scheduleLesson,
        data,
        {
          headers: { 'Authorization': `Bearer ${authToken}` }
        }
      );
      dispatch(withDataAction(RequestActions.SCHEDULE_LESSONS_SUCCESS, response.data));
    }
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.SHCEDULE_LESSONS_FAILURE, errorMessage));
  }
};

export const createStudent = (
  student: Partial<StudentDetailsType>
): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.CREATE_STUDENT));
  try {
    const response = await axios.post(
      `${ApiEndpoints.students}`,
      student,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(withDataAction(RequestActions.CREATE_STUDENT_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.CREATE_STUDENT_FAILURE, errorMessage));
  }
};

export const fetchStudents = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.FETCH_STUDENTS));
  try {
    const response = await axios.get(
      `${ApiEndpoints.students}`,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );

    dispatch(withDataAction(RequestActions.FETCH_STUDENTS_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.FETCH_STUDENTS_FAILURE, errorMessage));
  }
};

export const deleteStudent = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(RequestActions.DELETE_STUDENT));
  try {
    const response = await axios.delete(`${ApiEndpoints.students}${id}/`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    dispatch(withDataAction(RequestActions.DELETE_STUDENT_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.DELETE_STUDENT_FAILURE, errorMessage));
  }
};
