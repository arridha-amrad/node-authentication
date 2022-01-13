import {
  Alert,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  AUTHENTICATED_USER_DATA,
  LOADING_AUTH,
  STOP_LOADING_AUTH,
} from "../store/types/AuthTypes";
import axiosInstance from "../utils/AxiosInterceptor";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { isLoadingAuth } = useSelector((state: RootState) => state.auth);
  const [state, setState] = useState({
    identity: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    try {
      dispatch({ type: LOADING_AUTH });
      const { data } = await axiosInstance.post("/api/auth/login", state);
      if (data) {
        navigate("/");
        dispatch({
          type: AUTHENTICATED_USER_DATA,
          payload: data.user,
        });
      }
    } catch (err: any) {
      console.log(err);
      setMessage(err.response.data.message);
    } finally {
      dispatch({ type: STOP_LOADING_AUTH });
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("e");
    if (myParam) {
      setMessage(myParam);
    }
  }, []);
  return (
    <Container>
      {!!message && (
        <Alert status="error">
          <AlertIcon />
          {message}
        </Alert>
      )}
      <Text fontSize="xl" fontWeight="bold">
        Login
      </Text>
      <FormControl>
        <FormLabel>Email or Username</FormLabel>
        <Input
          type="text"
          name="identity"
          value={state.identity}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="text"
          value={state.password}
          onChange={handleChange}
        />
      </FormControl>
      <Button mt="10" w="100%" onClick={handleLogin} color="blue">
        {isLoadingAuth ? "Loading..." : "Login"}
      </Button>
    </Container>
  );
};

export default Login;
