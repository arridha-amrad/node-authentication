import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import {
  AUTHENTICATED_USER_DATA,
  SET_AUTHENTICATED,
} from "./store/types/AuthTypes";
import axiosInstance from "./utils/AxiosInterceptor";

const App = () => {
  const [isMounted, setIsMounted] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fetchUser = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    return () => {
      setIsMounted(false);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home isLoading={isLoading} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
