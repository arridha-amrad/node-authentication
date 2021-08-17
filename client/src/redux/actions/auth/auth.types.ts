import { SetUserSuccess } from "../user/user.types";

export const LOADING_AUTH = "LOADING_AUTH";
export type LoadingAuth = {
  readonly type: "LOADING_AUTH";
};

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export type RegisterSuccess = {
  readonly type: "SIGNUP_SUCCESS";
  readonly payload: string;
};

export const SIGNUP_ERROR = "SIGNUP_ERROR";
export type RegisterError = {
  readonly type: "SIGNUP_ERROR";
  readonly payload: string;
};

export const CLEAR_AUTH_ERRORS = "CLEAR_AUTH_ERRORS";
export type ClearAuthError = {
  readonly type: "CLEAR_AUTH_ERRORS";
};

export const CLEAR_AUTH_MESSAGE = "CLEAR_AUTH_MESSAGE";
export type ClearAuthMessage = {
  readonly type: "CLEAR_AUTH_MESSAGE";
};

export const SET_AUTH_MESSAGE = "SET_AUTH_MESSAGE";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LoginSuccess = {
  readonly type: "LOGIN_SUCCESS";
};

export const LOGIN_ERROR = "LOGIN_ERROR";
export type LoginError = {
  readonly type: "LOGIN_ERROR";
  readonly payload: string;
};

export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";

export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export type SetAuthenticated = {
  readonly type: "SET_AUTHENTICATED";
};

export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export type SetUnAuthenticated = {
  readonly type: "SET_UNAUTHENTICATED";
  readonly payload: boolean;
};

export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_ERROR";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_SUCCESS";

export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const LOGOUT = "LOGOUT";

type DefaultDispatch = LoadingAuth | ClearAuthMessage | ClearAuthError;

export type RegisterDispatch =
  | DefaultDispatch
  | RegisterSuccess
  | RegisterError;

export type LoginDispatch =
  | DefaultDispatch
  | LoginSuccess
  | LoginError
  | SetUserSuccess
  | SetAuthenticated;

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const SET_REQUEST_STATUS = "SET_REQUEST_STATUS";
