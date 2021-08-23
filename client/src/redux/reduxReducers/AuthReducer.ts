import { AuthActionsType } from "../reduxTypes/AuthTypes";

export interface AuthState {
  loadingAuth: boolean;
  isAuthenticated: boolean;
  requestStatus?: boolean;
}

const initialState: AuthState = {
  loadingAuth: false,
  isAuthenticated: false,
  requestStatus: undefined,
};

const AuthReducer = (
  state = initialState,
  action: AuthActionsType
): AuthState => {
  switch (action.type) {
    case "STOP_LOADING_AUTH":
      return {
        ...state,
        loadingAuth: false,
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
        loadingAuth: false,
      };
    case "LOADING_AUTH":
      return {
        ...state,
        loadingAuth: true,
      };
    case "RESET_REQUEST_STATUS":
      return {
        ...state,
        requestStatus: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        requestStatus: true,
        loadingAuth: false,
        isAuthenticated: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        loadingAuth: false,
        requestStatus: true,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        loadingAuth: false,
        requestStatus: false,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default AuthReducer;
