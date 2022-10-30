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
      <nav>
        <input id="nav-toggle" type="checkbox" />
        <div className="logo">
          <img src="./img/certinize-logo.png" alt="" />
          Certinize
        </div>
        <ul className="links">
          <li>
            <Link to="/transfer" onClick={handleOnclick}>
              <BiTransfer className="icon" /> Transfer
            </Link>
          </li>
          <li>
            <Link to="/certificates" onClick={handleOnclick}>
              <FaCertificate className="icon" />
              Certificates
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleOnclick}>
              <RiTeamFill className="icon" />
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
      <section className="divider" />
    </div>
  );
};

export default NavBar;
