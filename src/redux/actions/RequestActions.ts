import { Action } from 'redux';
import { RequestActions } from 'redux/actions/RequestActionTypes';
import { RequestType } from 'components/Request/models';

interface CreateRequests extends Action {
  requests: RequestType[];
}

/**
 * Action creator for create a request
 */
export function createRequests(requests: RequestType[]): CreateRequests {
  return {
    requests,
    type: RequestActions.CREATE_REQUESTS
  };
}

/**
 * Action creator for fetch a request
 */
export function fetchRequest(id: number) {
  return {
    type: RequestActions.FETCH_REQUEST,
    data: id
  };
}
