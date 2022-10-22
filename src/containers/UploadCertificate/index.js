import Button from "../../components/Button";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  AiOutlineFileAdd,
  AiFillDelete,
  AiOutlineUpload,
} from "react-icons/ai";

const UploadCertificate = () => {
  const [selectedFiles, setselectedFiles] = useState([]);

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const filesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setselectedFiles((previousFiles) => previousFiles.concat(filesArray));

    // FOR BUG IN CHROME
    e.target.value = "";
  };

  const deleteHandler = (file) => {
    setselectedFiles(selectedFiles.filter((e) => e !== file));
    URL.revokeObjectURL(file);
  };

  // if the browser supports DataTransferItemList interface, the getAsFile() method is used to
  // access each file; otherwise the DataTransfer interface's files property is used to access each
  // file.
  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          setselectedFiles((previousFiles) => [
            ...previousFiles,
            URL.createObjectURL(file),
          ]);
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`file[${i}].name = ${file.name}`);
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <NavBar />
      <Header title="Upload Certificate Template" />
      <div className="upload-cert-content">
        <div className="upload-cert-button-set">
          <div className="upload-cert-upload-btn">
            <Button text="Upload Selected">
              <div className="upload-cert-upload-btn-content">
                <AiOutlineUpload />
                <span>Upload Selected</span>
              </div>
            </Button>
          </div>
          <div className="upload-cert-cancel-btn">
            <Button text="Cancel" styleType="danger">
              Cancel
            </Button>
          </div>
        </div>
        <div className="container mt-5 d-flex justify-content-center">
          <label className="upload-container" id="uploadContainer">
            <div
              id="dropEcertTemplate"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="dashed-line">
                <div className="upload-btn">
                  <div className="upload-cert-instruction-btn">
                    <AiOutlineFileAdd />
                    <span>Select files / Drop files here</span>
                    <input
                      className="upload-cert-input-file"
                      type="file"
                      name="file"
                      onChange={onSelectFile}
                      accept="image/png, image/jpeg, image/webp"
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

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
                  <button
                    className="delete"
                    onClick={() => deleteHandler(file)}
                  >
                    <AiFillDelete className="delete-icon" />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default UploadCertificate;
