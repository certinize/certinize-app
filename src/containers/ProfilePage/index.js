import Header from "../../components/Header/Header";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Header title="My Profile" />
      <div className="main">
        <div className="user">
          <div className="profile-page-avatar-container">
            <img
              className="profile-page-avatar"
              src="./img/default_user2.png"
              alt=""
            />
          </div>
          <div className="profile-text">
            <p>Unnamed User</p>
            <p>Joined since 2022</p>
          </div>
        </div>
        <div className="details">
          <p className="text">My verification links...</p>
          <form className="profile-page-form">
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
