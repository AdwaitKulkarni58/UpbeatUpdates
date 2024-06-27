import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await axios.post(
        "https://upbeat-updates-backend.vercel.app/users/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      dispatch(login(user));
      console.log(response);
      if (response.status === 200) {
        navigate("/app/content");
      }
    } catch (err) {
      alert("Please enter the correct credentials");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "50px",
        padding: "4em",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "black" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in / Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 4, width: "30rem", height: "20rem" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            width: "13em",
            marginTop: "4em",
            borderRadius: "50px",
            fontSize: "1.2em",
            padding: "0.5em",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
