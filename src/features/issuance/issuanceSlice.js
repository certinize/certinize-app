import { createSlice } from "@reduxjs/toolkit";

// The issuance slice contains a list of recipients.
// The list of recipients is a list of objects with the following properties:
// - recipient_email: the email address of the recipient
// - recipient_name: the name of the recipient
// - recipient_pubkey: the public key of the recipient
// - recipient_ecert_url: the URL of the recipient's eCert
export const issuanceSlice = createSlice({
  name: "issuance",
  initialState: {
    recipients: [],
  },
  reducers: {
    addRecipient: (state, action) => {
      state.recipients.push(action.payload);
    },
    clearRecipients: (state) => {
      state.recipients = [];
    },
  },
});

export const { addRecipient, clearRecipients } = issuanceSlice.actions;

export default issuanceSlice.reducer;
