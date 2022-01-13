import { AuthActionsType } from "../types/AuthTypes";

export interface AuthenticatedUserData {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarURL: string;
}

export interface AuthState {
  isLoadingAuth: boolean;
  isAuthenticated: boolean;
  authenticatedUser: AuthenticatedUserData | null;
}

const initialState: AuthState = {
  isLoadingAuth: false,
  isAuthenticated: false,
  authenticatedUser: null,
};

export default function AuthReducer(
  state = initialState,
  action: AuthActionsType
): AuthState {
  switch (action.type) {
    case "STOP_LOADING_AUTH":
      return {
        ...state,
        isLoadingAuth: false,
      };
    case "LOADING_AUTH":
      return {
        ...state,
        isLoadingAuth: true,
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "AUTHENTICATED_USER_DATA":
      return {
        ...state,
        authenticatedUser: action.payload,
      };
    case "RESET_AUTH_USER":
    default:
      return state;
  }
}
