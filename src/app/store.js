import issuanceReducer from "../features/issuance/issuanceSlice";
import templateReducer from "../features/template/templateSlice";
import userReducer from "../features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    issuance: issuanceReducer,
    template: templateReducer,
  },
});

export default store;
