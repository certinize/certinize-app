import React, { } from "react";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BiTransfer } from "react-icons/bi";
// import { BsFillBellFill } from "react-icons/bs";
// import { FaCertificate } from "react-icons/fa";

const Navbar = () => {
	return (
        <div>
            <nav className="navbar">
                <div className="nav-header">
                    <img className="logo" src="./img/certinize-logo.png" alt="" />
                    <span className="certinize">Certinize</span>
                </div>
                <ul>
                    <li><a href="">Notifcation</a></li>  
                    <li><a href="">Certificate</a></li>
                    <li><a href="">Transfer</a></li>       
                </ul>
                <div className="user-profile">
                    <span className="name">Unnamed User</span>
                    <img className="user-icon" src="./img/default_user.png" alt=""/>
                    

                </div>

            </nav>
        </div>
	);
};

export default Navbar;
