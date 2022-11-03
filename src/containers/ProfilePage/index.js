import Button from "../../components/Button";
import Header from "../../components/Header/Header";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { verification } = useSelector((state) => state.user);
  const { pubkey } = useSelector((state) => state.user);

  const getVerified = () => {
    window.location.href = "/get-verified";
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

    console.log(verification);
  }, []);

  return (
    <>
      <Header title="Issuer Profile" />
      <div className="main">
        <div className="user">
          <div className="profile-page-avatar-container">
            <img
              className="profile-page-avatar"
              src={verification?.organization_logo}
              alt="Organization Logo"
            />
          </div>
          <div className="profile-text">
            <p>{verification?.organization_name}</p>
            <p>
              {verification?.verified_on
                ? `Verified since ${verification.verified_on}`
                : showGetVerifiedBtn()}
            </p>
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
