import { Modal, Alert, Spinner } from "reactstrap";

// default Props for intellisense
export const Loader = (props = {loader: true}) => {
  const { loader } = props;

  if (!loader) {
    return null;
  }

  const modalBody = (
    <div className="modal-body">
      <p className="mb-0">
        {/* size="sm" */}
        <Spinner color="success">Loading...</Spinner>
      </p>
    </div>
  );

  /* modalClassName="modalClassName" 
    contentClassName="contentClassName" wrapClassName="wrapClassName" 
    backdropClassName="backdropClassName" className="className" */
  return (
    <Modal modalClassName="d-flex justify-content-around align-items-center" 
      size="sm"
      isOpen="true">
      <Alert color="info" role="loader" className="mb-0">
        {modalBody}
      </Alert>
    </Modal>
  );
};
