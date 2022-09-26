import React, {  } from "react";
import "./Select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const SelectCertificate = () => {
    
	return (
        <div>
            <div className="title">
                <p>Distribute Certificate </p>
            </div>
            <hr/>
            <body>
                <div>
                    <h3 className="head">Select Certificate</h3>
                </div>
                <div className="certi-grid">
                    
                </div>

                {/* Navigation Buttons */}
                <div className="buttonSet">
                    <button className="button ctn" type="button">Continue</button>
                    <button  className="button cancel" type="button">Cancel</button>
                </div>
            </body>
        </div>
        
	);
};

export default SelectCertificate;
