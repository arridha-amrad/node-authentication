import { AuthActionsType } from "../reduxTypes/AuthTypes";

export interface AuthState {
  loadingAuth: boolean;
  authMessage?: string;
  authErrors?: string;
  isAuthenticated: boolean;
  status?: boolean;
}

const initialState: AuthState = {
  loadingAuth: false,
  isAuthenticated: false,
  status: undefined,
  authMessage: undefined,
  authErrors: undefined,
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
        status: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        status: true,
        loadingAuth: false,
        isAuthenticated: true,
      };
    case "REGISTER_SUCCESS":
    case "FORGOT_PASSWORD_SUCCESS":
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        authMessage: action.payload,
        loadingAuth: false,
        status: true,
      };
    case "LOGIN_ERROR":
    case "REGISTER_FAILURE":
    case "FORGOT_PASSWORD_ERROR":
    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        authErrors: action.payload,
        loadingAuth: false,
        status: false,
      };
    case "CLEAR_AUTH_ERRORS":
      return {
        ...state,
        authErrors: undefined,
      };
    case "CLEAR_AUTH_MESSAGE":
      return {
        ...state,
        authMessage: undefined,
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
