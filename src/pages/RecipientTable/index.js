import Button from "../../components/Button/Button";
import Modal from "../../components/Modal";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React, { useState } from "react";

const RecipientTable = ({ actionController }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setOpenModal(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, []);

  return (
    <div>
      <div className="certinize-modal" id="modal">
        <Modal
          open={openModal}
          title="Issue Certificate"
          onClose={() => setOpenModal(false)}
        >
          <div className="certinize-modal-body">
            Distribute certificate to five (5) recipients?
          </div>
          <div className="modal-btn-group">
            <div className="btn-group-col">
              <Button text="Cancel" styleType="danger" />
              <Button text="Transfer" />
            </div>
          </div>
        </Modal>
      </div>
      <div className="d-flex justify-content-center align-items-start mt-5">
        <div className="w-75">
          <form className="content-form">
            <div className="form-group">
              <label className="form-label" htmlFor="recipientName">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="recipientName"
                aria-describedby="recipientName"
                placeholder="Enter Full Name"
              />
            </div>
            <div className="form-group mx-5">
              <label className="form-label" htmlFor="walletAddress">
                Wallet Address
              </label>
              <input
                type="text"
                className="form-control"
                id="walletAddress"
                aria-describedby="walletAddress"
                placeholder="Enter Wallet Address"
              />
            </div>
            <Button
              text="Add"
              type="submit"
              style={{ margin: 0, width: "10%", height: "50px" }}
            />
          </form>

          <div className="user-table">
            <table className="table table-borderless table-hover table-responsive">
              <thead>
                <tr>
                  <th>
                    <p>#</p>
                  </th>
                  <th>
                    <p>Name</p>
                  </th>
                  <th>
                    <p>Blockchain Address</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan Dela Cruz</td>
                  <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Franz Ronin Manrique</td>
                  <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mindy Kay Zaracena</td>
                  <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Hju Kneyck Flores</td>
                  <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Jose Tan Jr.</td>
                  <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="button-set">
            <Button
              text="Continue"
              onClick={() => actionController("toSelectTemplate")}
            />
            <Button text="Cancel" styleType="danger" />
          </div>
        </div>
      </div>
    </div>
  );
};

RecipientTable.propTypes = {
  actionController: PropTypes.func,
};

export default RecipientTable;
