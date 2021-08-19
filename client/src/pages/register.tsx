import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyTextField from "../components/Form/MyTextField";
import { Button } from "../elements/button.element";
import { FormLink } from "../elements/form.element";
import UseFormAuth from "../utils/UseFormAuth";
import { RegisterValidator } from "../validators/AuthValidator";
import SocialLoginButton from "../components/Button/socialLoginBtn";
import { VSpacer } from "../elements/spacer.element";
import { register } from "../redux/reduxActions/AuthActions";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import FormWrapper from "../components/Form/FormWrapper";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
} from "../redux/reduxTypes/AuthTypes";
import { RegisterData } from "../dto/AuthDTO";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  document.title = "Register";
  const { states, handleSubmit, handleChange, errors, loadingAuth } =
    UseFormAuth<RegisterData>(
      register,
      {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      RegisterValidator
    );

  const { username, email, password, confirmPassword } = states;

  useEffect(() => {
    store.dispatch({ type: CLEAR_AUTH_ERRORS });
    store.dispatch({ type: CLEAR_AUTH_MESSAGE });
  }, []);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <MyTextField
          autofocus={true}
          label="username"
          type="username"
          name="username"
          value={username}
          onChange={handleChange}
          error={errors?.username}
        />
        <MyTextField
          label="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={errors?.email}
        />
        <MyTextField
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          error={errors?.password}
        />
        <MyTextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
        />
        <VSpacer />
        <Button
          aa_isFullWidth
          aa_color="#fff"
          aa_bg="#9c27b0"
          aa_height="50px"
          disabled={
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            loadingAuth
          }
        >
          {loadingAuth ? "loading..." : "Register"}
        </Button>
      </form>
      <SocialLoginButton loadingAuth={loadingAuth} />
      <FormLink>
        <span>
          already have account?{" "}
          <Link style={{ textDecoration: "none" }} to="/login">
            login
          </Link>
        </span>
      </FormLink>
    </FormWrapper>
  );
};

export default Register;
