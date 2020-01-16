import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { BookLessonsPayload } from '../../components/BookLessons/model';
import { getError } from '../../utils/handleApiErros';
import { ApiEndpoints } from '../../constants/apiEndpoints';
import {
  defaultApiError
} from '../../constants/apiConstants';
import { StoreState } from '../reducers/store';
import { RequestType } from '../models/RequestModel';

import { RequestActions } from './RequestActionTypes';
import {
  requestAction,
  withDataAction,
  withErrorAction,
} from './actions';

let errorMessage = defaultApiError;

export const createRequest = (data: RequestType): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.CREATE_REQUEST));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
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
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.FETCH_REQUESTS));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
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
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.FETCH_REQUEST));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
    const response = await axios.get(ApiEndpoints.requestItem + id, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    dispatch(withDataAction(RequestActions.FETCH_REQUEST_SUCCESS, response.data));
  } catch (e) {
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.FETCH_REQUEST_FAILURE, errorMessage));
  }
};

export const editRequestAsync = (id: number, data: RequestType): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.EDIT_REQUEST));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
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
    if (getError(e) && typeof getError(e) === 'string') {
      errorMessage = getError(e);
    }

    dispatch(withErrorAction(RequestActions.EDIT_REQUEST_FAILURE, errorMessage));
  }
};

export const deleteRequestAsnyc = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.DELETE_REQUEST));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
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
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.FETCH_REQUESTS_LIST));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
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


export const fetchApplicationList = (id: number): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>,
  getState
) => {
  const state = getState();
  const authToken = (state as StoreState).user.token;
  dispatch(requestAction(RequestActions.FETCH_APPLICATION_LIST));
  try {
    const response = await axios.get(`${ApiEndpoints.applicationList}${id}`, {
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
  dispatch: Dispatch<{}>,
  getState
) => {
  const state = getState();
  const authToken = (state as StoreState).user.token;
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
  dispatch: Dispatch<{}>,
  getState
) => {
  dispatch(requestAction(RequestActions.FETCH_BOOK_LESSONS_DATA));
  try {
    const state = getState();
    const authToken = (state as StoreState).user.token;
    const response = await axios.get(`${ApiEndpoints.bookLessonsData}${id}`, {
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
