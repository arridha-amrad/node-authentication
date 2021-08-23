import { Dispatch } from "redux";
import { LOADING_USER, STOP_LOADING } from "../reduxTypes/UserTypes";
import axiosInstance from "../../utils/AxiosInterceptors";

export const meQuery = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_USER } as const);
  try {
    const res = await axiosInstance.get("/user/me");
    localStorage.setItem("user", res.data.success.username);
  } catch (err) {
    console.log(err.response);
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
