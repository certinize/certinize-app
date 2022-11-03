/* eslint-disable no-unused-vars */
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import React, {useState} from "react";

const VerificationView = () => {
  const [input, setInput] = useState();
  const [openModal, setOpenModal] = React.useState(false);
  const showElement = () => {
    document.getElementById("message").style.display = "block";
  }
  return (
    <>
      <div className="certinize-modal" id="modal">
        <Modal
          open={openModal}
          title="Verification Message"
          onClose={() => setOpenModal(false)}
        >
          <div className="certinize-modal-body">
            User is now verified
          </div>
          <div className="modal-btn-group">
            <div className="btn-group-col">
            <Button
                onClick={() => setOpenModal(false)}
                text="Confirm"
              >
                Confirm
              </Button>
            </div>
          </div>
          
        </Modal>
      </div>

    <div className="verification-container">
        <div className="input-form-field">
            <p className="verification-input-header">User Verification</p>
            <fieldset className="verification-fieldset">
                <label className="verification-label">Enter Wallet Address</label>
                <input className="verification-input" type="" name="" value={input}/>
            </fieldset>
          <button
            className="verification-button" onClick={() => setOpenModal(true)} >
            Verify User
          </button>

        </div>
    </div>

      
    </>
  );
};

export default VerificationView;
