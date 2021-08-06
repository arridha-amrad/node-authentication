import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyTextField from "../components/Form/MyTextField";
import { Button } from "../elements/button.element";
import { FormLink } from "../elements/form.element";
import UseFormAuth from "../utils/UseFormAuth";
import { SignupValidator } from "../validators/authValidator";
import SocialLoginButton from "../components/Button/socialLoginBtn";
import { VSpacer } from "../elements/spacer.element";
import { register } from "../redux/actions/auth/auth.actions";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import FormWrapper from "../components/Form/FormWrapper";
import { IRegisterState } from "../interfaces/auth.state.interfaces";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
} from "../redux/actions/auth/auth.types";

interface RegsiterProps {}

const Regsiter: React.FC<RegsiterProps> = () => {
  document.title = "Register";
  const {
    states,
    handleSubmit,
    handleChange,
    errors,
  } = UseFormAuth<IRegisterState>(
    register,
    {
      email: "",
      username: "",
      password: "",
    },
    SignupValidator
  );

  const { loadingAuth } = useSelector((state: RootState) => state.auth);
  const { username, email, password } = states;

  useEffect(() => {
    store.dispatch({ type: CLEAR_AUTH_ERRORS });
    store.dispatch({ type: CLEAR_AUTH_MESSAGE });
  }, []);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <MyTextField
          autofocus={true}
          type="username"
          name="username"
          value={username}
          onChange={handleChange}
          error={errors?.username}
        />
        <MyTextField
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={errors?.email}
        />
        <MyTextField
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          error={errors?.password}
        />
        <VSpacer />
        <Button
          aa_isFullWidth
          aa_color="#fff"
          aa_bg="#9c27b0"
          aa_height="50px"
          disabled={
            username === "" || email === "" || password === "" || loadingAuth
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

export default Regsiter;
