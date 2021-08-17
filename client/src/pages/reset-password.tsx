import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import FormWrapper from "../components/Form/FormWrapper";
import MyTextField from "../components/Form/MyTextField";
import { ResetPasswordData } from "../dto/AuthDTO";
import { Button } from "../elements/button.element";
import { FormLink } from "../elements/form.element";
import { VSpacer } from "../elements/spacer.element";
import { resetPassword } from "../redux/actions/auth/auth.actions";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
} from "../redux/actions/auth/auth.types";
import store, { RootState } from "../redux/store";
import UseFormAuth from "../utils/UseFormAuth";
import { ResetPasswordValidator } from "../validators/AuthValidator";

interface ChildComponentProps extends RouteComponentProps<any> {}

export interface IResetPasswordField {
  password: string;
}

const ResetPassword: React.FC<ChildComponentProps> = ({ match }) => {
  const { loadingAuth } = useSelector((state: RootState) => state.auth);
  const { errors, handleChange, handleSubmit, states } =
    UseFormAuth<ResetPasswordData>(
      resetPassword,
      {
        password: "",
        confirmPassword: "",
        token: match.params.link,
      },
      ResetPasswordValidator
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
          label="password"
          type="password"
          name="password"
          value={states.password}
          onChange={handleChange}
          error={errors?.password}
        />
        <VSpacer />
        <Button
          aa_isFullWidth
          aa_color="#fff"
          aa_bg="#9c27b0"
          aa_height="50px"
          disabled={states.password === ""}
        >
          {loadingAuth ? "loading..." : "Submit"}
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

export default ResetPassword;
