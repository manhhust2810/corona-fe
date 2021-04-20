import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React from "react";
import {
  MODAL_ERROR_BLANK,
  MODAL_ERROR_INVALID,
  MODAL_SUCCESS,
} from "../constants/PopupModalType";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdMoodBad } from "react-icons/md";

const PopupSuccessError = (props) => {
  const {
    modalId,
    modal,
    toggle,
    handleOnClosePopupSuccessError,
    message,
    messageClassName
  } = props;
  
  switch (modalId) {
    case MODAL_ERROR_BLANK:
      return errorModal(modal, toggle, handleOnClosePopupSuccessError, message, messageClassName);
    case MODAL_ERROR_INVALID:
      return errorModal(modal, toggle, handleOnClosePopupSuccessError, message, messageClassName);
    case MODAL_SUCCESS:
      return successModal(
        modal,
        toggle,
        handleOnClosePopupSuccessError,
        message,
        messageClassName
      );
    default:
      return null;
  }
};

export default PopupSuccessError;

const successModal = (
  modal,
  toggle,
  handleOnClosePopupSuccessError,
  message,
  messageClassName,
  className = ""
) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onExit={handleOnClosePopupSuccessError}
      id="success-modal"
      className={className}
    >
      <ModalHeader
        toggle={toggle}
        className="modal-header glyph-icon simple-icon-info"
      >
        Success
      </ModalHeader>
      <ModalBody className={messageClassName}><IoIosCheckmarkCircle size={24} color="primary"/>&nbsp;<strong>{message}</strong></ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const errorModal = (
  modal,
  toggle,
  handleOnClosePopupSuccessError,
  message,
  className = ""
) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onExit={handleOnClosePopupSuccessError}
      id="error-modal"
      className={className}
    >
      <ModalHeader
        toggle={toggle}
        className="modal-header glyph-icon simple-icon-fire"
      >
        Warning
      </ModalHeader>
      <ModalBody><MdMoodBad size={24} color="info"/>&nbsp;<strong>{message}</strong></ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
