import React from "react";
import { Paper, Box, Grid, TextField, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { editUser } from "../slices/userSlice";
import axios from "axios";

const Account = () => {
  const { email: initialEmail, password: initialPassword } = useSelector(
    (state) => ({
      email: state.user.email,
      password: state.user.password,
    })
  );
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const dispatch = useDispatch();

  const applyChanges = async (e) => {
    console.log("Changes applied");
    if (!email || !password) {
      alert("Please enter values for all fields");
      return;
    }
    const user = { email: email, password: password };
    try {
      const url = `https://upbeatupdates.onrender.com/${email}`;
      const response = await axios.put(url, user);
      dispatch(
        editUser({
          email: response.data.email,
          password: response.data.password,
        })
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Paper elevation={4}>
      <Box sx={{ flexGrow: 1, paddingLeft: 3, paddingTop: 4 }}>
        <Outlet />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{ margin: "30px 50px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="email"
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="password"
                  type="password"
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={applyChanges}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Account;
