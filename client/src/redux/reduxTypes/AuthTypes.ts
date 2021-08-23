import { SetUserData } from "../../dto/AuthDTO";

export const LOADING_AUTH = "LOADING_AUTH";
export const CLEAR_AUTH_ERRORS = "CLEAR_AUTH_ERRORS";
export const CLEAR_AUTH_MESSAGE = "CLEAR_AUTH_MESSAGE";
export const SET_AUTH_MESSAGE = "SET_AUTH_MESSAGE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_ERROR";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const RESET_REQUEST_STATUS = "RESET_REQUEST_STATUS";
export const STOP_LOADING_AUTH = "STOP_LOADING_AUTH";

export type AuthActionsType =
  | { type: typeof REGISTER_SUCCESS; payload: string }
  | { type: typeof REGISTER_FAILURE; payload: string }
  | { type: typeof FORGOT_PASSWORD_SUCCESS; payload: string }
  | { type: typeof FORGOT_PASSWORD_ERROR; payload: string }
  | { type: typeof RESET_PASSWORD_SUCCESS; payload: string }
  | { type: typeof RESET_PASSWORD_ERROR; payload: string }
  | { type: typeof LOGIN_SUCCESS }
  | { type: typeof LOGIN_ERROR; payload: string }
  | { type: typeof CLEAR_AUTH_ERRORS }
  | { type: typeof CLEAR_AUTH_MESSAGE }
  | { type: typeof LOADING_AUTH }
  | { type: typeof STOP_LOADING_AUTH }
  | { type: typeof LOGOUT }
  | { type: typeof SET_USER_SUCCESS; payload: SetUserData }
  | { type: typeof SET_USER_FAILED }
  | { type: typeof SET_UNAUTHENTICATED }
  | { type: typeof SET_AUTHENTICATED }
  | { type: typeof RESET_REQUEST_STATUS };
