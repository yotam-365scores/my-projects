// reactstrap Modal wrapper
import React from "react"


import { Modal, ModalHeader, ModalFooter, } from "reactstrap"

const [isModalOpen, setModalOpen] = React.useState(false);

const modalChange = (isOpen = undefined) => {
  if (isOpen !== undefined) {
    setModalOpen(isOpen);
  } else {
    setModalOpen(!isModalOpen);
  }
};

// todo: from src\pages\Dashboard\index.js
const modal = (
  <Modal
    isOpen={isModalOpen}
    toggle={() => {
      modalChange();
    }}
  >
    <ModalHeader>
      <h5 className="modal-title mt-0" id="myModalLabel">
        Modal Heading
      </h5>
      <button
        type="button"
        onClick={() => {
          modalChange(false);
        }}
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </ModalHeader>

    <div className="modal-body">
      <h5>Overflowing text to show scroll behavior</h5>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </p>
    </div>

    <ModalFooter>
      <button
        type="button"
        onClick={() => {
          modalChange(false);
        }}
        className="btn btn-secondary waves-effect"
        data-dismiss="modal"
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-primary waves-effect waves-light"
        data-dismiss="modal"
        onClick={() => {
          console.log("Modal Ok");
          modalChange(false);
        }}
      >
        Save changes
      </button>
    </ModalFooter>
  </Modal>
);

const btn = (
  <button
    type="button"
    onClick={() => {
      modalChange();
    }}
    className="btn btn-primary waves-effect waves-light"
    data-toggle="modal"
    data-target="#myModal"
  >
    Standard Modal
  </button>
);

export default Modal
