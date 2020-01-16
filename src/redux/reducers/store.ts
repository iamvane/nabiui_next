import { History } from "history";
import { createStore, applyMiddleware, Store } from "redux";
import reduxThunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";
import { UserState } from "../models/UserModel";
import { InstructorState } from "../models/InstructorModel";
import { RequestState } from "../models/RequestModel";
import { persistReducer } from "redux-persist";

const dev = process.env.NODE_ENV !== "production";

export interface StoreState {
  user: UserState;
  instructor: InstructorState;
  requests: RequestState;
  __PERSISTOR: any;
}

let history: History;
let store: any;
let persistor;

/**
 * Store singleton from redux
 */
export default (initialState: StoreState) => {
  const middleware = [reduxThunk, routerMiddleware(history)];
  const isClient = typeof window !== "undefined";

  if (dev || isClient) {
    const storage = require("redux-persist/lib/storage").default;
    const persistConfig = {
      key: "root",
      storage
    };
    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore<StoreState>(
      rootReducer,
      initialState,
      applyMiddleware(...middleware)
    );
  }
  return store;
};
