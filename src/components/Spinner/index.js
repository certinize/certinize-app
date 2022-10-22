import { PropTypes } from "prop-types";
import React from "react";

const Spinner = ({ id }) => {
  return (
    <div className="lds-container" id={id}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  id: PropTypes.string,
};

export default Spinner;
