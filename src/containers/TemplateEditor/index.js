/* eslint-disable no-unused-vars */
import { generateEcert } from "../../api/CertificateAPI";
import { createTemplateConfig } from "../../api/ConfigurationAPI";
import { getAllFonts } from "../../api/FontAPI";
import { getUnsignedMessage } from "../../api/IssuanceAPI";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToolCategory from "../../components/ToolCategory/ToolCategory";
import { resetIssuance } from "../../features/issuance/issuanceSlice";
import { resetSelectedTemplate } from "../../features/template/templateSlice";
import "./index.css";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { toSvg } from "html-to-image";
import { PropTypes } from "prop-types";
import React from "react";
import { createRoot } from "react-dom/client";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";

const FONT_FILE_FORMATS = [".ttf"];

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

const FONT_STYLE_DEFAULT = { value: "arial", label: "arial" };
const FONT_SIZE_DEFAULT = FONT_SIZES[14];

const TemplateEditor = ({ actionController }) => {
  const { publicKey, signMessage } = useWallet();
  const template = useSelector((state) => state.template);
  const issuance = useSelector((state) => state.issuance);

  const [fontStyles, setFontStyles] = React.useState([]);
  const [hasFontStyles, setHasFontStyles] = React.useState(false);
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
  const [namePosition, setNamePosition] = React.useState({ x: 0, y: 0 });
  const [datePosition, setDatePosition] = React.useState({ x: 0, y: 0 });
  const [templateUrl, setTemplateUrl] = React.useState("");
  const [hasTemplateSize, setHasTemplateSize] = React.useState(false);

  const recipientName = React.useRef();
  const date = React.useRef();

  const generateCertificate = (templateConfig) => {
    const certificateMeta = {
      template_config_id: templateConfig.template_config_id,
      issuance_date: issuance.issuanceDate,
      recipients: issuance.recipients.map((recipient) => ({
        recipient_name: recipient.recipient_name,
      })),
    };

    generateEcert(certificateMeta).then((response) => {
      console.log(response);
    });
  };

  // With the current backend implementation, we have to create a new template config first using
  // the /configurations endpoint. After that, we have to make a request to the /certificates to
  // generate the certificates. Then we can make a request to the /issuance endpoint to issue the
  // certificates.
  const createTemplConf = () => {
    const templateConfig = {
      recipient_name_meta: {
        position: {
          x: namePosition.x,
          y: namePosition.y,
        },
        font_size: nameFontSize,
        font_url: fontStyles.find((font) => font.label === nameFontStyle).url,
      },
      issuance_date_meta: {
        position: {
          x: datePosition.x,
          y: datePosition.y,
        },
        font_size: dateFontSize,
        font_url: fontStyles.find((font) => font.label === dateFontStyle).url,
      },
      template_id: template.selectedTemplate.payload.templateId,
      template_config_name: Math.random().toString(36).substring(2, 15),
    };

    createTemplateConfig(templateConfig).then((response) => {
      generateCertificate(response);
    });
  };

  const issueCertificate = (issuanceRequest) => {
    const request = {
      request_id: issuanceRequest.request_id,
      signature: issuanceRequest.signature,
      issuer_meta: {},
    };
  };

  const authorizeTransaction = () => {
    getUnsignedMessage(publicKey.toBase58()).then((response) => {
      try {
        signMessage(new TextEncoder().encode(response.message)).then(
          (signature) => {
            const issuanceRequest = {
              request_id: response.request_id,
              signature: bs58.encode(signature),
            };

            console.log("issuanceRequest", issuanceRequest);
          }
        );
      } catch (error) {
        console.log(`Error signing message: ${error}`);
      }
    });
  };

  const handleTransferClick = () => {
    setOpenModal(true);
    // createTemplConf();
    authorizeTransaction();
    useDispatch(resetSelectedTemplate());
    useDispatch(resetIssuance());
  };

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
          <Button styleType="danger" text="Cancel">
            Cancel
          </Button>
          <Button onClick={handleTransferClick} text="Transfer">
            Transfer
          </Button>
        </>
      );

      templateBox.replaceWith(image);
    });
  };

  const getTemplateSize = () => {
    const img = new Image();
    img.src = templateUrl;
    img.onload = () => {
      // Convert sizes to rem
      const width = img.width / 16;
      const height = img.height / 16;

      // Add aditional 4 rem to the width and height to account for the border
      document.getElementById("templateBox").style.width = `${width + 4}rem`;
      document.getElementById("templateBox").style.height = `${height + 4}rem`;
    };
  };

  const getFontStyles = () => {
    getAllFonts().then((res) => {
      const fonts = [];

      res.fonts.forEach((font) => {
        const label = new URL(font.font_url).pathname
          .split("/")
          .filter(Boolean)
          .pop();

        const decodedLabel = label
          .replace(/-/g, " ")
          .replace(new RegExp(FONT_FILE_FORMATS.join("|"), "g"), "");

        fonts.push({
          value: decodedLabel,
          label: decodedLabel,
          url: font.font_url,
          id: font.font_id,
        });
      });

      setFontStyles(fonts);
    });
  };

  const updateTemplateFonts = () => {
    const nameStyle = recipientName.current.style;
    const dateStyle = date.current.style;

    nameStyle.fontSize = `${nameFontSize}px`;
    nameStyle.fontFamily = nameFontStyle.includes(" ")
      ? `"${nameFontStyle}"`
      : nameFontStyle;

    dateStyle.fontSize = `${dateFontSize}px`;
    dateStyle.fontFamily = dateFontStyle.includes(" ")
      ? `"${dateFontStyle}"`
      : dateFontStyle;
  };

  const getElementPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const imgSize = document
      .getElementById("templateImg")
      .getBoundingClientRect();

    // Get the center of rect relative to imageSize.
    const x = rect.left - imgSize.left + rect.width / 2;
    const y = rect.top - imgSize.top + rect.height / 2;

    return { x, y };
  };

  const handleDragOnStop = (e) => {
    const position = getElementPosition(e.target);

    if (e.target.innerText === recipientName.current.innerText) {
      setNamePosition(position);
    }

    if (e.target.innerText === date.current.innerText) {
      setDatePosition(position);
    }
  };

  React.useEffect(() => {
    if (!hasTemplateSize) {
      getTemplateSize();
      setHasTemplateSize(true);
    }

    if (!hasFontStyles) {
      getFontStyles();
      setHasFontStyles(true);
    }

    updateTemplateFonts();

    setTemplateUrl(
      template.selectedTemplate.payload
        ? template.selectedTemplate.payload.templateUrl
        : template.selectedTemplate.templateUrl
    );
  }, [
    nameFontSize,
    nameFontStyle,
    dateFontSize,
    dateFontStyle,
    namePosition,
    datePosition,
  ]);

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
              <img src={templateUrl} id="templateImg" />
              <Draggable
                bounds="parent"
                defaultPosition={{ x: 0, y: 0 }}
                onStop={handleDragOnStop}
              >
                <div className="handle" ref={recipientName}>
                  <div className="box__title">
                    <p className="recipient-name">Maria Dela Cruz</p>
                  </div>
                </div>
              </Draggable>
              <Draggable
                bounds="parent"
                defaultPosition={{ x: 0, y: 100 }}
                onStop={handleDragOnStop}
              >
                <div className="handle" ref={date}>
                  <div className="box__title">
                    <p className="date">DD/MM/YYYY</p>
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
            first={fontStyles}
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
            first={fontStyles}
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
