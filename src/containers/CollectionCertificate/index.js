import Button from "../../components/Button";
// import { FiUpload } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const CollectionCertificate = () => {
  return (
    <>
      <NavBar />
      <h1> Welcome to Certinize </h1>
      <div className="heading">
        <h5 className="latest"> Latest recieved</h5>
        <hr className="line" />
      </div>


      <Button>Test</Button>

      <div>
        <div className="grid">
          <a className="thumbnail" href="#thumb">
            <img className="certi" src="./img/certificate.jpg" />
          </a>
          <a className="thumbnail" href="#thumb">
            <img className="certi" src="./img/certificate.jpg" />
          </a>
        </div>
      </div>
    </>
  );
};

export default CollectionCertificate;
