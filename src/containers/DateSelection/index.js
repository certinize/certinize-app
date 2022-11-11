import Button from "../../components/Button";
import { setIssuanceDate } from "../../features/issuance/issuanceSlice";
import styles from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

const DateSelection = ({ actionController }) => {
  const dispatch = useDispatch();
  const [date, setDate] = React.useState("");

  const handleContinue = () => {
    if (date === "") {
      alert("Please select a date");
      return;
    }

    dispatch(setIssuanceDate(date));
    actionController("toRecipientTable");
  };

  return (
    <div className="container justify-content-center align-items-center d-flex flex-column my-4">
      <div className={`${styles.selectDateBtnContainer} align-self-end`}>
        <div className="w-50">
          <Button styleType="primary" text="Next" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
      <div className={`${styles.selectDateContent}`}>
        <div className="form-group w-50">
          <label
            className="form-label recipient-table-label"
            htmlFor="issuanceDate"
          >
            Issuance Date
          </label>
          <input
            type="date"
            className="form-control recipient-table-input"
            name="issuanceDate"
            id="issuanceDate"
            aria-describedby="issuance-date"
            placeholder="Enter certificate issuance date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
        </div>
      </div>
    </div>
  );
};

DateSelection.propTypes = {
  actionController: PropTypes.func,
};

export default DateSelection;
