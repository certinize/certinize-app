import React, { } from "react";
import "./NavBar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiTransfer } from "react-icons/bi";
// import { BsFillBellFill } from "react-icons/bs";
import { FaCertificate, FaUserCircle } from "react-icons/fa";

const NavBar = () => {
	return (
        <div>
            <nav className="navbar">
                <div className="nav-header">
                    <img className="logo" src="./img/certinize-logo.png" alt="" />
                    <span className="certinize">Certinize</span>
                </div>
                <ul>
                    <li><a href=""><FaUserCircle className="icon"/>Profile</a></li>  
                    <li><a href=""><FaCertificate className="icon"/>Certificate</a></li>
                    <li><a href=""><BiTransfer className="icon"/>Transfer</a></li>       
                </ul>
                <div className="user-profile">
                    <div className="col">
                        <span className="name">Unnamed User</span>
                        <span className="name">#12376412748</span>
                    </div>


                    <img className="user-icon" src="./img/default_user.png" alt=""/>
                </div>

            </nav>
        </div>
	);
};

export default NavBar;
