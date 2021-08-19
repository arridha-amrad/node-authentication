import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FormWrapper from "../components/Form/FormWrapper";
import MyTextField from "../components/Form/MyTextField";
import { ResetPasswordData } from "../dto/AuthDTO";
import { Button } from "../elements/button.element";
import { FormLink } from "../elements/form.element";
import { VSpacer } from "../elements/spacer.element";
import { resetPassword } from "../redux/reduxActions/AuthActions";
import UseFormAuth from "../utils/UseFormAuth";
import { ResetPasswordValidator } from "../validators/AuthValidator";

interface ChildComponentProps extends RouteComponentProps<any> {}

export interface IResetPasswordField {
  password: string;
}

const ResetPassword: React.FC<ChildComponentProps> = ({ match }) => {
  document.title = "Reset Password";
  const { errors, handleChange, handleSubmit, states, loadingAuth } =
    UseFormAuth<ResetPasswordData>(
      resetPassword,
      {
        password: "",
        confirmPassword: "",
        token: match.params.link,
      },
      ResetPasswordValidator
    );
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
        <MyTextField
          label="confirm password"
          type="password"
          name="confirmPassword"
          value={states.confirmPassword}
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
            states.password === "" ||
            states.confirmPassword === "" ||
            loadingAuth
          }
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
