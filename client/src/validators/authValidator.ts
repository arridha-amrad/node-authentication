import {
  ILoginState,
  IRegisterState,
} from "../interfaces/auth.state.interfaces";
import { IForgotPasswordField } from "../pages/forgot-password";
import { IResetPasswordField } from "../pages/reset-password";

export interface IFieldError {
  username?: string;
  email?: string;
  password?: string;
  identity?: string;
}
export interface IValidatorResult {
  errors?: IFieldError;
  valid: boolean;
}

const errors: IFieldError = {};

export const SignupValidator = (options: IRegisterState): IValidatorResult => {
  const { username, email, password } = options;
  if (username.length < 6) {
    errors.username = "username requires 6 characters or more";
  } else {
    delete errors["username"];
  }

  const regExp_email = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if (!email.match(regExp_email)) {
    errors.email = "Please input your valid email";
  } else {
    delete errors.email;
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  } else {
    delete errors.password;
  }

  // const regExp_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // if (!password.match(regExp_password)) {
  //   errors.password =
  //     "Password require at least 6 characters with combination uppercase, letter, number and special character";
  // } else {
  //   delete errors.password;
  // }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const LoginValidator = (options: ILoginState): IValidatorResult => {
  if (options.identity.trim() === "") {
    errors.identity = "please input username or password";
  } else {
    delete errors.identity;
  }
  if (options.password.trim() === "") {
    errors.password = "password is required";
  } else {
    delete errors.password;
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const ForgotPasswordValidator = (
  options: IForgotPasswordField
): IValidatorResult => {
  if (options.email.trim() === "") {
    errors.email = "Please enter your email";
  } else {
    delete errors.email;
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const ResetPasswordValidator = (
  options: IResetPasswordField
): IValidatorResult => {
  const regExp_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // if (!options.password.match(regExp_password)) {
  if (options.password.trim() === "") {
    errors.password =
      "password require at least 6 characters with combination uppercase, letter, number and special character";
  } else {
    delete errors.password;
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
