import styled from "styled-components";

export const LoaderOverlay = styled.div`
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
`;

export const LoadersIcon = styled.img`
  height: 100px;
`;
