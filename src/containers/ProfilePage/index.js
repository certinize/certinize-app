import React, { } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
	return (
        <>
        <header>
            <p>My Profile</p>
        </header>
        <div className="main">
            <div className="user">
                <div className="profile">
                    <img src="./img/default_user2.png" alt="" />   
                </div>
                <div className="profile-text">
                    <p>Unnamed User</p>
                    <p>Joined since 2022</p>
                </div>
                <div className="text-center">
                    <input type="submit" name="orgID" value="Return Home"/>
                </div>
                        
            </div>
            <div className="details">
                <p className="text">My verification links...</p>
                <form>
                    <label>Wallet Address</label>
                    <p>B7KNk9UWUGig89N-muCvuzNcboNmOYCOto@B52638HU</p>
                    <label>Email Address</label>
                    <p>user@gmail.com</p>
                    <label>Official Website</label>
                    <p>samplelink.com</p>
                    <label>Google Trend Link</label>
                    <p>trend link</p>
                </form>
            </div>
        </div>



        </>
	);
};

export default ProfilePage;

