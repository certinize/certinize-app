import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { FiUpload } from "react-icons/fi";
import NavBar from "../../components/NavBar";

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
          <button className="upload" type="button"> 
            <FiUpload className="icon"/>
            Upload Certificate Template
          </button>
        </div>

        <div>
          <div className="grid">

            <a className="thumbnail" href="#thumb">
              <img className="certi" src="./img/certificate.jpg"/>
              <span>
                <img className="certi-preview" src="./img/certificate.jpg" />
              </span>
            </a>
            <a className="thumbnail" href="#thumb">
              <img className="certi" src="./img/certificate.jpg"/>
              <span>
                <img className="certi-preview" src="./img/certificate.jpg" />
              </span>
            </a>
            <a className="thumbnail" href="#thumb">
              <img className="certi" src="./img/certificate.jpg"/>
              <span>
                <img className="certi-preview" src="./img/certificate.jpg" />
              </span>
            </a>


          </div>
        </div>
  </>

  );
};

export default CollectionCertificate;
