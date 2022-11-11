/* eslint-disable no-unused-vars */
import { getTemplates } from "../../api/TemplateAPI";
import Button from "../../components/Button";
import Thumbnail from "../../components/Thumbnail";
import { setSelectedTemplate } from "../../features/template/templateSlice";
import { setTemplates } from "../../features/template/templateSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TemplateSelection = ({ actionController }) => {
  const navigate = useNavigate();
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplate = useSelector(
    (state) => state.template.selectedTemplate
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (templates.length === 0) {
      getTemplates().then((res) => {
        dispatch(setTemplates(res.templates));
      });
    }
  }, [dispatch, templates]);

  const createTemplatePreviews = () => {
    return templates.map((template, index) => {
      const templateId =
        selectedTemplate.templateId ||
        (selectedTemplate.payload ? selectedTemplate.payload.templateId : null);

      return (
        <div
          key={index}
          onClick={() => {
            dispatch(
              setSelectedTemplate({
                templateId: template.template_id,
                templateUrl: template.template_url,
              })
            );
          }}
        >
          <Thumbnail
            src={template.template_url}
            containerClassName="select-template-thumbnail-frame"
            imgClassName={
              templateId === template.template_id
                ? "select-template-thumbnail-bg"
                : template.templateId
            }
          >
            {templateId === template.template_id ? (
              <div className="select-template-check-mark-container">
                <BsCheckSquareFill className="select-template-check-mark" />
              </div>
            ) : null}
          </Thumbnail>
        </div>
      );
    });
  };

  return (
    <div className="container d-flex flex-column my-4">
      <div className="select-template-button-set">
        <div className="select-template-button-set-content">
          <Button
            styleType="danger"
            text="Cancel"
            onClick={() => window.location.reload()}
          >
            Cancel
          </Button>
          <Button
            onClick={() => actionController("toTemplateEditor")}
            text="Continue"
          >
            Continue
          </Button>
        </div>
      </div>
      <div className="select-template-image-list-container">
        {createTemplatePreviews()}
      </div>
    </div>
  );
};

TemplateSelection.propTypes = {
  actionController: PropTypes.func,
};

export default TemplateSelection;
