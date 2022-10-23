import "./ToolCategory.css";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

export default function ToolCategory({
  label,
  first,
  second,
  firstCallback,
  secondCallback,
  styleDefaultValue,
  sizeDefaultValue,
}) {
  return (
    <div className="tool-category">
      <h3 className="tool-category-label">{label}</h3>
      <div className="font-menu">
        <label htmlFor="style" className="input-label">
          Style
        </label>
        <Select
          className="select-option"
          options={first}
          isSearchable={false}
          defaultValue={styleDefaultValue}
          id="style"
          onChange={(option) => {
            firstCallback(option);
          }}
        />
        <label htmlFor="size" className="input-label">
          Size
        </label>
        <Select
          className="select-option"
          options={second}
          id="size"
          defaultValue={sizeDefaultValue}
          onChange={(option) => {
            secondCallback(option);
          }}
          placeholder="Select size..."
        />
      </div>
    </div>
  );
}

ToolCategory.propTypes = {
  label: PropTypes.string.isRequired,
  first: PropTypes.array.isRequired,
  second: PropTypes.array.isRequired,
  firstCallback: PropTypes.func.isRequired,
  secondCallback: PropTypes.func.isRequired,
  styleDefaultValue: PropTypes.object,
  sizeDefaultValue: PropTypes.object,
};
