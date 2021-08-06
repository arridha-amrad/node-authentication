import React from "react";
import { getAcessToken } from "../setAccessToken";

interface TestProps { }

const Test: React.FC<TestProps> = () => {
  const token = getAcessToken();
  console.log("Token at test page : ", token);
  return (
    <>
      <h1>Test page</h1>
    </>
  );
};

export default Test;
