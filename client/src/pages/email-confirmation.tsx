import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Redirect, RouteComponentProps } from "react-router-dom";

interface ChildComponentProps extends RouteComponentProps<any> { }

const EmailConfirmation: React.FC<ChildComponentProps> = (props) => {
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const link = props.match.params.link;
    Axios.post(`http://localhost:8080/api/auth/verify-email/${link}`)
      .then((res) => {
        setMessage(res.data.success.message);
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
