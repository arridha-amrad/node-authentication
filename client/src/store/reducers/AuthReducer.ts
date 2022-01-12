import { AuthActionsType } from "../types/AuthTypes";

export interface AuthenticatedUserData {
   id: string
   email: string
   username: string
   fullName: string
   avatarURL: string
}

export interface AuthState {
   loadingAuth: boolean;
   isAuthenticated: boolean;
   authenticatedUser: AuthenticatedUserData | null;
}

const initialState: AuthState = {
   loadingAuth: false,
   isAuthenticated: false,
   authenticatedUser: null
}

export default function AuthReducer(
   state = initialState,
   action: AuthActionsType
): AuthState {
   switch (action.type) {
      case "LOADING_AUTH":
         return {
            ...state,
            loadingAuth: true
         }
      case "SET_AUTHENTICATED":
         return {
            ...state,
            isAuthenticated: true
         }
      case "SET_UNAUTHENTICATED":
         return {
            ...state,
            isAuthenticated: false
         }
      case "AUTHENTICATED_USER_DATA":
         return {
            ...state,
            authenticatedUser: action.payload
         }
      default:
         return state;
   }
}