/* <Toast alert={alert} hideError={props.hideError} /> */

import { useState } from "react";

import { Button, Modal, Alert } from "reactstrap";

// default Props for intellisense
const alert = {
  color: undefined,
  message: undefined,
  header: undefined,
};
const hideError = () => {};
const defaultProps = { alert, hideError };

export const Toast = (props = defaultProps) => {
  const { alert, hideError } = props;
  const [modal_small, setmodal_small] = useState(true);

  if (!alert) {
    return null;
  }

  const closeButton = (
    <Button
      onClick={() => {
        setmodal_small(false);
        if (hideError) {
          hideError();
        }
      }}
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </Button>
  );

  const modalHeader = alert.header ? (
    <div className="modal-header">
      <h5 className="modal-title mt-0">
        {alert.header || "Default Alert header"}
      </h5>
      {closeButton}
    </div>
  ) : null;

  const modalBody = alert.message ? (
    <div className="modal-body">
      <p className="mb-0">
        {alert.message || "this is the default Alert message"}
        {/* no header => add closeButton to Body */}
        {alert.header ? null : closeButton}
      </p>
    </div>
  ) : null;

  return (
    <Modal
      size="sm"
      isOpen={modal_small}
      toggle={() => {
        let isClose = modal_small;
        setmodal_small(!modal_small);
        if (isClose) {
          if (hideError) {
            hideError();
          }
        }
      }}
    >
      <Alert color={alert.color || "info"} role="alert" className="mb-0">
        {modalHeader}
        {modalBody}
      </Alert>
    </Modal>
  );
};
