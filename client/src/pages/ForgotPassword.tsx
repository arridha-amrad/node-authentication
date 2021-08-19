import React from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../components/Form/FormWrapper";
import MyTextField from "../components/Form/MyTextField";
import { ForgotPasswordData } from "../dto/AuthDTO";
import { Button } from "../elements/button.element";
import { FormLink } from "../elements/form.element";
import { VSpacer } from "../elements/spacer.element";
import { forgotPassword } from "../redux/reduxActions/AuthActions";
import UseFormAuth from "../utils/UseFormAuth";
import { ForgotPasswordValidator } from "../validators/AuthValidator";

interface ForgotPasswordProps {}

export interface IForgotPasswordField {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  document.title = "Forgot Password";
  const { errors, handleChange, handleSubmit, states, loadingAuth } =
    UseFormAuth<ForgotPasswordData>(
      forgotPassword,
      {
        email: "",
      },
      ForgotPasswordValidator
    );
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <MyTextField
          autofocus={true}
          label="email"
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
          disabled={states.email === "" || loadingAuth}
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
