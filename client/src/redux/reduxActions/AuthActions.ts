import { Dispatch } from "redux";
import { setAccessToken } from "../../setAccessToken";
import { AuthActionsType } from "../reduxTypes/AuthTypes";
import axiosInstance from "../../utils/axiosInterceptors";
import { meQuery } from "./UserActions";
import {
  ForgotPasswordData,
  LoginData,
  RegisterData,
  ResetPasswordData,
} from "../../dto/AuthDTO";

const requiredDispatch = (dispatch: Dispatch<AuthActionsType>) => {
  dispatch({ type: "CLEAR_AUTH_ERRORS" });
  dispatch({ type: "CLEAR_AUTH_MESSAGE" });
  dispatch({ type: "RESET_REQUEST_STATUS" });
  dispatch({ type: "LOADING_AUTH" });
};

export const fetchLoginUser =
  () => async (dispatch: Dispatch<AuthActionsType>) => {
    requiredDispatch(dispatch);
    try {
      const result = await axiosInstance.get("/user/me");
      console.log("fetched login user : ", result.data);
      dispatch({
        type: "SET_USER_SUCCESS",
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: "SET_USER_FAILED",
      });
      console.log(error);
    }
  };

export const logout = () => async (dispatch: Dispatch<AuthActionsType>) => {
  dispatch({ type: "LOADING_AUTH" });
  try {
    await axiosInstance.post("/auth/logout");
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  } catch (err) {
    console.log(err.response);
  }
};

export const login =
  (loginData: LoginData) => async (dispatch: Dispatch<AuthActionsType>) => {
    requiredDispatch(dispatch);
    try {
      console.log("login data : ", loginData);
      // const res = await fetch(url, options as any)
      const res = await axiosInstance.post("/auth/login", loginData);
      console.log("login result", res);
      dispatch({
        type: "LOGIN_SUCCESS",
      });
    } catch (err) {
      console.log("login error", err.response.data.message);
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response.data.message,
      });
    }
  };

export const register =
  (registrationData: RegisterData) =>
  async (dispatch: Dispatch<AuthActionsType>): Promise<void> => {
    requiredDispatch(dispatch);
    try {
      const result = await axiosInstance.post(
        "/auth/register",
        registrationData
      );
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: result.data.data,
      });
    } catch (err) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: err.response.data.message,
      });
    }
  };

export const forgotPassword =
  (formData: ForgotPasswordData) =>
  async (dispatch: Dispatch<AuthActionsType>): Promise<void> => {
    requiredDispatch(dispatch);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", formData);
      dispatch({
        type: "FORGOT_PASSWORD_SUCCESS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "FORGOT_PASSWORD_ERROR",
        payload: err.response.data.message,
      });
    }
  };

export const resetPassword =
  (formData: ResetPasswordData) =>
  async (dispatch: Dispatch<AuthActionsType>) => {
    requiredDispatch(dispatch);
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${formData.token}`,
        { password: formData.password }
      );
      dispatch({
        type: "RESET_PASSWORD_SUCCESS",
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: "RESET_PASSWORD_ERROR",
        payload: err.response.data.message,
      });
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
