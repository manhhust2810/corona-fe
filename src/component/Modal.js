import React, {
  // useEffect,
  useState,
} from "react";
// import {
//   // Modal,
//   // Button,
//   Form,
// } from "react-bootstrap";
// import Axios from "axios";
import PopupSuccessError from "./PopupSuccessError";
import ModalFooter from "reactstrap/es/ModalFooter";
import {
  Button,
  Col,
  // Input,
  Container,
  // Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  // Spinner,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';

function ModelEmail(props) {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  // const [toggle, setToggle] = useState(true);
  const [modalId, setModalId] = useState("");
  const [messageClassName, setMessageClassName] = useState("")

  const handleType = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  // useEffect(() => {
  //   setEmail(value);
  // }, [value])

  const handleSubmit = () => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    props.handleCancel();
    if (email === "") {
      setModalOpen(true);
      setModalId("MODAL_ERROR_BLANK");
      setModalMessage("*This field is required!");
      setEmail("");
      setMessageClassName("text text-info");
    } else if (!regexEmail.test(email)) {
      setModalMessage("The entered is incorrect format!");
      setModalId("MODAL_ERROR_INVALID");
      setModalOpen(true);
      setEmail("");
      setMessageClassName("text text-danger");
    } else {
      setModalMessage("The entered is accepted!");
      setModalId("MODAL_SUCCESS");
      setModalOpen(true);
      setEmail("");
      setMessageClassName("text text-success")
    }
  };

  const handleOnClosePopupSuccessError = () => {};

  const toggle = (modalId) => {
    setModalId(modalId);
    setModalOpen(!modalOpen);
  };

  return (
    <Container>
      <Modal
        isOpen={props.openModal}
        toggle={props.handleCancel}
        id="reset-status-modal"
      >
        <ModalHeader toggle={props.handleCancel} className="modal-header">
          <h6>Register for news via email</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {/* <Label for="tye" sm={2}>
                Email:<span className="text-danger">*</span>
              </Label> */}
              <Col
              className="col-dropdown-item"
              sm={12}
              >
                {/* <Input
                  type="email"
                  required
                  placeholder="Enter email ..."
                  onChange={handleType}
                /> */}
                <center>
                {/* <TextField 
                  id="outlined-search" 
                  label="Email" 
                  type="search" 
                  variant="outlined"
                /> */}
                  <TextField 
                    required
                    type="email"
                    id="standard-basic" 
                    label="Email"
                    onChange={handleType}
                    style={{ width: "80%" }}
                  />
                </center>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="light"
            className="custom-button-light"
            onClick={props.handleCancel}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
      <div className="popup">
        <PopupSuccessError
          modalId={modalId}
          modal={modalOpen}
          toggle={toggle}
          handleOnClosePopupSuccessError={handleOnClosePopupSuccessError}
          message={modalMessage}
          messageClassName={messageClassName}
        />
      </div>
    </Container>
  );
}

export default ModelEmail;

// import Select from "react-select";
// import CustomSelectInput from "components/common/CustomSelectInput";
// import ModalFooter from "reactstrap/es/ModalFooter";
// import IntlMessages from "helpers/IntlMessages";
// import {
//   MODAL_RESET_STATUS,
//   MODAL_RESET_STATUS_SUCCESS,
//   MODAL_RESET_STATUS_ERROR,
// } from "constants/PopupModalType";
// import connect from "react-redux/es/connect/connect";
// import {
//   resetSourceStatus,
//   getListDatasetDetail,
// } from "redux/actions";
// import PopupSuccessError from "components/modal/PopupSuccessError";
// import { array, func, string } from "prop-types";
// import { usePrevious } from "helpers/Utils";

// const ResetStatus = ( {
//   projectId,
//   datasetId,
//   setSelectedStatus,
//   setPageSize,
//   handleChangedLabeler,
//   status,
//   selectedSourceIds,
//   resetSourceStatus,
//   getListDatasetDetail,
//   message,
//   error,
// }) => {
//   const [ modalId, setModalId ] = useState(MODAL_RESET_STATUS);
//   const [ modalOpen, setModalOpen ] = useState(false);
//   const [ modalMessage, setModalMessage ] = useState("");
//   const [ selectedOldStatus, setSelectedOldStatus ] = useState(null);
//   const [ selectedNewStatus, setSelectedNewStatus ] = useState(null);
//   const [ processResetStatus, setProcessResetStatus ] = useState(false);
//   const [ errorOldStatus, setErrorOldStatus] = useState(false);
//   const [ errorNewStatus, setErrorNewStatus] = useState(false);
//   const prevMessageResetStatus = usePrevious(message);
//   const prevErrorResetStatus = usePrevious(error);
//   const selected =  {key: "selected", label: "Selected", value: "selected", color: ""};

//   useEffect(() => {
//     if (prevMessageResetStatus === "" && message !== "") {
//       if (modalId === MODAL_RESET_STATUS) {
//         if (processResetStatus) {
//           setModalMessage("Change source status successfully.");
//           setProcessResetStatus(false);
//           setModalId(MODAL_RESET_STATUS_SUCCESS);
//         }
//       }
//     }
//     if (prevErrorResetStatus === "" && error !== "") {
//       if (processResetStatus) {
//         setModalMessage(error);
//         setProcessResetStatus(false);
//         setModalId(MODAL_RESET_STATUS_ERROR);
//      }
//    }
//  }, [message, error]);

//  const toggle = (modalId) => {
//    setModalId(modalId);
//    setModalOpen(!modalOpen);
//  };

//  const openResetStatus = () => {
//    setModalOpen(true);
//   };

