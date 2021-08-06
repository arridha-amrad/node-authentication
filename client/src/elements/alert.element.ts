import styled from "styled-components";

interface AlertProps {
  aa_type: "success" | "danger" | "info";
}

export const AlertField = styled.div<AlertProps>`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
  background: ${(props) =>
    props.aa_type === "danger"
      ? "#ffebee"
      : props.aa_type === "success"
      ? "#e8f5e9"
      : "#f3e5f5"};
  padding: 10px;
  border-radius: 5px;
`;

export const AlertIcon = styled.img`
  padding-top: 3px;
  width: 17px;
  margin-right: 10px;
`;

export const Alert = styled.p<AlertProps>`
  line-height: 23px;
  border-radius: 5px;
  font-size: 0.9rem;
  width: 100%;
  color: ${(props) =>
    props.aa_type === "success"
      ? "#43a047"
      : props.aa_type === "danger"
      ? "#f44336"
      : "#bbdefb"};
`;
