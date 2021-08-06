import styled from "styled-components";
import { MdClose } from "react-icons/md";

interface ModalWrapperProps {
  showModal?: boolean;
}

interface BackgroundProps {
  ref?: any;
}

export const Background = styled.div<BackgroundProps>`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 9999;
`;

export const ModalWrapper = styled.div<ModalWrapperProps>`
  margin: 2rem;
  background: #fff;
  padding: 1rem 2rem;
  width: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.showModal ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  border-radius: 0px;

  p {
    color: #333;
  }

  @media screen and (max-width: 768px) {
    width: 450px;
    margin: 1rem;
  }

  @media screen and (max-width: 600px) {
    width: 350px;
    margin: 1rem;
  }
`;

export const Spacer = styled.div`
  width: 10px;
`;

export const Divider = styled.div`
  height: 2px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -10px;
`;

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
