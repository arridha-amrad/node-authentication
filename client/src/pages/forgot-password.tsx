import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormWrapper from "../components/Form/FormWrapper";
import MyTextField from "../components/Form/MyTextField";
import { Button } from "../elements/button.element";
import { FormLink } from "../elements/form.element";
import { VSpacer } from "../elements/spacer.element";
import { IForgotPasswordState } from "../interfaces/auth.state.interfaces";
import { forgotPassword } from "../redux/actions/auth/auth.actions";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
} from "../redux/actions/auth/auth.types";
import store, { RootState } from "../redux/store";
import UseFormAuth from "../utils/UseFormAuth";
import { ForgotPasswordValidator } from "../validators/authValidator";

interface ForgotPasswordProps {}

export interface IForgotPasswordField {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  document.title = "Forgot Password";
  const { loadingAuth } = useSelector((state: RootState) => state.auth);
  const {
    errors,
    handleChange,
    handleSubmit,
    states,
  } = UseFormAuth<IForgotPasswordState>(
    forgotPassword,
    {
      email: "",
    },
    ForgotPasswordValidator
  );
  useEffect(() => {
    store.dispatch({ type: CLEAR_AUTH_ERRORS });
    store.dispatch({ type: CLEAR_AUTH_MESSAGE });
    // eslint-disable-next-line
  }, []);
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <MyTextField
          autofocus={true}
          type="email"
          name="email"
          value={states.email}
          onChange={handleChange}
          error={errors?.email}
        />
        <VSpacer />
        <Button
          aa_isFullWidth
          aa_color="#fff"
          aa_bg="#9c27b0"
          aa_height="50px"
          disabled={states.email === ""}
        >
          {loadingAuth ? "loading..." : "Send"}
        </Button>
      </form>
      <FormLink>
        <span>
          back to <Link to="/login">login</Link>
        </span>
      </FormLink>
    </FormWrapper>
  );
};

export default ForgotPassword;
