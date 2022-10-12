import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" />
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
