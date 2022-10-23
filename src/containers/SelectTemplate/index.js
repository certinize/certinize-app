/* eslint-disable no-unused-vars */
import Button from "../../components/Button";
import Thumbnail from "../../components/Thumbnail";
import { setSelectedTemplate } from "../../features/template/templateSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const SelectTemplate = ({ actionController }) => {
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplate = useSelector(
    (state) => state.template.selectedTemplate
  );
  const dispatch = useDispatch();

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
    <div className="select-template-container">
      <div className="select-template-button-set">
        <div className="select-template-button-set-content">
          <Button
            onClick={() => actionController("toEditTemplate")}
            text="Continue"
          >
            Continue
          </Button>
          <Button styleType="danger" text="Cancel">
            Cancel
          </Button>
        </div>
      </div>
      <div className="select-template-image-list-container">
        {createTemplatePreviews()}
      </div>
    </div>
  );
};

SelectTemplate.propTypes = {
  actionController: PropTypes.func,
};

export default SelectTemplate;
