/* eslint-disable no-unused-vars */
import { getCert, generateCert } from "../../api/CertificateAPI";
import { createTemplateConfig } from "../../api/ConfigurationAPI";
import { getAllFonts } from "../../api/FontAPI";
import { getUnsignedMessage, makeIssuanceRequest } from "../../api/IssuanceAPI";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToolCategory from "../../components/ToolCategory/ToolCategory";
import {
  resetIssuance,
  overwriteRecipients,
} from "../../features/issuance/issuanceSlice";
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

  const dispatch = useDispatch();
  const template = useSelector((state) => state.template);
  const issuance = useSelector((state) => state.issuance);
  const user = useSelector((state) => state.user);

  // Font and text-related states
  const [fontStyles, setFontStyles] = React.useState([]);
  const [hasFontStyles, setHasFontStyles] = React.useState(false);
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

  // UI-related states
  const [openModal, setOpenModal] = React.useState(false);
  const [templateUrl, setTemplateUrl] = React.useState("");
  const [hasTemplateSize, setHasTemplateSize] = React.useState(false);

  // Transaction-related states
  const [recipients, setRecipients] = React.useState([]);
  const [hasCreatedCerts, setHasCreatedCerts] = React.useState(false);
  const [signedMessage, setSignedMessage] = React.useState(null);

  const recipientName = React.useRef();
  const date = React.useRef();

  const getCertificate = (requestId) => {
    var cert = null;

    const interval = setInterval(() => {
      // Unfortuantely, we can't avoid making duplicate requests to the backend due to the async
      // nature of getCert. Even if we use a flag to check if the certificate has been retrieved,
      // the flag won't be set until getCert receives a response. By that time, another request
      // would have been sent to the backend.
      if (cert !== null) clearInterval(interval);

      getCert(requestId)
        .then((response) => {
          if (response.code !== 404) {
            cert = response;
            // We have to copy state using JSON. Otherwise, when we try to update the recipients
            // const, JavaScript will return a TypeError: can't define property "x": "obj" is not
            // extensible.
            const recipients = JSON.parse(JSON.stringify(issuance.recipients));

            // Update issuance.recipients with the generated certificate
            cert.certificate.certificate.forEach((recipient) => {
              recipients.forEach((recipientObj, index) => {
                if (recipientObj.recipient_name === recipient.recipient_name) {
                  recipients[index].recipient_ecert_url =
                    recipient.certificate_url;
                }
              });
            });

            dispatch(overwriteRecipients(recipients));
            setHasCreatedCerts(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  };

  const sendGenerateCertRequest = (templateConfigId) => {
    const certificateMeta = {
      template_config_id: templateConfigId,
      issuance_date: issuance.issuanceDate,
      recipients: issuance.recipients.map((recipient) => ({
        recipient_name: recipient.recipient_name,
      })),
    };

    generateCert(certificateMeta)
      .then((response) => {
        getCertificate(response.request_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // With the current backend implementation, we have to create a new template config first using
  // the /configurations endpoint. After that, we have to make a request to the /certificates to
  // generate the certificates. Then we can make a request to the /issuance endpoint to issue the
  // certificates.
  const generateCertificate = () => {
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

    createTemplateConfig(templateConfig)
      .then((response) => {
        sendGenerateCertRequest(response.template_config_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendIssuanceRequest = () => {
    const issuanceRequest = {
      request_id: signedMessage.request_id,
      signature: signedMessage.signature,
      issuer_meta: {
        issuer_name: user.verification.organization_name,
        issuer_email: user.verification.official_email,
        issuer_website: user.verification.official_website,
        issuer_pubkey: publicKey.toBase58(),
      },
      recipient_meta: issuance.recipients.map((recipient) => ({
        recipient_name: recipient.recipient_name,
        recipient_email: recipient.recipient_email,
        recipient_pubkey: recipient.recipient_pubkey,
        recipient_ecert_url: recipient.recipient_ecert_url,
      })),
    };

    makeIssuanceRequest(issuanceRequest)
      .then((response) => {
        dispatch(resetSelectedTemplate());
        dispatch(resetIssuance());
        actionController("toSendIssueRequest");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createIssuanceRequest = () => {
    getUnsignedMessage(publicKey.toBase58())
      .then((response) => {
        signMessage(new TextEncoder().encode(response.message))
          .then((signature) => {
            setSignedMessage({
              request_id: response.request_id,
              signature: bs58.encode(signature),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTransferClick = () => {
    // setOpenModal(true);
    createIssuanceRequest();
    generateCertificate();
    // createIssuanceRequest() was moved to the useEffect hook. This is because we need to wait for
    // the certificates to be generated before we can make an issuance request.
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
    getAllFonts()
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
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
    if (hasCreatedCerts && signedMessage !== null) {
      sendIssuanceRequest();
      return;
    } else {
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
    }
  }, [
    nameFontSize,
    nameFontStyle,
    dateFontSize,
    dateFontStyle,
    namePosition,
    datePosition,
    hasCreatedCerts,
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
