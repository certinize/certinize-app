import "./CollectionCertificate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { FiUpload } from "react-icons/fi";
import NavBar from "../../components/NavBar/NavBar";

const CollectionCertificate = () => {
  return (
    <>
      <NavBar/>
      <h1> Welcome to Certinize </h1>
        <div className="heading">
          <h5 className='latest'> Latest recieved</h5>
            <hr className='line' />
        </div>

        <div className="btn-container">
          <button className="upload" type="button"><FiUpload className="icon"/> Upload Certificate Template</button>
        </div>

        <div>
          <div className="grid">
            <img className="certi" src="./img/certificate.jpg" alt="" />
            <img className="certi" src="./img/certificate.jpg" alt="" />
            <img className="certi" src="./img/certificate.jpg" alt="" />
            <img className="certi" src="./img/certificate.jpg" alt="" />
            <img className="certi" src="./img/certificate.jpg" alt="" />
            <img className="certi" src="./img/certificate.jpg" alt="" />
          </div>
        </div>
  </>

  );
};

export default CollectionCertificate;
