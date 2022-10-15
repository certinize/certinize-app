import React, { } from "react";
import "./index.css";
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
                    <li><a href="#home"><BiTransfer className="icon"/> Transfer</a></li>
                    <li><a href="#about"><FaCertificate className="icon"/>Certificates</a></li>
                    <li><a href="#work"><RiTeamFill className="icon"/>About Us</a></li>
                    <img className="user-icon" src="./img/default_user.png" alt=""/>
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

