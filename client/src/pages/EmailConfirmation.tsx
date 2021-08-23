import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";

interface ChildComponentProps extends RouteComponentProps<any> {}

const EmailConfirmation: React.FC<ChildComponentProps> = ({ match }) => {
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const link = match.params.link;

  const confirmAPI = async () => {
    return await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/auth/verify-email/${link}`
    );
  };

  useEffect(() => {
    confirmAPI()
      .then((res) => {
        console.log("res", res.data);
        setMessage(res.data.data);
        setConfirm(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log("verification error", err.response.data.message);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {confirm ? (
        <Redirect to={{ pathname: "/login", state: message }} />
      ) : (
        message
      )}
    </div>
  );
};

export default EmailConfirmation;
