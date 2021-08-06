export interface ILoginState {
  identity: string;
  password: string;
}

export interface IRegisterState {
  username: string;
  email: string;
  password: string;
}

export interface IForgotPasswordState {
  email: string;
}

export interface IResetPasswordState {
  password: string;
  token?: string;
}
