import { getTemplates } from "../../api/TemplateAPI";
import Button from "../../components/Button";
import Header from "../../components/Header/Header";
import Thumbnail from "../../components/Thumbnail";
import { setTemplates } from "../../features/template/templateSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CollectionCertificate = () => {
  const templates = useSelector((state) => state.template.templates);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/upload");
  };

  React.useEffect(() => {
    if (templates.length === 0) {
      getTemplates().then((res) => {
        dispatch(setTemplates(res.templates));
      });
    }
  });

  return (
    <>
      <Header title="Certificate Templates" />

      <div className="col-cert-container">
        <div className="col-cert-upload-btn">
          <Button text="Upload Certificate Template" onClick={onClick}>
            <div className="col-cert-upload-btn-content">
              <AiOutlineUpload />
              <span>Upload Certificate Template</span>
            </div>
          </Button>
        </div>

        <div className="col-cert-thumbnail-container">
          {templates.map((template, index) => {
            return <Thumbnail key={index} src={template.template_url} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CollectionCertificate;
