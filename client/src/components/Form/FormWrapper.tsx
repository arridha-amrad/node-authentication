import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
} from "../../redux/reduxTypes/AuthTypes";
import { RootState } from "../../redux/Store";
import MyAlert from "../Alert";

interface FormWrapperProps {}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const { authErrors, authMessage, isAuthenticated, loadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
    dispatch({ type: CLEAR_AUTH_MESSAGE });
    if (!loadingAuth && isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [loadingAuth, isAuthenticated]);

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
      <FormFooter>
        <p>&copy; Arridha Amrad</p>
      </FormFooter>
    </FormContainer>
  );
};

export default FormWrapper;
