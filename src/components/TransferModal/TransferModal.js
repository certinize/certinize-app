import "./TransferModal.css";
import PropTypes from "prop-types";
import React from "react";

export default function TransferModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div id="certinizeModal" className="overlay">
      <div className="container">
        <p className="definition">
          Transfer Certificate to  Recipients?
        </p>
        <div className="buttonBtn">
          <button className="transferbtn">Transfer</button>
          <button className="cancelbtn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

TransferModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.func,
  numRecipients: PropTypes.number.isRequired,
};
