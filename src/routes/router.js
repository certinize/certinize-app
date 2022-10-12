import RecipientTable from "../pages/RecipientTable";
import SelectTemplate from "../pages/SelectTemplate";
import Success from "../pages/Success";
import TemplateEditor from "../pages/TemplateEditor";
import TransferCertificate from "../pages/TransferCertificate";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/transfer-certificate/*",
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
