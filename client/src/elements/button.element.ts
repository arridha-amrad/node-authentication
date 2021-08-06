import styled from "styled-components";

interface ButtonProps {
  readonly aa_bg?: string;
  aa_width?: string;
  readonly aa_isFullWidth?: boolean;
  aa_height?: string;
  aa_isLoading?: boolean;
  aa_color?: string;
  aa_fontSize?: string;
}

export const Button = styled.button<ButtonProps>`
  background: ${(props) => props.aa_bg || "white"};
  color: ${(props) => props.aa_color || "#fff"};
  height: ${(props) => props.aa_height};
  font-weight: medium;
  font-size: ${(props) => props.aa_fontSize || "1rem"};
  border-radius: 5px;
  width: ${(props) =>
    props.aa_isFullWidth ? "100%" : props.aa_width || "100px"};
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #d500f9;
    box-shadow: none;
  }
  &:disabled {
    cursor: unset;
    background: #e1bee7;
  }
  &:active {
    outline: none;
    border: none;
    transform: ${(props) => !props.disabled && "scale(0.95, 0.95)"};
  }
`;

export const SocialButton = styled.img`
  cursor: pointer;
  background: #eee;
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  margin-left: 5px;
`;
