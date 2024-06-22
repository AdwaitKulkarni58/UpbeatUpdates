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
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.email = "";
      state.password = "";
      localStorage.removeItem("user");
    },
    initializeUser: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    editUser: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { login, logout, initializeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
