import "./SideNavBar.css";
import PropTypes from "prop-types";
import React, { useState } from "react";

const SideNavBar = (props) => {
  const [isExpanded, setExpendState] = useState(false);
  const menuItems = [
    {
      text: "Certificates",
      icon: "icons/grid2.svg",
    },
    {
      text: "Transfer",
      icon: "icons/transfer.svg",
    },
    {
      text: "Notifications",
      icon: "icons/notification.svg",
    },
    {
      text: "Profile",
      icon: "icons/user.svg",
    },
  ];
  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img
                className="image"
                src="img/default_user.png"
                alt=""
                srcSet=""
              />
              <div className="user-profile">
                <h3>Unnamed</h3>
                <p>User ID</p>
              </div>
            </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => {
              props.setExpanded(!isExpanded);
              setExpendState(!isExpanded);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon }) => (
            <a
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              href="/"
              key={text}
            >
              <img className="menu-item-icon" src={icon} alt="" srcSet="" />
              {isExpanded && <p>{text}</p>}
            </a>
          ))}
        </div>
      </div>
      <div className="nav-footer">
        {isExpanded && (
          <div className="nav-details">
            <img
              className="nav-footer-avatar"
              src="img/certinize-logo.png"
              alt=""
              srcSet=""
            />
            <p className="nav-footer-user-name">Certinize</p>
          </div>
        )}
      </div>
    </div>
  );
};

SideNavBar.propTypes = {
  setExpanded: PropTypes.func.isRequired,
};

export default SideNavBar;
