//import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserState } from "../models/UserModel";
import { InstructorState } from "../models/InstructorModel";
import { RequestState } from "../models/RequestModel";
import { TimezonesState } from '../models/TimeZonesModel';

import rootRouter from './reducers';

import {createStore,applyMiddleware, compose} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import thunk from "redux-thunk";


export interface State {
  tick: string;
}

export interface StoreState {
  user: UserState;
  instructor: InstructorState;
  requests: RequestState;
  timezones: TimezonesState;
}

/**
 * Store singleton from redux
 */

/*
export default () => {
  const middleware = [reduxThunk];

  return createStore(
    rootRouter,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};*/
const middleware = [thunk]
const makeStore = () => createStore(rootRouter, compose(applyMiddleware(...middleware)))

export const store   = createStore(
  rootRouter,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const wrapper = createWrapper(makeStore)


