/* eslint-disable react/display-name */

/* eslint-disable react/prop-types */
import { resetIssuance } from "../../features/issuance/issuanceSlice";
import { resetSelectedTemplate } from "../../features/template/templateSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BiTransfer } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetGlobalState = () => {
    dispatch(resetIssuance());
    dispatch(resetSelectedTemplate());
  };

  const handleLogoClick = () => {
    resetGlobalState();
    navigate("/");
  };

  const handleOnclick = () => {
    resetGlobalState();
  };

  return (
    <div>
      <nav className="navbar">
        <a className="navbar-logo" onClick={handleLogoClick}>
          <img src="./img/certinize-logo.png" alt="" />
          Certinize
        </a>
        <ul className="navbar-link">
          <li className="navbar-link-li">
            <Link
              to="/issuance"
              onClick={handleOnclick}
              className="navbar-link-a"
            >
              <BiTransfer className="navbar-icon" />
              Issuance
            </Link>
          </li>
          <li className="navbar-link-li">
            <Link
              to="/certificate"
              onClick={handleOnclick}
              className="navbar-link-a"
            >
              <FaCertificate className="navbar-icon" />
              Certificate Template
            </Link>
          </li>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
              <img className="user-icon" src="./img/default_user.png" alt="" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-4 shadow-sm">
              <Dropdown.Item onClick={() => navigate("/profile")}>
                <div className="d-flex gap-2 align-items-center">
                  <RiTeamFill />
                  Profile
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>

        <label htmlFor="nav-toggle" className="icon-burger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </label>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
