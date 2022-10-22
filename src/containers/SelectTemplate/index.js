import Button from "../../components/Button";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React from "react";

const SelectTemplate = ({ actionController }) => {
  return (
    <div>
      <div>
        <div className="certi-grid"></div>
        <div className="button-set">
          <Button
            onClick={() => actionController("toEditTemplate")}
            text="Continue"
          >
            Continue
          </Button>
          <Button styleType="danger" text="Cancel">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

SelectTemplate.propTypes = {
  actionController: PropTypes.func,
};

export default SelectTemplate;
