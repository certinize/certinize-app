import Button from "../../components/Button";
import avatar from "./default_avatar.png";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { verification } = useSelector((state) => state.user);
  const { pubkey } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getVerified = () => {
    navigate("/issuer-verification");
  };

  const showGetVerifiedBtn = () => {
    return (
      <div className="profile-get-verified-btn">
        <Button text="Get Verified" onClick={getVerified}>
          <div className="profile-get-verified-btn-txt"> Get Verified</div>
        </Button>
      </div>
    );
  };

  React.useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <>
      <div className="main">
        <div className="user">
          <div className="profile-page-avatar-container">
            <img
              className="profile-page-avatar"
              src={verification?.organization_logo || avatar}
              alt="Organization Logo"
            />
          </div>
          <div className="profile-text">
            <p>{verification?.organization_name}</p>
            {verification?.verified_on
              ? `Verified since ${verification.verified_on}`
              : showGetVerifiedBtn()}
          </div>
        </div>
        <div className="details">
          <p className="text">Issuer Information</p>
          <form className="profile-page-form">
            <label>Wallet Address</label>
            <p>{pubkey}</p>
            <label>Official Email</label>
            <p>{verification?.official_email}</p>
            <label>Official Website</label>
            <p>{verification?.official_website}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
