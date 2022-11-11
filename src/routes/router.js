import RecipientTable from "../containers/RecipientTable";
import SelectTemplate from "../containers/SelectTemplate";
import Success from "../containers/Success";
import TemplateEditor from "../containers/TemplateEditor";
import TransferCertificate from "../containers/TransferCertificate";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/issue-certificate/*",
    element: <TransferCertificate />,
    children: [
      {
        path: "recipient-table",
        element: <RecipientTable />,
      },
      {
        path: "select-template",
        element: <SelectTemplate />,
      },
      {
        path: "edit-template",
        element: <TemplateEditor />,
      },
      {
        path: "issue-certificate",
        element: <Success />,
      },
    ],
  },
]);

export default router;
