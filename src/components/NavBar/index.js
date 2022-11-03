import { resetIssuance } from "../../features/issuance/issuanceSlice";
import { resetSelectedTemplate } from "../../features/template/templateSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BiTransfer } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleOnclick = () => {
    dispatch(resetIssuance());
    dispatch(resetSelectedTemplate());
  };

  return (
    <div>
      <nav className="navbar">
        <input id="nav-toggle" type="checkbox" />
        <div className="navbar-logo">
          <img  src="./img/certinize-logo.png" alt="" />
          Certinize
        </div>
        <ul className="navbar-link">
          <li>
            <Link to="/transfer" onClick={handleOnclick}>
              <BiTransfer className="navbar-icon" /> Transfer
            </Link>
          </li>
          <li>
            <Link to="/certificates" onClick={handleOnclick}>
              <FaCertificate className="navbar-icon" />
              Certificates
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleOnclick}>
              <RiTeamFill className="navbar-icon" />
              Profile
            </Link>
          </li>
          <Link onClick={handleOnclick}>
            <img className="user-icon" src="./img/default_user.png" alt="" />
          </Link>
        </ul>

        <label htmlFor="nav-toggle" className="icon-burger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </label>
      </nav>
    </div>
  );
};

export default NavBar;
