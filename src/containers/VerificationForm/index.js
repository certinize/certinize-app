import { verifyUser } from "../../api/UserAPI";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import "./index.css";
import { useWallet } from "@solana/wallet-adapter-react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { HiOutlineIdentification } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const VerificationForm = () => {
  const [verificationLink, setVerificationLink] = React.useState("");
  const [officialWebsite, setOfficialWebsite] = React.useState("");
  const [officialEmail, setOfficialEmail] = React.useState("");
  const [organizationId, setOrganizationId] = React.useState("");
  const [requestResp, setRequestResp] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");
  const [requestSuccess, setRequestSuccess] = React.useState(false);
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const orgIdFieldRef = React.useRef();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      try {
        fileReader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
      }

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      pubkey: publicKey.toBase58(),
      info_link: verificationLink,
      official_email: officialEmail,
      official_website: officialWebsite,
      organization_id: organizationId,
    };

    verifyUser(data).then((res) => {
      if (res.status_code >= 400) {
        if ("extra" in res) {
          const errors = [];
          res.extra.forEach((error) => {
            errors.push(`${error.msg}: ${error.loc[1]}`);
          });
          setRequestResp(errors);
        } else {
          setRequestResp(res.detail);
        }

        setModalTitle("Failed to send verification request");
        setOpenModal(true);
      } else {
        setModalTitle("Successfully sent verification request");
        setRequestResp("Verification request sent!");
        setOpenModal(true);
        setRequestSuccess(true);
      }
    });
  };

  const resetOrgIdField = () => {
    orgIdFieldRef.current.value = "";
  };

  const displayModalContent = () => {
    if (typeof requestResp === "string") {
      return <p>{requestResp}</p>;
    } else {
      return (
        <ul>
          {requestResp.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      );
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setOpenModal(false);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    if (requestSuccess) {
      setVerificationLink("");
      setOfficialWebsite("");
      setOfficialEmail("");
      setOrganizationId("");
      resetOrgIdField();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, []);

  return (
    <div className="verification-form-container">
      <div id="modal">
        <Modal open={openModal} title={modalTitle} onClose={handleModalClose}>
          <div className="verification-form-modal-body mt-2">
            {displayModalContent()}
          </div>
          <div className="modal-btn-group">
            <div className="verification-form-btn-group-col">
              <Button text="Close dialogue" onClick={handleModalClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <form className="verification-form-content" onSubmit={handleSubmit}>
        <h5 className="form-header">Get verified!</h5>
        <p className="verification-form-p mt-4">
          <b>
            With Certinize, people do not have to verify certificates. They only
            need to validate the issuing body, your organization.
          </b>{" "}
          It means to find out if a wallet address used to issue a certificate
          belongs to an organization.
          <br />
          <br />
          The verification process is optional. People can still verify an
          issuing body themselves using other means. You don&apos;t have to
          provide us with your organization&apos;s information, but it will help
          people authenticate an issuing body more quickly. If you are familiar
          with Twitter&apos;s verified badge, this process implements the same
          concept.
        </p>
        <hr />

        <label className="verification-form-label" htmlFor="verif">
          1.
          <AiOutlineLink className="icon" />
          Verification Link
        </label>
        <p className="verification-form-p mt-2">Any of the three:</p>
        <ul className="verification-form-ul">
          <li>
            <b>Google Trends:</b> A profile on Google Trends with evidence of
            recent search activity about you.
          </li>
          <li>
            <b>Wikipedia article:</b> A Wikipedia article that is about you and
            meets their notability standards for people.
          </li>
          <li>
            <b>Public stock exchange:</b> A link providing evidence of
            substantial presence in a public stock exchange.
          </li>
        </ul>
        <input
          className="form-control"
          type="text"
          name="verificationLink"
          placeholder="Enter a verification link"
          onChange={(e) => setVerificationLink(e.target.value)}
          value={verificationLink}
          required
        />
        <hr />

        <label className="verification-form-label" htmlFor="website">
          2.
          <CgWebsite className="icon" />
          Official Website
        </label>
        <p className="verification-form-p mt-2">
          Provide the link to an official website that references your
          organization and your wallet address.
        </p>
        <input
          className="form-control"
          type="text"
          name="officialWebsite"
          placeholder="Enter your official website"
          onChange={(e) => setOfficialWebsite(e.target.value)}
          value={officialWebsite}
          required
        />
        <hr />

        <label className="verification-form-label" htmlFor="email">
          3.
          <AiOutlineMail className="icon" />
          Official Email Address
        </label>
        <p className="verification-form-p mt-2">
          Provide an official email address with a domain relevant to the
          notability category you choose.
        </p>
        <input
          className="form-control"
          type="text"
          name="officialEmail"
          placeholder="Enter your email address"
          onChange={(e) => setOfficialEmail(e.target.value)}
          value={officialEmail}
          required
        />
        <hr />

        <label className="verification-form-label" htmlFor="orgID">
          4.
          <HiOutlineIdentification className="icon" />
          Organization ID
        </label>
        <p className="verification-form-p mt-2">
          Provide a photo of a valid official organization-issued identification
          document, such as a school ID or company ID.
        </p>
        <input
          className="form-control"
          type="file"
          name="organizationId"
          onChange={(e) => {
            convertToBase64(e.target.files[0]).then((res) => {
              setOrganizationId(res);
            });
          }}
          ref={orgIdFieldRef}
          required
        />

        <div className="d-flex gap-3 mt-5 w-25">
          <Button
            type="submit"
            text="Send verification request"
            styleType="info"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
          <Button type="submit" text="Send verification request">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
