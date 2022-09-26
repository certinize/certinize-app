import { createSlice } from "@reduxjs/toolkit";

// user slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    pubkey: null,
  },
  reducers: {
    login: (state, action) => {
      state.pubkey = action.payload;
    },
    logout: (state) => {
      state.pubkey = null;
    },
  },
});

// export actions
export const { login, logout } = userSlice.actions;

// export reducer
export default userSlice.reducer;
