import "./index.css";
import PropTypes from "prop-types";
import React from "react";

function Button({ text, type, style, styleType, onClick }) {
  var className = "certinize-btn-primary";

  switch (styleType) {
    case "primary":
      className = "certinize-btn-primary";
      break;
    case "danger":
      className = "certinize-btn-danger";
      break;
    case "success":
      className = "certinize-btn-success";
      break;
    case "warning":
      className = "certinize-btn-warning";
      break;
    case "info":
      className = "certinize-btn-info";
      break;
    case "light":
      className = "certinize-btn-light";
      break;
    case "dark":
      className = "certinize-btn-dark";
      break;
    default:
      className = "certinize-btn-primary";
      break;
  }

  return (
    <button
      className={className}
      type={type || "button"}
      style={style}
      onClick={onClick}
      value={text}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  styleType: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
