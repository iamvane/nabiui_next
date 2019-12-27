import { History } from 'history';
import { createStore, applyMiddleware, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers';
import { UserState } from '../models/UserModel';
import { InstructorState } from '../models/InstructorModel';
import { defaultState } from '../models/defaultState';

const dev = process.env.NODE_ENV !== 'production';

export interface StoreState {
  user: UserState;
  instructor: InstructorState;
}

let history: History;
let store: Store<StoreState>;
let persistor;

/**
 * Store singleton from redux
 */
export const getStore = () => {
  if (store) {
    persistor = persistStore(store);
    return {
      store,
      persistor
    };
  }

  function makeStore(initialState: StoreState) {
    const middleware = [reduxThunk, routerMiddleware(history)];
    if (dev) {
      store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
      );
      return store
    }
    store = createStore<StoreState>(
      rootReducer,
      initialState,
      applyMiddleware(...middleware)
    );
    return store;
  }

  persistor = persistStore(makeStore(defaultState));
  return {
    makeStore,
    persistor
  };
};
