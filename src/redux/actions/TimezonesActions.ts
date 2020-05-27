
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios  from 'axios';

import { defaultApiError } from '../../constants/apiConstants';
import { getError } from '../../utils/handleApiErros';
import { ApiEndpoints } from '../../constants/apiEndpoints';
import { getCookie } from '../../utils/cookies';

import { TimezonesActions } from '../actions/TimezonesActionType';

import {
  requestAction,
  withDataAction,
  withErrorAction,
} from './actions';

// Default error message
let errorMessage = defaultApiError;
const authToken = getCookie('token');

export const fetchTimezones = (): ThunkAction<Promise<void>, {}, {}> => async (
  dispatch: Dispatch<{}>
) => {
  dispatch(requestAction(TimezonesActions.FETCH_TIMEZONES));
  try {
    const response = await axios.get(ApiEndpoints.timezone, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    dispatch(
      withDataAction(TimezonesActions.FETCH_TIMEZONES_SUCCESS, response.data)
    );
  } catch (e) {
    errorMessage = getError(e);

    dispatch(
      withErrorAction(TimezonesActions.FETCH_TIMEZONES_FAILURE, errorMessage)
    );
  }
};