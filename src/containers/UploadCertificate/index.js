import NavBar from "../../components/NavBar/NavBar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { AiOutlineFileAdd, AiFillDelete } from "react-icons/ai";

const UploadCertificate = () => {
  const [selectedFiles, setselectedFiles] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const filesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setselectedFiles((previousFiles) => previousFiles.concat(filesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(file) {
    setselectedFiles(selectedFiles.filter((e) => e !== file));
    URL.revokeObjectURL(file);
  }

  return (
    <section>
      <NavBar />
      <div className="title">
        <p>Upload Certificate </p>
      </div>
      <hr />
      <div className="container">
        <div className="uploadContainer">
          <div className="dashed-line">
            <div className="uploadBtn">
              <label>
                <AiOutlineFileAdd className="icon" />
                <span>Upload Certificate</span>
                <input
                  type="file"
                  name="file"
                  onChange={onSelectFile}
                  accept="image/png , image/jpeg, image/webp"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <p className="header">Upload Preview</p>
      <div className="file-preview">
        {selectedFiles &&
          selectedFiles.map((file) => {
            return (
              <div key={file} className="file-array">
                <img
                  className="certificate-file"
                  src={file}
                  alt="Certificate Template"
                />
                <button className="delete" onClick={() => deleteHandler(file)}>
                  <AiFillDelete className="delete-icon" />
                </button>
              </div>
            );
          })}
      </div>
      <div className="buttonSet">
        <button className="button ctn" type="button">
          Continue
        </button>
        <button className="button cancel" type="button">
          Cancel
        </button>
      </div>
    </section>
  );
};

export default UploadCertificate;
