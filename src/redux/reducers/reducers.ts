import { combineReducers } from 'redux';

import { StoreState } from './store';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './UserReducer';

const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['user', 'urlReferralToken', 'token']
};

/**
 * Combines redux reducers
 */
const rootReducer = combineReducers<StoreState>({
  user: persistReducer(userPersistConfig, userReducer)
});

export default rootReducer;
