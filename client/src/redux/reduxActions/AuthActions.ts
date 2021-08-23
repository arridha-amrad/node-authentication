import { Dispatch } from "redux";
import { setAccessToken } from "../../setAccessToken";
import { AuthActionsType } from "../reduxTypes/AuthTypes";
import axiosInstance from "../../utils/AxiosInterceptors";
import { meQuery } from "./UserActions";
import {
  ForgotPasswordData,
  LoginData,
  RegisterData,
  ResetPasswordData,
} from "../../dto/AuthDTO";
import * as messageActions from "../reduxReducers/MessageReducer";
import { Dispatch as ReactDispatch } from "react";

const dispatchRequiredActions = (dispatch: Dispatch<AuthActionsType>) => {
  dispatch({ type: "RESET_REQUEST_STATUS" });
  dispatch({ type: "LOADING_AUTH" });
};

const dispatchMessage = (
  dispatch: ReactDispatch<any>,
  message: string,
  type: messageActions.MessageTypes
) => {
  dispatch(messageActions.setMessage(message, type));
};

export const logout = () => async (dispatch: Dispatch<AuthActionsType>) => {
  dispatchRequiredActions(dispatch);
  try {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("data");
    dispatch({ type: "LOGOUT" });
  } catch (err) {
    console.log(err.response);
  }
};

export const login =
  (loginData: LoginData) => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatchRequiredActions(dispatch);
    try {
      await axiosInstance.post("/auth/login", loginData);
      dispatch({
        type: "LOGIN_SUCCESS",
      });
      localStorage.setItem("data", "login");
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
      dispatchMessage(dispatch, err.response.data.message, "danger");
    }
  };

export const register =
  (registrationData: RegisterData) =>
  async (dispatch: Dispatch<AuthActionsType>): Promise<void> => {
    dispatchRequiredActions(dispatch);
    try {
      const res = await axiosInstance.post("/auth/register", registrationData);
      dispatch({
        type: "AUTH_SUCCESS",
      });
      dispatchMessage(dispatch, res.data.data, "success");
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
      dispatchMessage(dispatch, err.response.data.message, "danger");
    }
  };

export const forgotPassword =
  (formData: ForgotPasswordData) =>
  async (dispatch: Dispatch<AuthActionsType>): Promise<void> => {
    dispatchRequiredActions(dispatch);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", formData);
      dispatch({
        type: "AUTH_SUCCESS",
      });
      dispatchMessage(dispatch, res.data.data, "success");
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
      dispatchMessage(dispatch, err.response.data.message, "danger");
    }
  };

export const resetPassword =
  (formData: ResetPasswordData) =>
  async (dispatch: Dispatch<AuthActionsType>) => {
    dispatchRequiredActions(dispatch);
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${formData.token}`,
        { password: formData.password }
      );
      dispatch({
        type: "AUTH_SUCCESS",
      });
      dispatchMessage(dispatch, res.data.data, "success");
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
      dispatchMessage(dispatch, err.response.data.message, "danger");
    }
  };

export const googleAuth =
  (tokenId: string) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await axiosInstance.post("/auth/googleAuth", { tokenId });
      dispatch({
        type: "LOGIN_SUCCESS",
      } as const);
      // console.log(res.data)
      setAccessToken(res.data.success?.accessToken!);
      dispatch(meQuery());
    } catch (err) {
      console.log(err.response.data.errors.generic);
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response.data.errors.generic,
      } as const);
    }
  };
