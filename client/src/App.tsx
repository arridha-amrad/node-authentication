import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "./redux/Store";
import SecureRoute from "./utils/SecureRoute";
import axiosInstance from "./utils/axiosInterceptors";

const App = () => {
  const { loadingAuth } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOADING_AUTH" });
    axiosInstance
      .get("/auth/isAuthenticated")
      .then((res) => {
        if (res.data === "login") {
          dispatch({
            type: "SET_USER_SUCCESS",
          });
        } else {
          dispatch({
            type: "SET_UNAUTHENTICATED",
          });
        }
      })
      .finally(() => {
        dispatch({
          type: "STOP_LOADING_AUTH",
        });
      });
    // eslint-disable-next-line
  }, []);

  if (loadingAuth) {
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
