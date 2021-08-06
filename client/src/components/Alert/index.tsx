import React from "react";
import { Alert, AlertField, AlertIcon } from "../../elements/alert.element";
import CheckIcon from "../../icons/alert/checked.png";
import ErrorIcon from "../../icons/alert/warn.png";

interface MyAlertProps {
  type: "success" | "danger" | "info";
  message: string | null;
}

const MyAlert: React.FC<MyAlertProps> = ({ type, message }) => {
  return (
    <AlertField aa_type={type}>
      <AlertIcon src={type === "success" ? CheckIcon : ErrorIcon} alt="check" />
      <Alert aa_type={type}>{message}</Alert>
    </AlertField>
  );
};

export default MyAlert;
