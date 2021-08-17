export interface AuthData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  identity: string;
}

export type RegisterData = Pick<
  AuthData,
  "email" | "password" | "username" | "confirmPassword"
>;

export type LoginData = Pick<AuthData, "identity" | "password">;

export type ForgotPasswordData = Pick<AuthData, "email">;

export type ResetPasswordData = Pick<
  AuthData,
  "password" | "confirmPassword"
> & { token: string };
