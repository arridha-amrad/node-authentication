import { Container, Alert, AlertIcon } from "@chakra-ui/react";
import React, { useState } from "react";
import axiosInstance from "../utils/AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../components/EmailVerification";
import RegisterComponents from "../components/RegisterComponents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  AUTHENTICATED_USER_DATA,
  LOADING_AUTH,
  STOP_LOADING_AUTH,
} from "../store/types/AuthTypes";

const Register = () => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState("");
  const registrationSteps = ["registration", "emailVerification"];
  const [step, setStep] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async () => {
    dispatch({ type: LOADING_AUTH });
    try {
      const { data } = await axiosInstance.post("/api/auth/register", state);
      if (data) {
        setStep((prev) => prev + 1);
        setMessage(data.message);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: STOP_LOADING_AUTH,
      });
    }
  };
  const [verificationCode, setCode] = useState("");

  const navigate = useNavigate();

  const verify = async () => {
    console.log("verificationCode : ", verificationCode);
    dispatch({ type: LOADING_AUTH });
    try {
      const { data } = await axiosInstance.put("/api/auth/verify-email", {
        verificationCode,
      });
      if (data) {
        setStep(0);
        dispatch({
          type: AUTHENTICATED_USER_DATA,
          payload: data.user,
        });
        navigate("/");
      }
    } catch (err: any) {
      console.log(err.response);
    } finally {
      dispatch({
        type: STOP_LOADING_AUTH,
      });
    }
  };
  return (
    <Container>
      {!!message && (
        <Alert status="success">
          <AlertIcon />
          {message}
        </Alert>
      )}
      {registrationSteps[step] === "registration" && (
        <RegisterComponents
          isLoading={isLoadingAuth}
          email={state.email}
          username={state.username}
          password={state.password}
          handleChange={handleChange}
          handleRegister={handleRegister}
        />
      )}
      {registrationSteps[step] === "emailVerification" && (
        <EmailVerification
          isLoading={isLoadingAuth}
          setVerificationCode={setCode}
          verificationCode={verificationCode}
          verify={verify}
        />
      )}
    </Container>
  );
};

export default Register;
