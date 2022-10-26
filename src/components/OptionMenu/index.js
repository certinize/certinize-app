import styles from "./index.module.css";
import PropTypes from "prop-types";
import React from "react";

const OptionMenu = ({ options }) => {
  const createListItems = () => {
    return options.map((option) => (
      <li className={styles.option} key={option.id}>
        <a href={option.link}>
          {option.icon}
          {option.name}
        </a>
      </li>
    ));
  };

  return <ul className={styles.optionMenu}>{createListItems()}</ul>;
};

OptionMenu.propTypes = {
  options: PropTypes.array.isRequired,
};

export default OptionMenu;
