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
    editUser: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
    },
  },
});

export const { login, logout, editUser } = userSlice.actions;

export default userSlice.reducer;
