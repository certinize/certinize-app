import React, { } from "react";
import "./AboutUs.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../../components/NavBar/NavBar";


const AboutUs = () => {
	return (
        <>
            <NavBar/>
            <div className='main'>
            <div className='background'>
                <div className="flex">
                    <img src ="./img/certinize-logo.png" alt="" className='cert-logo' />
                </div>
                <p className='certinize-title'>Certinize</p>
            </div>
            <div>
                <p className='text-title'>Securing your e-Certificates on a new level </p>
                <p className='definition'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p> 
            </div>
                <div className="wrapper">
                <h1 className='title'> Meet Our Team</h1>
                <div className="our_team">
                    <div className="team_member">
                        <img className="member_img" src ="./img/hju.jpg" alt="our_team" />
                        <h3>Hju Kneyck Flores</h3>
                        <span>Backend Developer</span>
                    </div>
                    <div className="team_member">
                        <img className="member_img" src ="./img/mindy.png" alt="our_team" />   
                        <h3>Mindy Kay Zaracena</h3>
                        <span>Frontend Developer</span>                  
                    </div>
                    <div className="team_member">
                        <img className="member_img" src ="./img/franz.jpg" alt="our_team" />    
                        <h3>Franz Ronin Manrique</h3>
                        <span>Frontend Developer</span>
                    </div>  
                </div>

                </div>

            </div>
            <footer>
                <p>All Rights Reserved 2022</p>
            </footer>
        </>
  
	);
};

export default AboutUs;
