import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyTextField from "../components/Form/MyTextField";
import { Button } from "../elements/button.element";
import { ForgotPassword, ForgotPasswordText } from "../elements/Input.element";
import {
  Form,
  FormContainer,
  FormFooter,
  FormLink,
  FormTitle,
} from "../elements/form.element";
import UseFormAuth from "../utils/UseFormAuth";
import { LoginValidator } from "../validators/authValidator";
import SocialLoginButton from "../components/Button/socialLoginBtn";
import { VSpacer } from "../elements/spacer.element";
import { ILoginState } from "../interfaces/auth.state.interfaces";
import MyAlert from "../components/Alert";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { RouteComponentProps } from "react-router-dom";
import { login } from "../redux/actions/auth/auth.actions";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
} from "../redux/actions/auth/auth.types";

interface ChildComponentProps extends RouteComponentProps<any> {}

const Login: React.FC<ChildComponentProps> = ({
  location: { state: StateMessage },
  history,
}) => {
  document.title = "Login";
  const { states, handleSubmit, handleChange, errors } =
    UseFormAuth<ILoginState>(
      login,
      {
        identity: "",
        password: "",
      },
      LoginValidator
    );
  const { identity, password } = states;
  const { authErrors, loadingAuth, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    store.dispatch({ type: CLEAR_AUTH_ERRORS });
    store.dispatch({ type: CLEAR_AUTH_MESSAGE });
  }, []);

  useEffect(() => {
    if (!loadingAuth && isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, loadingAuth, history]);

  return (
    <FormContainer>
      <Form>
        <FormTitle>authboilerplate</FormTitle>
        {authErrors !== null && (
          <MyAlert message={authErrors} type={"danger"} />
        )}
        {typeof StateMessage === "string" && (
          <MyAlert message={StateMessage} type={"success"} />
        )}
        <VSpacer />
        <form onSubmit={handleSubmit}>
          <MyTextField
            autofocus={true}
            type="identity"
            name="identity"
            value={identity}
            onChange={handleChange}
            error={errors?.identity}
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
            have no account?{" "}
            <Link style={{ textDecoration: "none" }} to="/register">
              signup
            </Link>
          </span>
        </FormLink>
      </Form>
      <FormFooter>
        <p>&copy; Arridha Amrad</p>
      </FormFooter>
    </FormContainer>
  );
};

export default Login;
