import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToolCategory from "../../components/ToolCategory/ToolCategory";
import "./index.css";
import { toSvg } from "html-to-image";
import { PropTypes } from "prop-types";
import React from "react";
import { createRoot } from "react-dom/client";
import Draggable from "react-draggable";

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
  { value: "70", label: "70" },
];

const TemplateEditor = ({ actionController }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const recipientName = React.useRef();
  const date = React.useRef();

  const updateFontSize = (ref, fontSize = 12) => {
    ref.current.style.fontSize = `${fontSize}px`;
  };

  const updateFontStyle = (ref, fontStyle = "arial") => {
    ref.current.style.fontFamily = fontStyle;
  };

  const generateImage = () => {
    document.getElementById("toolMenu").remove();

    const certificateBox = document.getElementById("certificateBox");

    toSvg(certificateBox, {
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

      certificateBox.replaceWith(image);
    });
  };

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
            <div className="box" id="certificateBox">
              <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
                <div className="handle" ref={recipientName}>
                  <div className="box__title">
                    <p className="recipient-name">Maria Dela Cruz</p>
                  </div>
                </div>
              </Draggable>
              <Draggable bounds="parent" defaultPosition={{ x: 0, y: 20 }}>
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
            firstCallback={(option) => {
              updateFontStyle(recipientName, option.value);
            }}
            secondCallback={(option) => {
              updateFontSize(recipientName, option.value);
            }}
          />
          <ToolCategory
            label={"Date"}
            first={FONT_STYLES}
            second={FONT_SIZES}
            firstCallback={(option) => {
              updateFontStyle(date, option.value);
            }}
            secondCallback={(option) => {
              updateFontSize(date, option.value);
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
