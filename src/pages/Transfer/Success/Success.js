import React, {  } from "react";
import "./Success.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const SuccessPage = () => {
    
	return (
        <div>
            <div className="title">
                <p>Distribute Certificate </p>
            </div>
            <hr/>
            <body>
                <div className="success-box">
                    <div className="content">
                        <img className="logo" src="./img/certinize-logo.png"/>
                        <img className="check" src="./img/check.png"/>  
                    </div>
                </div>
                <div className="success-msg">
                    <p className="msg">Certificate sent Successfully</p>
                    <button className="return-btn" type="submit">Return Home</button>
                </div>
                
                
            </body>
        </div>
        
	);
};

export default SuccessPage;
