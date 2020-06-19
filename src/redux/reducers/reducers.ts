import { combineReducers } from 'redux';

import { StoreState } from './store';
import userReducer from './UserReducer';
import requestsReducer from './RequestReducer';
import instructorReducer from './InstructorReducers';
import timezonesReducer from './TimezoneReducers';
/**
 * Combines redux reducers
 */
const rootReducer = combineReducers<StoreState>({
  user: userReducer,
  instructor: instructorReducer,
  requests: requestsReducer,
  timezones: timezonesReducer
});

export default rootReducer;
