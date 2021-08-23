import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loaders from "./components/loaders/loaders";
import { GlobalStyles } from "./components/styled.globals";
import EmailConfirmation from "./pages/EmailConfirmation";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Test from "./pages/Test";
import SecureRoute from "./utils/SecureRoute";
import { useState } from "react";
import axiosInstance from "./utils/AxiosInterceptors";

const App = () => {
  const [loading, setLoading] = useState(false);

  console.log(process.cwd());

  const dispatch = useDispatch();

  const refreshTokenHandler = async () => {
    return axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/refresh-token`
    );
  };

  useEffect(() => {
    if (localStorage.getItem("data") === "login") {
      setLoading(true);
      dispatch({ type: "LOADING_AUTH" });
      refreshTokenHandler()
        .then(() => {
          console.log("refresh token success");
          dispatch({
            type: "SET_AUTHENTICATED",
          });
        })
        .finally(() => {
          setLoading(false);
          dispatch({
            type: "STOP_LOADING_AUTH",
          });
        });
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loaders />;
  }
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <SecureRoute exact path="/test" component={Test} />
        <SecureRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/confirm/:link" component={EmailConfirmation} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:link" component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
