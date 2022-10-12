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
                <div className="nav-link">
                    <ul>
                        <li><a href=""><FaUserCircle className="icon"/>Profile</a></li>  
                        <li><a href=""><FaCertificate className="icon"/>Certificates</a></li>
                        <li><a href=""><BiTransfer className="icon"/>Transfer</a></li>       
                    </ul>
                </div>

                <div className="user-profile">
                    <img className="user-icon" src="./img/default_user.png" alt=""/>
                    <div className="profile-display">
                        <ul>
                            <li>
                                <img className="profile-icon" src="./img/default_user.png" alt=""/>
                                <div className="profile-name">
                                    <p>Unnamed User</p>
                                    <p>#12345</p>  
                                </div>
                                <button type="button">View Profile</button>
                            </li> 
                        </ul> 
                    </div>

                </div>

            </nav>
        </div>
	);
};

export default NavBar;
