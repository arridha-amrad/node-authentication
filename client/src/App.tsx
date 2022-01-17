import { Box, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home, Login, Register } from "./pages";
import {
  AUTHENTICATED_USER_DATA,
  LOADING_AUTH,
  SET_AUTHENTICATED,
  STOP_LOADING_AUTH,
} from "./store/types/AuthTypes";
import axiosInstance from "./utils/AxiosInterceptor";

const App = () => {
  const [isMounted, setIsMounted] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fetchUser = async () => {
    try {
      setIsLoading(true)
      dispatch({ type: LOADING_AUTH })
      await axiosInstance.get("/api/auth/refresh-token");
      const { data } = await axiosInstance.get("/api/user/me");
      if (isMounted) {
        dispatch({
          type: SET_AUTHENTICATED,
        });
        dispatch({
          type: AUTHENTICATED_USER_DATA,
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: STOP_LOADING_AUTH })
      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
    }
  };
  useEffect(() => {
    fetchUser();
    return () => {
      setIsMounted(false);
    };
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return (
      <Box d="flex" alignItems="center" h="100vh" w="100%" bg="InfoBackground" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    )
  }
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home isLoading={isLoading} />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
