import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reduxReducers/AuthReducer";
import { MessageReducer } from "./reduxReducers/MessageReducer";
import UserReducer from "./reduxReducers/UserReducer";

const initialState = {};

const middleware = [thunkMiddleware];

const reducers = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  message: MessageReducer,
});

export type RootState = ReturnType<typeof reducers>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), composeEnhancers())
);

export default store;
