import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormContainer,
  FormFooter,
  FormTitle,
} from "../../elements/form.element";
import { VSpacer } from "../../elements/spacer.element";

import { RootState } from "../../redux/Store";
import MyAlert from "../Alert";

interface FormWrapperProps {}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const { isAuthenticated, loadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const { messages } = useSelector((state: RootState) => state.message);
  const history = useHistory();

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
        {messages.map((m) => (
          <MyAlert key={m.id} message={m.text} type={m.type} />
        ))}
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
