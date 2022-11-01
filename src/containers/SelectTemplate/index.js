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

const SelectTemplate = ({ actionController }) => {
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
    <div>
      <div>
        <div className="certi-grid"></div>
        <div className="button-set">
          <Button
            text="Continue"
            onClick={() => actionController("toEditTemplate")}
          />
          <Button text="Cancel" styleType="danger" />
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
