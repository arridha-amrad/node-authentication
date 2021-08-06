import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { Login, Signup } from "./auth.interfaces";
import {
  IForgotPasswordState,
  ILoginState,
  IRegisterState,
  IResetPasswordState,
} from "../../../interfaces/auth.state.interfaces";
import { setAccessToken } from "../../../setAccessToken";
import {
  LOADING_AUTH,
  RegisterDispatch,
  CLEAR_AUTH_MESSAGE,
  CLEAR_AUTH_ERRORS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  LOGOUT,
} from "./auth.types";
import { RESET_USER } from "../user/user.types";
import axiosInstance from "../../../utils/axiosInterceptors";
import { meQuery } from "../user/user.action";

export const googleAuth =
  (tokenId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: LOADING_AUTH } as const);
    try {
      const res = await axiosInstance.post("/auth/googleAuth", { tokenId });
      dispatch({
        type: LOGIN_SUCCESS,
      } as const);
      // console.log(res.data)
      setAccessToken(res.data.success?.accessToken!);
      dispatch(meQuery());
    } catch (err) {
      console.log(err.response.data.errors.generic);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.errors.generic,
      } as const);
    }
  };

export const register =
  (formData: IRegisterState) =>
  async (dispatch: Dispatch<RegisterDispatch>) => {
    dispatch({ type: CLEAR_AUTH_MESSAGE } as const);
    dispatch({ type: CLEAR_AUTH_ERRORS } as const);
    dispatch({ type: LOADING_AUTH } as const);
    try {
      const res: AxiosResponse<Signup> = await axiosInstance.post(
        "/auth/register",
        formData
      );
      // console.log(res.data)
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.success!.message,
      } as const);
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: SIGNUP_ERROR,
        payload: err.response.data.errors.generic,
      } as const);
    }
  };

export const login =
  (formData: ILoginState) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: CLEAR_AUTH_MESSAGE } as const);
    dispatch({ type: CLEAR_AUTH_ERRORS } as const);
    dispatch({ type: LOADING_AUTH } as const);
    try {
      // const res = await fetch(url, options as any)
      const res: AxiosResponse<Login> = await axiosInstance.post(
        "/auth/login",
        formData
      );
      dispatch({
        type: LOGIN_SUCCESS,
      } as const);
      // console.log(res.data)
      setAccessToken(res.data.success?.accessToken!);
      dispatch(meQuery());
    } catch (err) {
      console.log(err.response.data.errors.generic);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.errors.generic,
      } as const);
    }
  };

export const forgotPassword =
  (formData: IForgotPasswordState) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: CLEAR_AUTH_MESSAGE } as const);
    dispatch({ type: CLEAR_AUTH_ERRORS } as const);
    dispatch({ type: LOADING_AUTH } as const);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", formData);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: res.data.success.message,
      });
    } catch (err) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: err.response.data.errors.generic,
      });
    }
  };

export const resetPassword =
  (formData: IResetPasswordState) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: CLEAR_AUTH_MESSAGE } as const);
    dispatch({ type: CLEAR_AUTH_ERRORS } as const);
    dispatch({ type: LOADING_AUTH } as const);
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${formData.token}`,
        { password: formData.password }
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data.success.message,
      });
    } catch (err) {
      console.log("Reset Password Error : ", err.response);
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: err.response.data.errors.generic,
      });
    }
  };

export const logout = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: LOADING_AUTH });
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
    dispatch({ type: RESET_USER });
    window.location.href = "/login";
  } catch (err) {
    console.log(err.response);
  }
};
