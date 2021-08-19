import React, { useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import axiosInstance from "../utils/axiosInterceptors";

interface ChildComponentProps extends RouteComponentProps<any> {}

const EmailConfirmation: React.FC<ChildComponentProps> = ({ match }) => {
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const link = match.params.link;
    axiosInstance
      .put(`/auth/verify-email/${link}`)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.data);
        setConfirm(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {confirm ? (
        <Redirect to={{ pathname: "/login", state: message }} />
      ) : (
        "Invalid link"
      )}
    </div>
  );
};

export default EmailConfirmation;