//  const getStatus = () => {
//    const statusArray = [...status];
//    return statusArray.filter((item) => {
//      return item.value !== "";
//    });
//  };

//  const getOldStatus = () => {
//    if (selectedSourceIds.length > 0) {
//      const oldStatus = [selected, ...getStatus()];
//      if (selectedOldStatus === null) {
//        setSelectedOldStatus(selected);
//      }
//      return oldStatus;
//    }
//    return getStatus();
//  };
//    const handleChangeOldStatus = (oldStatus) => {
//    setSelectedOldStatus(oldStatus);
//    setErrorOldStatus(false);
//  };
//  const handleChangeNewStatus = (newStatus) => {
//    setSelectedNewStatus(newStatus);
//    setErrorNewStatus(false);
//  };

//  const handleCancelResetStatus= () => {
//    toggle("");
//    removeResetStatusData();
//  };
//  const removeResetStatusData = () => {
//    setModalOpen(false);
//    setModalId(MODAL_RESET_STATUS);
//    setSelectedOldStatus(null);
//    setSelectedNewStatus(null);
//    setModalMessage("");
//    setErrorOldStatus(false);
//    setErrorNewStatus(false);
//  };

//  const handleOnClosePopupSuccessError = () => {
//    getListDatasetDetail(datasetId, 10, 1, "", "");
//    setSelectedStatus("");
//    setPageSize(10);
//    handleChangedLabeler({ label: "All", value: "", key: 0, role_code: "labeler"}, false);
//    removeResetStatusData();
//  };

//  const resetStatus = () => {
//    if (selectedOldStatus === null || selectedNewStatus === null) {
//      if (selectedOldStatus === null) setErrorOldStatus(true);
//      if (selectedNewStatus === null) setErrorNewStatus(true);
//      return;
//    }
//    setProcessResetStatus(true);
//    if (selectedSourceIds.length > 0 && selectedOldStatus.value === "selected") {
//      resetSourceStatus(projectId, datasetId, "", selectedNewStatus.value, selectedSourceIds);
//    } else {
//      resetSourceStatus(projectId, datasetId, selectedOldStatus.value, selectedNewStatus.value, []);
//    }
//  };

//  return (
//    <div className="export-source">
//      <span onClick={openResetStatus}><IntlMessages id="dataset.reset_status"/></span>
//      { modalId === MODAL_RESET_STATUS && (
//        <Modal isOpen={modalOpen} toggle={handleCancelResetStatus} id="reset-status-modal">
//          <ModalHeader toggle={handleCancelResetStatus} className="modal-header">
//            Reset Status
//          </ModalHeader>
//          <ModalBody>
//            <Container>
//              <Row>
//                <Label for="tye" sm={4}>Selected files:<span className="text-danger">*</span></Label>
//                <Col sm={8} className="col-dropdown-item">
//                  <Select
//                    placeholder="Old Status"
//                    components={{ Input: CustomSelectInput }}
//                    className="react-select"
//                    classNamePrefix="react-select"
//                    name="type"
//                    value={selectedOldStatus}
//                    options={getOldStatus()}
//                    onChange={handleChangeOldStatus}
//                  />
//                  { errorOldStatus ? (
//                    <div className="invalid-feedback d-block">
//                      {
//                        <IntlMessages id="forms.dataset-status"/>
//                      }
//                    </div>
//                  ) : null}
//                </Col>
//              </Row>
//              <br/>
//              <Row>
//                <Label for="status" sm={4}>New Status:<span className="text-danger">*</span></Label>
//                <Col sm={8} className="col-dropdown-item">
//                  <Select
//                    placeholder="New Status"
//                    components={{ Input: CustomSelectInput }}
//                    className="react-select required"
//                    classNamePrefix="react-select"
//                    name="status"
//                    value={selectedNewStatus}
//                    options={getStatus()}
//                    onChange={handleChangeNewStatus}
//                  />
//                  { errorNewStatus ? (
//                    <div className="invalid-feedback d-block">
//                      {
//                        <IntlMessages id="forms.dataset-status"/>
//                      }
//                    </div>
//                  ) : null}
//                </Col>
//              </Row>
//              <br/>
//              {
//                processResetStatus && (
//                  <div className="justify-content-center spinner-align-center">
//                    <Spinner color="primary" className="mb-1 spinner-content"/>
//                  </div>
//                )
//              }
//            </Container>
//          </ModalBody>
//          <ModalFooter>
//            <Button color="light" className="custom-button-light" onClick={handleCancelResetStatus}>
//              Cancel
//            </Button>
//            <Button color="primary" onClick={resetStatus}>
//              Save
//           </Button>
//          </ModalFooter>
//        </Modal>
//      )}
//      <div className="popup">
//        <PopupSuccessError
//          modalId={modalId}
//          modal={modalOpen}
//          toggle={toggle}
//          handleOnClosePopupSuccessError={handleOnClosePopupSuccessError}
//          message={modalMessage}
//        />
//      </div>
//    </div>
//  )
// };

// ResetStatus.propTypes = {
//  projectId: string,
//  datasetId: string,
//  setSelectedStatus: func,
//  setPageSize: func,
//  handleChangedLabeler: func,
//  status: array,
//  selectedSourceIds: array,
//  resetSourceStatus: func,
//  getListDatasetDetail: func,
//  message: string,
//  error: string,
// };

// const mapStateToProps = ({ projectsApp }) => {
//  const { message, error } = projectsApp;
//  return { message, error };
// };
// export default connect(mapStateToProps, {
//  resetSourceStatus,
//   getListDatasetDetail,
// })(ResetStatus);
