import React, { Dispatch, SetStateAction } from "react";
import {
  Background,
  Divider,
  ModalActions,
  ModalContent,
  ModalWrapper,
  Spacer,
} from "../../elements/modal.element";
import { Button } from "../../elements/button.element";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, showModal }) => {
  return (
    <>
      {showModal && (
        <Background>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <p>
                You will be directed to logout. Next time you come back, you
                will ask to login again. Continue ?
              </p>
            </ModalContent>
            <Divider />
            <ModalActions>
              <Button
                aa_height="50px"
                aa_width="70px"
                aa_color="#c921f3"
                aa_bg="#fff"
              >
                Save
              </Button>
              <Spacer />
              <Button
                onClick={() => setShowModal(false)}
                aa_color="#333"
                aa_height="50px"
                aa_width="70px"
                aa_bg="#fff"
              >
                Cancel
              </Button>
            </ModalActions>
          </ModalWrapper>
        </Background>
      )}
    </>
  );
};

export default Modal;
