import "./index.css";
import React from "react";

const Success = () => {
  return (
    <div className="page-container">
      <div className="content">
        <div className="main-content">
          <div>
            <div className="success-box">
              <div className="success-logo-container">
                <img className="success-logo" src="./img/certinize-logo.png" />
                <img className="check" src="./img/check.png" />
              </div>
            </div>
            <div className="success-msg">
              <p className="msg">Certificate issuance request sent!</p>
              <button className="return-btn" type="submit">
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
