/* eslint-disable no-unused-vars */
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToolCategory from "../../components/ToolCategory/ToolCategory";
import "./index.css";
import { toSvg } from "html-to-image";
import { PropTypes } from "prop-types";
import React from "react";
import { createRoot } from "react-dom/client";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

const FONT_STYLES = [
  { value: "arial", label: "Arial" },
  { value: "times", label: "Times New Roman" },
  { value: "courier", label: "Courier New" },
];

const FONT_SIZES = [
  { value: "12", label: "12" },
  { value: "14", label: "14" },
  { value: "16", label: "16" },
  { value: "18", label: "18" },
  { value: "20", label: "20" },
  { value: "22", label: "22" },
  { value: "24", label: "24" },
  { value: "26", label: "26" },
  { value: "28", label: "28" },
  { value: "30", label: "30" },
  { value: "32", label: "32" },
  { value: "34", label: "34" },
  { value: "36", label: "36" },
  { value: "38", label: "38" },
  { value: "40", label: "40" },
  { value: "64", label: "64" },
];

const FONT_STYLE_DEFAULT = FONT_STYLES[0];
const FONT_SIZE_DEFAULT = FONT_SIZES[14];

const TemplateEditor = ({ actionController }) => {
  const selectedTemplate = useSelector(
    (state) => state.template.selectedTemplate
  );
  const [openModal, setOpenModal] = React.useState(false);
  const [nameFontStyle, setNameFontStyle] = React.useState(
    FONT_STYLE_DEFAULT.value
  );
  const [dateFontStyle, setDateFontStyle] = React.useState(
    FONT_STYLE_DEFAULT.value
  );
  const [nameFontSize, setNameFontSize] = React.useState(
    FONT_SIZE_DEFAULT.value
  );
  const [dateFontSize, setDateFontSize] = React.useState(
    FONT_SIZE_DEFAULT.value
  );

  const [hasTemplateSize, setHasTemplateSize] = React.useState(false);
  const recipientName = React.useRef();
  const date = React.useRef();

  const generateImage = () => {
    document.getElementById("toolMenu").remove();

    const templateBox = document.getElementById("templateBox");
    templateBox.style.border = "none";

    toSvg(templateBox, {
      quality: 1,
    }).then((dataUrl) => {
      const image = new Image();
      image.src = dataUrl;
      image.alt = "Certificate Preview";

      createRoot(document.getElementById("btnContainer")).render(
        <>
          <Button onClick={() => setOpenModal(true)} text="Transfer">
            Transfer
          </Button>
          <Button styleType="danger" text="Cancel">
            Cancel
          </Button>
        </>
      );

      templateBox.replaceWith(image);
    });
  };

  const getTemplateSize = () => {
    const img = new Image();
    img.src = selectedTemplate.payload
      ? selectedTemplate.payload.templateUrl
      : selectedTemplate.templateUrl;
    img.onload = () => {
      // Convert sizes to rem
      const width = img.width / 16;
      const height = img.height / 16;

      // Add aditional 4 rem to the width and height to account for the border
      document.getElementById("templateBox").style.width = `${width + 4}rem`;
      document.getElementById("templateBox").style.height = `${height + 4}rem`;
    };
  };

  React.useEffect(() => {
    if (!hasTemplateSize) {
      getTemplateSize();
      setHasTemplateSize(true);
    }

    const nameStyle = recipientName.current.style;
    const dateStyle = date.current.style;

    nameStyle.fontSize = `${nameFontSize}px`;
    nameStyle.fontFamily = nameFontStyle;
    dateStyle.fontSize = `${dateFontSize}px`;
    dateStyle.fontFamily = dateFontStyle;
  }, [nameFontSize, nameFontStyle, dateFontSize, dateFontStyle]);

  // TODO: Attach a tip on a draggable component, e.g, "Drag to move". Remove it on drag.

  return (
    <>
      <div className="certinize-modal" id="modal">
        <Modal
          open={openModal}
          title="Issue Certificate"
          onClose={() => setOpenModal(false)}
        >
          <div className="certinize-modal-body">
            Distribute certificate to five (5) recipients?
          </div>
          <div className="modal-btn-group">
            <div className="btn-group-col">
              <Button styleType="danger" text="Cancel">
                Cancel
              </Button>
              <Button
                onClick={() => actionController("toSendIssueRequest")}
                text="Transfer"
              >
                Transfer
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="primary-container">
        <div className="editor-container">
          <div className="ecert-container">
            <div id="templateBox">
              <img
                src={
                  selectedTemplate.payload
                    ? selectedTemplate.payload.templateUrl
                    : selectedTemplate.templateUrl
                }
              />
              <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
                <div className="handle" ref={recipientName}>
                  <div className="box__title">
                    <p className="recipient-name">Maria Dela Cruz</p>
                  </div>
                </div>
              </Draggable>
              <Draggable bounds="parent" defaultPosition={{ x: 0, y: 100 }}>
                <div className="handle" ref={date}>
                  <div className="box__title">
                    <p className="date">MM/DD/YYYY</p>
                  </div>
                </div>
              </Draggable>
            </div>
          </div>
          <div className="edit-template-action-area">
            <div className="edit-template-btn-container" id="btnContainer">
              <Button onClick={generateImage} text="Next">
                Next
              </Button>
            </div>
          </div>
        </div>
        <div className="tool-menu" id="toolMenu">
          <ToolCategory
            label={"Recipient Name"}
            first={FONT_STYLES}
            second={FONT_SIZES}
            styleDefaultValue={FONT_STYLE_DEFAULT}
            sizeDefaultValue={FONT_SIZE_DEFAULT}
            firstCallback={(option) => {
              setNameFontStyle(option.value);
            }}
            secondCallback={(option) => {
              setNameFontSize(option.value);
            }}
          />
          <ToolCategory
            label={"Date"}
            first={FONT_STYLES}
            second={FONT_SIZES}
            styleDefaultValue={FONT_STYLE_DEFAULT}
            sizeDefaultValue={FONT_SIZE_DEFAULT}
            firstCallback={(option) => {
              setDateFontStyle(option.value);
            }}
            secondCallback={(option) => {
              setDateFontSize(option.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

TemplateEditor.propTypes = {
  actionController: PropTypes.func,
};

export default TemplateEditor;
