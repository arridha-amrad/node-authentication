import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IProps {
  component?: React.FC;
  exact?: boolean;
  path?: string;
}

const SecureRoute: React.FC<IProps> = (props) => {
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [isA, setIsA] = useState(false);

  const { isAuthenticated, loadingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setIsA(isAuthenticated);
    setLoadingAuth(loadingAuth);
  }, [isAuthenticated, loadingAuth]);

  return !isA && !isLoadingAuth ? (
    <Redirect to="/login" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default SecureRoute;
