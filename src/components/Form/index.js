import React, { } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiScanFill } from "react-icons/ri";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";


const Form = () => {
	return (
        <>
        <div className="form-container">
            <form>
                <h5 className="form-header">Certinize</h5>
                <br/>
                <hr/>
                <label htmlFor="verif">
                    1.
                    <RiScanFill className="icon"/>
                    Verification Link
                </label>
                <p>Any of the three:</p>
                    <ul>
                        <li>
                            <b>Google Trends:</b> A profile on Google Trends with evidence of recent search activity about you.
                        </li>
                        <li>
                            <b>Wikipedia article:</b> A Wikipedia article that is about you and meets their notability standards for people.
                        </li>
                        <li>
                            <b>Public stock exchange:</b> A link providing evidence of substantial presence in a public stock exchange.
                        </li>
                    </ul>
                <input type="text" name="verif" value="" placeholder="Ex: profile link"/>
                <hr/>
                <label htmlFor="website">
                    2.
                    <AiOutlineLink className="icon"/>
                    Official Website
                </label>
                <p>Provide the link to an official website that references you (or your organization) and your wallet address or public key.</p>
                <input type="text" name="website" value="" placeholder="Enter Official Website"/>

                <hr/>

                <label htmlFor="email">
                    3.
                    <AiOutlineMail className="icon"/>
                    Official Email Address
                </label>
                <p>Provide an official email address with a domain relevant to the notability category you choose.</p>
                <input type="text" name="email" value="" placeholder="Enter Email Address"/>

                <hr/>
                <label htmlFor="orgID">
                    4.
                    <MdAccountBox className="icon"/>
                    Organization ID
                </label>
                <p>Provide a photo of a valid official organization-issued identification document, such as your school ID.</p>
                <input 
                type="file" 
                name="email" 
                value="" 
                />


                <input type="submit" name="orgID" value="Submit"/>
            </form>
        </div>

        </>
	);
};

export default Form;

