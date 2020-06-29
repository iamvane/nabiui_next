import { ActionStatus } from "./models";

export interface Timezone {
  name: string;
  offset: string;
  [x: string]: string;
}

export interface TimezonesState {
  timezones?: Timezone[];
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
