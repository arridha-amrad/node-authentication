import React from "react";
import { Alert, AlertField, AlertIcon } from "../../elements/alert.element";
import CheckIcon from "../../icons/alert/checked.png";
import ErrorIcon from "../../icons/alert/warn.png";
import { MessageTypes } from "../../redux/reduxReducers/MessageReducer";

interface AlertProps {
  type: MessageTypes;
  message: string | null;
}

const MyAlert: React.FC<AlertProps> = ({ type, message }) => {
  return (
    <AlertField aa_type={type}>
      <AlertIcon src={type === "success" ? CheckIcon : ErrorIcon} alt="check" />
      <Alert aa_type={type}>{message}</Alert>
    </AlertField>
  );
};

export default MyAlert;
