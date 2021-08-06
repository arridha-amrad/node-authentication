import { AnyAction } from "redux";
import { IUser } from "../actions/user/IUser";
import * as types from "../actions/user/user.types";

export interface UserState {
  loadingUser: boolean;
  user: IUser;
}

const initialState: UserState = {
  loadingUser: false,
  user: {
    _id: null,
    createdAt: null,
    email: null,
    isActive: false,
    isLogin: false,
    isVerified: false,
    updatedAt: null,
    username: null,
  },
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
        user: {
          ...state.user,
          ...action.payload,
        },
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
