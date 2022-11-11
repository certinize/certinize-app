import { getTemplates } from "../../api/TemplateAPI";
import Button from "../../components/Button";
import Thumbnail from "../../components/Thumbnail";
import { setTemplates } from "../../features/template/templateSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CertificateCollection = () => {
  const [fetchedTempaltes, setFetchedTemplates] = React.useState(false);
  const templates = useSelector((state) => state.template.templates);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/upload");
  };

  const showTemplates = () => {
    try {
      templates.map((template, index) => {
        return <Thumbnail key={index} src={template.template_url} />;
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (!fetchedTempaltes) {
      getTemplates().then((res) => {
        dispatch(setTemplates(res.templates));
        setFetchedTemplates(true);
      });
    }
  });

  return (
    <div className="container justify-content-center align-items-center d-flex flex-column my-4">
      <div className="col-cert-upload-btn">
        <Button text="Upload Certificate Template" onClick={onClick}>
          <div className="col-cert-upload-btn-content">
            <AiOutlineUpload />
            <span>Upload Certificate Template</span>
          </div>
        </Button>
      </div>

      <div className="col-cert-thumbnail-container">{showTemplates()}</div>
    </div>
  );
};

export default CertificateCollection;
