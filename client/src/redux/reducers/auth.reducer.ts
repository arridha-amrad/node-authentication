import { AnyAction } from "redux";
import {
  LOADING_AUTH,
  SET_AUTH_MESSAGE,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR,
  LOGOUT,
} from "../actions/auth/auth.types";

export interface AuthState {
  loadingAuth: boolean;
  authMessage: string | null;
  authErrors: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loadingAuth: false,
  authMessage: null,
  authErrors: null,
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case LOADING_AUTH:
      return {
        ...state,
        loadingAuth: true,
      };
    case SET_AUTH_MESSAGE:
      return {
        ...state,
        authMessage: action.payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authMessage: action.payload,
        loadingAuth: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loadingAuth: false,
        isAuthenticated: true,
      };
    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      return {
        ...state,
        loadingAuth: false,
        authErrors: action.payload,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        authErrors: null,
      };
    case CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        authMessage: null,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        loadingAuth: false,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        loadingAuth: false,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default AuthReducer;
