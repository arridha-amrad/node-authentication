import { Text, FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import React, { FC } from "react";

interface EmailVerificationProps {
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  verify: React.MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
}

const EmailVerification: FC<EmailVerificationProps> = ({
  verificationCode,
  setVerificationCode,
  verify,
  isLoading,
}) => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">
        Email Verification
      </Text>
      <FormControl>
        <FormLabel>Verification Code</FormLabel>
        <Input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </FormControl>
      <Button mt="10" w="100%" onClick={verify} color="blue">
        {isLoading ? "Loading" : "Verify"}
      </Button>
    </>
  );
};

export default EmailVerification;
