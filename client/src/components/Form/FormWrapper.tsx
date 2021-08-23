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
import { useLocation } from "react-router-dom";

interface FormWrapperProps {}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const { authErrors, authMessage, isAuthenticated, loadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
    dispatch({ type: CLEAR_AUTH_MESSAGE });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loadingAuth && isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <FormContainer>
      <Form>
        <FormTitle>authboilerplate</FormTitle>
        {typeof authMessage === "string" && (
          <MyAlert message={authMessage} type="success" />
        )}
        {typeof authErrors === "string" && (
          <MyAlert message={authErrors} type="danger" />
        )}
        {typeof location.state === "string" && (
          <MyAlert message={location.state} type="success" />
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
