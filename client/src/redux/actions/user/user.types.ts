import { SetAuthenticated } from "../auth/auth.types";
import { IUser } from "./IUser";

export const LOADING_USER = "LOADING_USER";
export type LoadingUser = {
  readonly type: "LOADING_USER";
};

export const STOP_LOADING = "STOP_LOADING";
export type StopLoading = {
  readonly type: "STOP_LOADING";
};

export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export type SetUserSuccess = {
  readonly type: "SET_USER_SUCCESS";
  readonly payload: IUser;
};

export const RESET_USER = "RESET_USER";

export type MeDispatch =
  | LoadingUser
  | SetUserSuccess
  | SetAuthenticated
  | StopLoading;
