import React, { useState } from "react";
import {
  FormField,
  InputField,
  IconSpacer,
  FormGroup,
  FormLabel,
  FormText,
  IconField,
  InputIcon,
  IconFieldRight,
  RightInputIcon,
} from "../../elements/Input.element";
import LockIcon from "../../icons/auth/lock.png";
import EmailIcon from "../../icons/auth/email.png";
import UsernameIcon from "../../icons/auth/username.png";
import EyeIcon from "../../icons/auth/eye.png";
import HideEyeIcon from "../../icons/auth/hide.png";
import { VSpacer } from "../../elements/spacer.element";

export interface MyTextFieldProps {
  type: "username" | "password" | "email" | "identity";
  label: string;
  name: string;
  value: string;
  error?: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autofocus?: boolean;
}
const MyTextField: React.FC<MyTextFieldProps> = ({
  type,
  error,
  label,
  autofocus,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FormGroup>
        <FormLabel>{label}</FormLabel>
        <FormField>
          <IconField type="button" aa_cursor="text">
            <InputIcon
              src={
                type === "email"
                  ? EmailIcon
                  : type === "password"
                  ? LockIcon
                  : UsernameIcon
              }
            />
          </IconField>
          <IconSpacer />
          <InputField
            {...props}
            autoFocus={autofocus}
            type={type === "password" && !showPassword ? "password" : "text"}
          />
          {type !== "password" ? null : (
            <IconFieldRight>
              <RightInputIcon
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? EyeIcon : HideEyeIcon}
              />
            </IconFieldRight>
          )}
        </FormField>
        {error && <FormText>{error}</FormText>}
      </FormGroup>
      <VSpacer />
    </>
  );
};

export default MyTextField;
