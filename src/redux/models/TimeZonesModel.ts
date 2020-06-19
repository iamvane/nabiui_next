import { ActionStatus } from "./models";

export interface TimezonesState {
  timezones?: object[];
  actions: {
    fetchTimezones: ActionStatus;
  };
}

export const defaultTimezoneState: TimezonesState = {
  timezones: [],
  actions: {
    fetchTimezones: {
      isRequesting: false,
      error: ""
    },
  }
};
