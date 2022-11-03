import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { HiOutlineIdentification } from "react-icons/hi";

const VerificationForm = () => {
  return (
    <div className="verification-form-container">
      <form className="verification-form-content">
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
          name="verif"
          placeholder="Ex: profile link"
        />
        <hr />
        <label className="verification-form-label" htmlFor="website">
          2.
          <CgWebsite className="icon" />
          Official Website
        </label>
        <p className="verification-form-p mt-2">
          Provide the link to an official website that references you (or your
          organization) and your wallet address or public key.
        </p>
        <input
          className="form-control"
          type="text"
          name="website"
          placeholder="Enter Official Website"
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
          name="email"
          placeholder="Enter Email Address"
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
        <input className="form-control" type="file" name="email" />
        <input
          className="form-control"
          type="submit"
          name="orgID"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default VerificationForm;
