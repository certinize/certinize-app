import Button from "../../components/Button";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CollectionCertificate = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/upload-certificate");
  };

  return (
    <>
      <NavBar />
      <Header title="Welcome to Certinize" />

      <div className="col-cert-container">
        <div className="col-cert-upload-btn">
          <Button text="Upload Certificate Template" onClick={onClick}>
            <div className="col-cert-upload-btn-content">
              <AiOutlineUpload />
              <span>Upload Certificate Template</span>
            </div>
          </Button>
        </div>

        <div className="col-cert-template-container">
          <a href="#thumb" aria-label="Certificate Template Thumbnail">
            <img
              className="certi"
              src="./img/certificate.jpg"
              alt="Template Thumbnail"
            />
          </a>
          <a href="#thumb" aria-label="Certificate Template Thumbnail">
            <img
              className="certi"
              src="./img/certificate.jpg"
              alt="Template Thumbnail"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default CollectionCertificate;
