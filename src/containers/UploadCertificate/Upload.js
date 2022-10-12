import React, { useState } from 'react'
import './Upload.css';
import FormData from "form-data";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


const UploadCertificate = () => {
    const [file, setFile] = useState(null);
    const upload = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file);
        Axios.post("http://localhost:4000/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            console.log("Success ", res);
        });
    };
    return (
        <div className="upload-int">
            <div className="title">
                <p>Upload Certificate </p>
            </div>
            <hr />
            <div className='container'>
                <div className='uploadContainer'>
                    <div className='dashed-line'>
                        <div className='uploadBtn'>
                            <label htmlFor="file">
                                Upload Certificate
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>

                </div>
                <div className="buttonSet">
                    <button className="button ctn" type="button" onClick={(e) => upload(e)}>Continue</button>
                    <button  className="button cancel" type="button">Cancel</button>
                </div>


            </div>

        </div>
    );
}

export default UploadCertificate;
