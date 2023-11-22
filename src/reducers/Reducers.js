import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: localStorage.getItem("uid") || 0,
  token: localStorage.getItem("token") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("uid", action.payload.uid);
    },
    logout: (state, action) => {
      state.uid = 0;
      state.token = "";
      localStorage.setItem("token", "");
      localStorage.setItem("uid", 0);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
