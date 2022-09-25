import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Success.css";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="page-container">
      <SideNavBar />
      <div className="content">
        <div>
          <div className="success-box">
            <div className="logo-container">
              <img className="logo" src="./img/certinize-logo.png" />
              <img className="check" src="./img/check.png" />
            </div>
          </div>
          <div className="success-msg">
            <p className="msg">Certificate sent Successfully</p>
            <button className="return-btn" type="submit">
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
