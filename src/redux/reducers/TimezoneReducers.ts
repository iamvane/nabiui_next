import { AnyAction } from "redux";

import { APIActions } from "../models/models";
import {
  defaultTimezoneState,
  TimezonesState,
} from "../models/TimeZonesModel";
import { TimezonesActions } from "../actions/TimezonesActionType";

export default function instructorReducer(
  state: TimezonesState = defaultTimezoneState,
  action: AnyAction
): TimezonesState {
  switch (action.type) {
    case TimezonesActions.FETCH_TIMEZONES:
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchTimezones: {
            ...state.actions.fetchTimezones,
            isRequesting: true
          }
        }
      };

    case TimezonesActions.FETCH_TIMEZONES_SUCCESS:
      const { data: timezones } = action;
      return {
        ...state,
        timezones,
        actions: {
          ...state.actions,
          fetchTimezones: {
            ...state.actions.fetchTimezones,
            isRequesting: false,
            error: ""
          }
        }
      };

    case TimezonesActions.FETCH_TIMEZONES_FAILURE:
      const { error: fetchTimezonesError } = <APIActions.WithError<string>>(
        action
      );
      return {
        ...state,
        actions: {
          ...state.actions,
          fetchTimezones: {
            isRequesting: false,
            error: fetchTimezonesError
          }
        }
      };

    default:
      return state;
  }
}
