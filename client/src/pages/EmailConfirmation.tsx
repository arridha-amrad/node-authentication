import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import * as messageActions from "../redux/reduxReducers/MessageReducer";

interface ChildComponentProps extends RouteComponentProps<any> {}

const EmailConfirmation: React.FC<ChildComponentProps> = ({ match }) => {
  const dispatch = useDispatch();

  const link = match.params.link;

  const confirmAPI = async () => {
    return await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/auth/verify-email/${link}`
    );
  };

  useEffect(() => {
    confirmAPI()
      .then((res) => {
        dispatch(messageActions.setMessage(res.data.data, "success"));
      })
      .catch((err) => {
        dispatch(
          messageActions.setMessage(err.response.data.message, "danger")
        );
      });
    // eslint-disable-next-line
  }, []);

  return <Redirect to={{ pathname: "/login" }} />;
};

export default EmailConfirmation;
