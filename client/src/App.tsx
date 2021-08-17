import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loaders from "./components/loaders/loaders";
import { GlobalStyles } from "./components/styled.globals";
import EmailConfirmation from "./pages/email-confirmation";
import ForgotPassword from "./pages/forgot-password";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./pages/reset-password";
import Test from "./pages/test";
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "./redux/actions/auth/auth.types";
import { meQuery } from "./redux/actions/user/user.action";
import store from "./redux/store";
import { setAccessToken } from "./setAccessToken";
import SecureRoute from "./utils/SecureRoute";

const App = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoading(true);
      Axios.get("http://localhost:8080/api/auth/refresh-token", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res: any) => {
          setAccessToken(res.data.success.accessToken);
          store.dispatch({ type: SET_AUTHENTICATED });
          dispatch(meQuery());
        })
        .catch((_) => {
          store.dispatch({ type: SET_UNAUTHENTICATED });
        })
        .finally(() => setLoading(false));
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
        <SecureRoute exact path="/" component={Home} />
        <SecureRoute exact path="/test" component={Test} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/confirm/:link" component={EmailConfirmation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:link" component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
