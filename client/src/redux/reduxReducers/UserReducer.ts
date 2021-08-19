import { AnyAction } from "redux";
import * as types from "../reduxTypes/UserTypes";

export interface UserState {
  _id: string | null;
  createdAt: string | null;
  email: string | null;
  updatedAt: string | null;
  username: string | null;
  loadingUser: boolean;
  isActive: boolean;
  isLogin: boolean;
  isVerified: boolean;
}

const initialState: UserState = {
  loadingUser: false,
  _id: null,
  createdAt: null,
  email: null,
  isActive: false,
  isLogin: false,
  isVerified: false,
  updatedAt: null,
  username: null,
};

const UserReducer = (state = initialState, action: AnyAction): UserState => {
  switch (action.type) {
    case types.LOADING_USER:
      return {
        ...state,
        loadingUser: true,
      };
    case types.STOP_LOADING:
      return {
        ...state,
        loadingUser: false,
      };

    case types.SET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESET_USER:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default UserReducer;
