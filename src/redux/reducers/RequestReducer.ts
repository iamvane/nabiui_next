import { AnyAction } from 'redux';

import { APIActions } from '../models/models';
import {
  defaultRequestState,
  RequestState,
  RequestType
} from '../models/RequestModel';
import { RequestActions } from '../actions/RequestActionTypes';

export default function requestsReducer(
  state: RequestState = defaultRequestState,
  action: AnyAction): RequestState {
  switch (action.type) {
    case RequestActions.CREATE_REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          createRequest: {
            ...state.actions.createRequest,
            isRequesting: true
          }
        }
      };

    case RequestActions.CREATE_REQUEST_SUCCESS:
      const {data: createdRequest} = <APIActions.WithData<Partial<RequestType>>> action;
      return {
        ...state,
        request: {
          ...state.request,
          ...createdRequest
        },
        requests: [
          ...state.requests, createdRequest as RequestType
        ],
        actions: {
          ...state.actions,
          createRequest: {
            ...state.actions.createRequest,
            isRequesting: false,
            error: ''
          }
        }
      };

    case RequestActions.CREATE_REQUEST_FAILURE:
      const { error: createRequestError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
        createRequest: {
            isRequesting: false,
            error: createRequestError
          }
        }
      };

    case RequestActions.FETCH_REQUESTS:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequests: {
            ...state.actions.createRequest,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_SUCCESS:
      const {data: requests} = action;
      return {
        ...state,
        requests,
        actions: {
          ...state.actions,
          fetchRequests: {
            ...state.actions.fetchRequests,
            isRequesting: false,
            error: ''
          }
        }
      };

    case RequestActions.FETCH_REQUESTS_FAILURE:
      const { error: fetchRequestsError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
        fetchRequests: {
            isRequesting: false,
            error: fetchRequestsError
          }
        }
      };

    case RequestActions.FETCH_REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchRequests: {
            ...state.actions.createRequest,
            isRequesting: true
          }
        }
      };

    case RequestActions.FETCH_REQUEST_SUCCESS:
      const {data: request} = action;
      return {
        ...state,
        request,
        actions: {
          ...state.actions,
          fetchRequest: {
            ...state.actions.fetchRequest,
            isRequesting: false,
            error: ''
          }
        }
      };

    case RequestActions.FETCH_REQUEST_FAILURE:
      const { error: fetchRequestError } = <APIActions.WithError<string>> action;
      return {
        ...state,
        actions: {
          ...state.actions,
        fetchRequest: {
            isRequesting: false,
            error: fetchRequestError
          }
        }
      };

      case RequestActions.EDIT_REQUEST:
        return {
          ...state,
          actions: {
            ...state.actions,
            editRequest: {
              ...state.actions.editRequest,
              isRequesting: true,
              message: ''
            }
          }
        };

      case RequestActions.EDIT_REQUEST_SUCCESS:
        const {data: editRequestMessage} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            editRequest: {
              ...state.actions.editRequest,
              isRequesting: false,
              error: '',
              message: editRequestMessage
            }
          }
        };

      case RequestActions.EDIT_REQUEST_FAILURE:
        const { error: editRequestError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
          editRequest: {
              isRequesting: false,
              error: editRequestError,
              message: ''
            }
          }
        };

      case RequestActions.DELETE_REQUEST:
        return {
          ...state,
          actions: {
            ...state.actions,
            deleteRequest: {
              ...state.actions.deleteRequest,
              isRequesting: true,
              message: ''
            }
          }
        };

      case RequestActions.DELETE_REQUEST_SUCCESS:
        const {data: deleteRequestMessage} = <APIActions.WithData<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
            deleteRequest: {
              ...state.actions.deleteRequest,
              isRequesting: false,
              error: '',
              message: deleteRequestMessage
            }
          }
        };

      case RequestActions.EDIT_REQUEST_FAILURE:
        const { error: deleteRequestError } = <APIActions.WithError<string>> action;
        return {
          ...state,
          actions: {
            ...state.actions,
          deleteRequest: {
              isRequesting: false,
              error: deleteRequestError,
              message: ''
            }
          }
        };

    default:
      return state;
  }
}