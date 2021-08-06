import { Link } from "react-router-dom";
import styled from "styled-components";

interface InputFieldProps {
  aa_onFocusShadow?: boolean;
  aa_noBorder?: boolean;
  aa_isError?: boolean;
  aa_densed?: boolean;
}

interface IconFieldProps {
  aa_cursor?: string;
}

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const FormText = styled.div`
  text-align: end;
  font-size: 0.8rem;
  margin-top: 0px;
  color: red;
  margin-bottom: 10px;
`;

export const IconSpacer = styled.div`
  height: 80%;
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 5px;
  left: 50px;

  @media screen and (max-width: 500px) {
    left: 45px;
  }
`;

export const FormField = styled.div`
  display: flex;
  width: 100%;
  z-index: 99;
  position: relative;
`;

export const IconField = styled.button<IconFieldProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 15px 0 0 15px;
  cursor: ${(props) => props.aa_cursor || "pointer"};
  border: none;
  outline: none;
  width: 55px;
  height: 48px;
  /* background: #e8eaf6; */
  background: none;
  @media screen and (max-width: 500px) {
    top: 1px;
    width: 55px;
    left: 0px;
  }
`;

export const IconFieldRight = styled.div`
  padding: 10px 10px;
  height: 40px;
  width: 45px;
  border-radius: 0 15px 15px 0;
  position: absolute;
  top: 5px;
  right: 3px;
  background: #fff;

  @media screen and (max-width: 500px) {
    padding: 10px 10px;
    height: 36px;
    width: 40px;
    top: 2px;
  }
`;

export const RightInputIcon = styled.img`
  position: absolute;
  right: 12px;
  width: 25px;
  top: 8px;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: 23px;
  }
`;

export const InputIcon = styled.img`
  height: 25px;
  position: absolute;
  top: 12px;
  left: 14px;

  @media screen and (max-width: 500px) {
    top: 7px;
  }
`;

export const InputField = styled.input<InputFieldProps>`
  border-radius: 5px;
  width: 100%;
  outline: none;
  font-size: 1.1rem;
  border: ${(props) =>
    props.aa_isError
      ? "2px solid red"
      : props.aa_noBorder
      ? "none"
      : "1px solid #ccc"};
  padding-top: ${(props) => (props.aa_densed ? "0.5rem" : "0.8rem")};
  padding-bottom: ${(props) => (props.aa_densed ? "0.5rem" : "0.8rem")};
  padding-left: 4rem;
  padding-right: 2rem;
  &:focus {
    border: none;
    box-shadow: 0px 0px 1px 2px #c921f3;

    /* box-shadow: ${(props) =>
      props.aa_isError
        ? "none"
        : props.aa_onFocusShadow
        ? "1px 1px 10px 1px rgba(205, 146, 216, 0.47)"
        : props.aa_noBorder && "none"};
    transition: box-shadow 0.5s; */
    /* -moz-outline-radius: 5px;
    outline: ${(props) =>
      props.aa_noBorder
        ? "none"
        : props.aa_isError
        ? "2px solid red"
        : "2px solid #c921f3"}; */
  }
  &::placeholder {
    opacity: 0.4;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    padding: 0.8rem 1rem 0.8rem 3.4rem;
    border-radius: 15px;
  }
`;

export const SearchField = styled.input<InputFieldProps>`
  width: 100%;
  outline: none;
  font-size: 1rem;
  border-radius: 5px;
  border-top: ${(props) =>
    props.aa_isError
      ? "2px solid red"
      : props.aa_noBorder
      ? "none"
      : "2px solid #eee"};
  border-left: 2px solid #eee;
  border-right: 2px solid #eee;
  border-bottom: none;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 3rem;
  padding-right: 2rem;
  &:focus {
    box-shadow: ${(props) =>
      props.aa_isError
        ? "none"
        : props.aa_onFocusShadow
        ? "1px 1px 10px 1px rgba(205, 146, 216, 0.47)"
        : props.aa_noBorder && "none"};
    transition: box-shadow 0.5s;
    border: ${(props) =>
      props.aa_isError
        ? "2px solid red"
        : props.aa_noBorder
        ? "none"
        : props.aa_onFocusShadow && "4px solid rgba(155, 39, 176, 0.2)"};
  }
`;

export const SearchResult = styled.div`
  background: #eee;
  width: calc(100% - 10px);
  height: 200px;
  border-radius: 0px 0 15px 15px;
  margin-top: -30px;
  margin-left: 15px;
  margin-right: 25px;
  transform: translateX(-10px);
  border-left: 2px solid #eee;
  border-right: 2px solid #eee;
  border-left: 2px solid #eee;
  padding-top: 20px;
  padding-left: 20px;
`;

export const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0;
`;

export const ForgotPasswordText = styled(Link)`
  text-decoration: none;
  font-size: 13px;
`;
