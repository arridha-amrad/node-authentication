import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { FC } from "react";

interface IProps {
  component?: React.FC;
  exact?: boolean;
  path?: string;
}

const SecureRoute: FC<IProps> = (props) => {
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const { isAuthenticated, loadingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setIsLogin(isAuthenticated);
    setLoadingAuth(loadingAuth);
  }, [isAuthenticated, loadingAuth]);

  return !isLoadingAuth && !isLogin ? (
    <Redirect to="/login" />
  ) : (
    <Route {...props} component={props.component} />
  );
};

export default SecureRoute;
