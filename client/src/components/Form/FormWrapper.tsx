import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormContainer,
  FormFooter,
  FormTitle,
} from "../../elements/form.element";
import { VSpacer } from "../../elements/spacer.element";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGE,
} from "../../redux/actions/auth/auth.types";
import { RootState } from "../../redux/store";
import MyAlert from "../Alert";

interface FormWrapperProps {}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const { authErrors, authMessage } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
    dispatch({ type: CLEAR_AUTH_MESSAGE });
    // eslint-disable-next-line
  }, []);

  return (
    <FormContainer>
      <Form>
        <FormTitle>authboilerplate</FormTitle>
        {typeof authMessage === "string" && (
          <MyAlert message={authMessage} type={"success"} />
        )}
        {typeof authErrors === "string" && (
          <MyAlert message={authErrors} type={"danger"} />
        )}
        <VSpacer />
        {children}
      </Form>
      {/* <FormFooter>
        <p>&copy; Arridha Amrad</p>
      </FormFooter> */}
    </FormContainer>
  );
};

export default FormWrapper;
