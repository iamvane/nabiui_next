// import {applyMiddleware, createStore} from 'redux';
// import reduxThunk from "redux-thunk";
// import Cookies from 'js-cookie';
// import { History } from "history";
// import reducers from './reducers';

// const SET_CLIENT_STATE = 'SET_CLIENT_STATE';

// export const reducer = (state, {type, payload}) => {
//     if (type === SET_CLIENT_STATE) {
//         return {
//             ...state,
//             fromClient: payload
//         };
//     }
//     return state;
// };


// const middleware = [reduxThunk];

// const makeConfiguredStore = (reducer, initialState) =>
//     createStore(reducer, initialState, applyMiddleware(...middleware));

// export const makeStore = (initialState, {isServer, req, debug, storeKey}) => {

//     if (isServer) {

//         initialState = initialState || {fromServer: 'foo'};

//         return makeConfiguredStore(reducers, initialState);

//     } else {

//         // we need it only on client side
//         const {persistStore, persistReducer} = require('redux-persist');
//         const storage = require('redux-persist/lib/storage').default;

//         const persistConfig = {
//             key: 'nextjs',
//             whitelist: ['fromClient'], // make sure it does not clash with server keys
//             storage
//         };

//         const persistedReducer = persistReducer(persistConfig, reducers);
//         const store = makeConfiguredStore(persistedReducer, initialState);

//         (store as any).__PERSISTOR = persistStore(store); // Nasty hack

//         return store;
//     }
// };

// export const setClientState = (clientState) => ({
//     type: SET_CLIENT_STATE,
//     payload: clientState
// });

// import { History } from "history";
// import { createStore, applyMiddleware, Store } from "redux";
// import reduxThunk from "redux-thunk";
// import { routerMiddleware } from "react-router-redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { persistStore, persistReducer } from "redux-persist";
// import { CookieStorage } from 'redux-persist-cookie-storage';
// import Cookies from 'js-cookie'

// import rootReducer from "./reducers";
// import { UserState } from "../models/UserModel";
// import { InstructorState } from "../models/InstructorModel";
// import { RequestState } from "../models/RequestModel";

// const dev = process.env.NODE_ENV !== "production";

// let history: History;
// let store: any;
// let persistor;

// /**
//  * Store singleton from redux
//  */
// export default (initialState: StoreState) => {
//   const middleware = [reduxThunk, routerMiddleware(history)];
//   const isClient = typeof window !== "undefined";

//   if (dev || isClient) {
//     const persistConfig = {
//       key: "root",
//       storage: new CookieStorage(Cookies, )
//     };
//     store = createStore(
//       persistReducer(persistConfig, rootReducer),
//       initialState,
//       composeWithDevTools(applyMiddleware(...middleware))
//     );
//     store.__PERSISTOR = persistStore(store);
//   } else {
//     store = createStore<StoreState>(
//       rootReducer,
//       initialState,
//       applyMiddleware(...middleware)
//     );
//   }
//   return store;
// };

// import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { CookieStorage } from 'redux-persist-cookie-storage';
// import reduxThunk from "redux-thunk";
// import Cookies from 'js-cookie';
// import { History } from "history";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserState } from "../models/UserModel";
import { InstructorState } from "../models/InstructorModel";
import { RequestState } from "../models/RequestModel";
import rootRouter from './reducers';

export interface StoreState {
  user: UserState;
  instructor: InstructorState;
  requests: RequestState;
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


