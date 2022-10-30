import { createSlice } from "@reduxjs/toolkit";

// user slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    pubkey: null,
    user: null,
    verification: null,
  },
  reducers: {
    setPubkey: (state, action) => {
      state.pubkey = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setVerification: (state, action) => {
      state.verification = action.payload;
    },
    logout: (state) => {
      state.pubkey = null;
      state.user = null;
      state.verification = null;
    },
  },
});

// export actions
export const { setPubkey, setUser, setVerification, logout } =
  userSlice.actions;

// export reducer
export default userSlice.reducer;
