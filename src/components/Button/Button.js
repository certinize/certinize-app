// Reusable button component without using any css library or framework
import "./Button.css";
import PropTypes from "prop-types";
import React from "react";

const Button = ({ text, style, onClick  }) => (
  <button className="button" style={style} onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
