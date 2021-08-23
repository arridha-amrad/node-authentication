import {
  ForgotPasswordData,
  LoginData,
  RegisterData,
  ResetPasswordData,
} from "../dto/AuthDTO";

export interface IValidatorResult<T> {
  errors?: Partial<T>;
  valid: boolean;
}

// const regExp_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const regExp_email =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

export type FieldsError<T> = Partial<Record<keyof T, string>>;

export const RegisterValidator = (
  options: RegisterData
): IValidatorResult<RegisterData> => {
  const { username, email, password, confirmPassword } = options;
  const errors: FieldsError<RegisterData> = {};
  if (username.length < 6) {
    errors.username = "username requires 6 characters or more";
  } else {
    delete errors.username;
  }
  if (!email.match(regExp_email)) {
    errors.email = "Please input your valid email";
  } else {
    delete errors.email;
  }
  // if (!password.match(regExp_password)) {
  //   errors.password =
  //     "password require at least 6 characters with combination uppercase, letter, and number";
  // } else {
  //   delete errors.password;
  // }
  if (confirmPassword !== password) {
    errors.confirmPassword = "password not match";
  } else {
    delete errors.confirmPassword;
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const LoginValidator = (
  options: LoginData
): IValidatorResult<LoginData> => {
  const errors: Partial<Record<keyof LoginData, string>> = {};
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
  options: ForgotPasswordData
): IValidatorResult<ForgotPasswordData> => {
  const errors: Partial<Record<keyof ForgotPasswordData, string>> = {};
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
  options: ResetPasswordData
): IValidatorResult<ResetPasswordData> => {
  const errors: Partial<Record<keyof ResetPasswordData, string>> = {};
  if (options.password !== options.confirmPassword) {
    errors.confirmPassword = "password not match";
  } else {
    delete errors.confirmPassword;
  }
  // else if (!options.password.match(regExp_password)) {
  //   errors.password =
  //     "password require at least 6 characters with combination uppercase, letter, and number";
  // }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
