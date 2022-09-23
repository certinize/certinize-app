import React, { } from "react";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiTransfer } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { FaCertificate } from "react-icons/fa";

const Navbar = () => {
	return (
        <div>
            <nav className="navbar">
                <div className="nav-header">
                    <img className="logo" src="./img/certinize-logo.png" alt="" />
                    <span className="certinize">Certinize</span>
                </div>
                <ul>
                    <li><BsFillBellFill/><a href="news.asp">Notifcation</a></li>  
                    <li><FaCertificate/><a href="contact.asp">Certificate</a></li>
                    <li><BiTransfer/><a href="about.asp">Transfer</a></li>       
                </ul>
                <div>
                
                </div>
            </nav>
        </div>
	);
};

export default Navbar;
