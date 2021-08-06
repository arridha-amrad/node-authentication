import styled from "styled-components";

interface VSpacerProps {
  length?: string;
}

export const VSpacer = styled.div<VSpacerProps>`
  height: ${(props) => props.length || "10px"};
`;
