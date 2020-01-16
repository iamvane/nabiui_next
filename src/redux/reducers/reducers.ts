import { combineReducers } from 'redux';

import { StoreState } from './store';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import userReducer from './UserReducer';
import requestsReducer from './RequestReducer';
import instructorReducer from './InstructorReducers';

// const userPersistConfig = {
//   key: 'user',
//   storage: storage,
//   whitelist: ['user', 'urlReferralToken', 'token']
// };

/**
 * Combines redux reducers
 */
const rootReducer = combineReducers<StoreState>({
  user: userReducer,
  instructor: instructorReducer,
  requests: requestsReducer
});

export default rootReducer;
