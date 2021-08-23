import React from "react";
import { Link } from "react-router-dom";
import MyTextField from "../components/Form/MyTextField";
import { Button } from "../elements/button.element";
import { ForgotPassword, ForgotPasswordText } from "../elements/Input.element";
import UseFormAuth from "../utils/UseFormAuth";
import { LoginValidator } from "../validators/AuthValidator";
// import SocialLoginButton from "../components/Button/socialLoginBtn";
import { VSpacer } from "../elements/spacer.element";
import { login } from "../redux/reduxActions/AuthActions";
import FormWrapper from "../components/Form/FormWrapper";
import { FormLink } from "../elements/form.element";
import { LoginData } from "../dto/AuthDTO";

interface ChildComponentProps {}

const Login: React.FC<ChildComponentProps> = () => {
  document.title = "Login";

  const { states, handleSubmit, handleChange, errors, loadingAuth } =
    UseFormAuth<LoginData>(
      login,
      {
        identity: "",
        password: "",
      },
      LoginValidator
    );
  const { identity, password } = states;

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <MyTextField
          autofocus={true}
          label="username or email"
          type="identity"
          name="identity"
          value={identity}
          onChange={handleChange}
          error={errors?.identity}
        />
        <MyTextField
          label="password"
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
          disabled={identity === "" || password === "" || loadingAuth}
        >
          {loadingAuth ? "loading..." : "Login"}
        </Button>
        <ForgotPassword>
          <ForgotPasswordText as={Link} to="/forgot-password">
            forgot password
          </ForgotPasswordText>
        </ForgotPassword>
      </form>
      {/* <SocialLoginButton /> */}
      <FormLink>
        <span>
          Doesn't have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/register">
            register
          </Link>
        </span>
      </FormLink>
    </FormWrapper>
  );
};

export default Login;
