import DateSelection from "../DateSelection";
import RecipientTable from "../RecipientTable";
import TemplateEditor from "../TemplateEditor";
import TemplateSelection from "../TemplateSelection";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const initialState = {
  selectDate: true,
  addRecipient: false,
  selectTemplate: false,
  editTemplate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_DATE":
      return {
        ...state,
        selectDate: !state.selectDate,
      };
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
    default:
      return state;
  }
};

const CertificateIssuance = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Helper function to allow components to dispatch multiple actions at once.
  const actionController = (action) => {
    switch (action) {
      case "toRecipientTable":
        dispatch({ type: "SELECT_DATE" });
        dispatch({ type: "ADD_RECIPIENT" });
        break;
      case "toTemplateSelection":
        dispatch({ type: "ADD_RECIPIENT" });
        dispatch({ type: "SELECT_TEMPLATE" });
        break;
      case "toTemplateEditor":
        dispatch({ type: "SELECT_TEMPLATE" });
        dispatch({ type: "EDIT_TEMPLATE" });
        break;
      default:
        break;
    }

    viewController();
  };

  const viewController = () => {
    if (state.selectDate)
      return <DateSelection actionController={actionController} />;

    if (state.addRecipient)
      return <RecipientTable actionController={actionController} />;

    if (state.selectTemplate)
      return <TemplateSelection actionController={actionController} />;

    if (state.editTemplate)
      return <TemplateEditor actionController={actionController} />;
  };

  return (
    <div>
      <div className="content-body">{viewController()}</div>
    </div>
  );
};

export default CertificateIssuance;
