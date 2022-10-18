import React, { } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiTransfer } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";

const NavBar = () => {
	return (
        <div>
            <nav>
                <input id="nav-toggle" type="checkbox"/>
                <div className="logo">
                    <img src="./img/certinize-logo.png" alt="" /> 
                    Certinize
                </div>
                <ul className="links">
                    <li><Link to="/transfer"><BiTransfer className="icon"/> Transfer</Link></li>
                    <li><Link to="/certificates"><FaCertificate className="icon"/>Certificates</Link></li>
                    <li><Link to="/profile"><RiTeamFill className="icon"/>My Profile</Link></li>
                    <Link><img className="user-icon" src="./img/default_user.png" alt=""/></Link>
                </ul>

                <label htmlFor="nav-toggle" className="icon-burger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </label>
            </nav>
            <section className="divider"/>
        </div>
	);
};

export default NavBar;

