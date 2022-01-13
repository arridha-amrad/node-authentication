import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  LOADING_AUTH,
  RESET_AUTH_USER,
  STOP_LOADING_AUTH,
} from "../store/types/AuthTypes";
import axiosInstance from "../utils/AxiosInterceptor";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      dispatch({ type: LOADING_AUTH });
      await axiosInstance.post("/api/auth/logout");
      dispatch({
        type: RESET_AUTH_USER,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: STOP_LOADING_AUTH,
      });
    }
  };
  return (
    <Button onClick={handleLogout} variant="solid" color="red">
      Logout
    </Button>
  );
};

export default Logout;
