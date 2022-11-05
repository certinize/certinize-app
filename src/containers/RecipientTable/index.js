import Button from "../../components/Button";
import { addRecipient } from "../../features/issuance/issuanceSlice";
import "./index.css";
import { PublicKey } from "@solana/web3.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const RecipientTable = ({ actionController }) => {
  const dispatch = useDispatch();
  const [recipientList, setRecipientList] = useState([]);

  const deleteRecipient = (index) => {
    const newRecipientList = [...recipientList];
    newRecipientList.splice(index, 1);
    setRecipientList(newRecipientList);
  };

  const createTableRows = () => {
    return recipientList.map((recipient, index) => {
      return (
        <tr className="recipient-table-tr" key={index}>
          <td>{index + 1}</td>
          <td className="recipient-table-txt-truncate">{recipient[0]}</td>
          <td className="recipient-table-txt-truncate">{recipient[1]}</td>
          <td className="recipient-table-txt-truncate">{recipient[2]}</td>
          <td>
            <Button
              styleType="danger"
              onClick={() => deleteRecipient(index)}
              style={{ height: "2.5rem", width: "6.25rem" }}
              text="Remove"
            >
              Remove
            </Button>
          </td>
        </tr>
      );
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const walletAddress = e.target.walletAddress.value;

    try {
      if (!PublicKey.isOnCurve(new PublicKey(walletAddress))) throw new Error();
    } catch (error) {
      alert("Invalid recipient wallet address");
      return;
    }

    const recipient = [
      e.target.elements.recipientName.value,
      e.target.elements.walletAddress.value,
      e.target.elements.emailAddress.value,
    ];

    setRecipientList((oldRecipientList) => [...oldRecipientList, recipient]);

    e.target.reset();
  };

  const handleContinue = () => {
    if (recipientList.length === 0) {
      alert("Please fill in all the fields");
      return;
    }

    recipientList.forEach((recipient) => {
      const recipientObj = {
        recipient_name: recipient[0],
        recipient_pubkey: recipient[1],
        recipient_email: recipient[2],
      };
      dispatch(addRecipient(recipientObj));
    });

    actionController("toTemplateSelection");
  };

  return (
    <div className="container d-flex flex-column my-4">
      <div className="recipient-table-button-set">
        <Button styleType="danger" text="Cancel">
          Cancel
        </Button>
        <Button onClick={handleContinue} text="Continue">
          Continue
        </Button>
      </div>
      <div className="d-flex align-items-center w-100 recipient-table-input-fields">
        <div className="d-flex justify-content-center align-items-start mt-5 w-100">
          <div className="w-75">
            <form
              className="content-form"
              onSubmit={handleOnSubmit}
              id="recipientForm"
            >
              <div className="form-group mx-2">
                <label
                  className="form-label recipient-table-label"
                  htmlFor="recipientName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control recipient-table-input"
                  name="recipientName"
                  id="recipientName"
                  aria-describedby="recipient-name"
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="form-group mx-2">
                <label
                  className="form-label recipient-table-label"
                  htmlFor="walletAddress"
                >
                  Wallet Address
                </label>
                <input
                  type="text"
                  className="form-control  recipient-table-input"
                  name="walletAddress"
                  id="walletAddress"
                  aria-describedby="wallet-address"
                  placeholder="Enter Wallet Address"
                  required
                />
              </div>
              <div className="form-group mx-2">
                <label
                  className="form-label recipient-table-label"
                  htmlFor="walletAddress"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control recipient-table-input"
                  name="emailAddress"
                  id="emailAddress"
                  aria-describedby="email-address"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="recipient-table-add-btn">
                <Button type="submit" text="Add Recipient">
                  Add
                </Button>
              </div>
            </form>

            <div className="recipient-table-user-view">
              <table className="table table-borderless table-hover table-responsive">
                <thead>
                  <tr className="recipient-table-tr">
                    <th className="number-col">
                      <p>#</p>
                    </th>
                    <th className="w-25">
                      <p>Name</p>
                    </th>
                    <th className="w-25">
                      <p>Wallet Address</p>
                    </th>
                    <th className="w-25">
                      <p>Email</p>
                    </th>
                    <th className="w-25"></th>
                  </tr>
                </thead>
                <tbody>{createTableRows()}</tbody>
              </table>
            </div>
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
