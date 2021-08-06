import React from "react";
import { useSelector } from "react-redux";
import {
  Form,
  FormContainer,
  FormFooter,
  FormTitle,
} from "../../elements/form.element";
import { VSpacer } from "../../elements/spacer.element";
import { RootState } from "../../redux/store";
import MyAlert from "../Alert";

interface FormWrapperProps { }

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const { authErrors, authMessage } = authState;

  return (
    <FormContainer>
      <Form>
        <FormTitle>authboilerplate</FormTitle>
        {authMessage !== null && (
          <MyAlert message={authMessage} type={"success"} />
        )}
        {authErrors !== null && (
          <MyAlert message={authErrors} type={"danger"} />
        )}
        <VSpacer />
        {children}
      </Form>
      <FormFooter>
        <p>&copy; Arridha Amrad</p>
      </FormFooter>
    </FormContainer>
  );
};

export default FormWrapper;
