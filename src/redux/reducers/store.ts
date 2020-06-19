import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserState } from "../models/UserModel";
import { InstructorState } from "../models/InstructorModel";
import { RequestState } from "../models/RequestModel";
import { TimezonesState } from '../models/TimeZonesModel';
import rootRouter from './reducers';

export interface StoreState {
  user: UserState;
  instructor: InstructorState;
  requests: RequestState;
  timezones: TimezonesState;
}

/**
 * Store singleton from redux
 */
export default () => {
  const middleware = [reduxThunk];

  return createStore<StoreState>(
    rootRouter,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};
