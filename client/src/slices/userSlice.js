import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  email: "",
  password: "",
  savedArticles: [],
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
      state.savedArticles = action.payload.savedArticles || [];
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.email = "";
      state.password = "";
    },
    editUser: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    addSavedArticle: (state, action) => {
      const existingArticle = state.savedArticles.find(
        (article) => article.title === action.payload.title
      );
      if (!existingArticle) {
        state.savedArticles.push(action.payload);
      }
      localStorage.setItem("user", JSON.stringify(state));
    },
    deleteArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (article) => article._id !== action.payload
      );
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { login, logout, editUser, addSavedArticle, deleteArticle } = userSlice.actions;

export default userSlice.reducer;
