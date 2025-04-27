import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
  user: null,
};
export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    authReducer: (state, action) => {
      state.token = action.payload.token;
      state.isLogin = true;
      state.user = action.payload.user;
    },
    isSignout: (state) => {
      state.token = "";
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { authReducer, isSignout } =
  authSlice.actions;
export default authSlice.reducer;
