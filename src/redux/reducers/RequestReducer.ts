import { AnyAction } from 'redux';
import {
  defaultRequestsState,
  RequestsState
} from '../../components/Request/models';
import { RequestActions } from '../actions/RequestActionTypes';

export default function requestsReducer(
  state: RequestsState = defaultRequestsState,
  action: AnyAction): RequestsState {
  switch (action.type) {
    case RequestActions.CREATE_REQUESTS:
      return {
        ...state,
        requests: action.requests
      };

    case RequestActions.FETCH_REQUEST:
      const request = defaultRequestsState.requests.find(x => x.id === action.data);
      return {
        ...state,
        request
      };

    default:
      return state;
  }
}
