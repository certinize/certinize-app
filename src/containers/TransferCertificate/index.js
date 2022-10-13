/* eslint-disable no-unused-vars */
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar";
import RecipientTable from "../RecipientTable";
import SelectTemplate from "../SelectTemplate";
import Success from "../Success";
import TemplateEditor from "../TemplateEditor";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const initialState = {
  addRecipient: true,
  selectTemplate: false,
  editTemplate: false,
  sentIssueRequest: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECIPIENT":
      return {
        ...state,
        addRecipient: !state.addRecipient,
      };
    case "SELECT_TEMPLATE":
      return {
        ...state,
        selectTemplate: !state.selectTemplate,
      };
    case "EDIT_TEMPLATE":
      return {
        ...state,
        editTemplate: !state.editTemplate,
      };
    case "SEND_ISSUE_REQUEST":
      return {
        ...state,
        sentIssueRequest: !state.sentIssueRequest,
      };
    default:
      return state;
  }
};

const TransferCertificate = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [headerTitle, setHeaderTitle] = React.useState("Add Recipient");

  // Helper function to allow components to dispatch multiple actions at once.
  const actionController = (action) => {
    switch (action) {
      case "toSelectTemplate":
        dispatch({ type: "ADD_RECIPIENT" });
        dispatch({ type: "SELECT_TEMPLATE" });
        setHeaderTitle("Choose Template");
        break;
      case "toEditTemplate":
        dispatch({ type: "SELECT_TEMPLATE" });
        dispatch({ type: "EDIT_TEMPLATE" });
        setHeaderTitle("Edit Template");
        break;
      case "toSendIssueRequest":
        dispatch({ type: "EDIT_TEMPLATE" });
        dispatch({ type: "SEND_ISSUE_REQUEST" });
        setHeaderTitle("Issue Certificate");
        break;
      default:
        break;
    }

    viewController();
  };

  const displayAddRecipients = () => {
    return (
      <div className="recipient-table">
        <RecipientTable actionController={actionController} />
      </div>
    );
  };

  const displaySelectCertificate = () => {
    return (
      <div className="select-certificate">
        <SelectTemplate actionController={actionController} />
      </div>
    );
  };

  const displayEditTemplate = () => {
    return (
      <div className="edit-template">
        <TemplateEditor actionController={actionController} />
      </div>
    );
  };

  const displaySendIssueRequest = () => {
    return (
      <div className="send-issue-request">
        <Success />
      </div>
    );
  };

  const viewController = () => {
    if (state.addRecipient) {
      return displayAddRecipients();
    }

    if (state.selectTemplate) {
      return displaySelectCertificate();
    }

    if (state.editTemplate) {
      return displayEditTemplate();
    }

    if (state.sentIssueRequest) {
      return displaySendIssueRequest();
    }
  };

  return (
    <div>
      <NavBar />
      <Header title={headerTitle} />
      <div className="content-body">{viewController()}</div>
    </div>
  );
};

export default TransferCertificate;
