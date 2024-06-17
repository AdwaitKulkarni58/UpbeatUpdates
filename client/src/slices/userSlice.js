import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.email = null;
      state.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
