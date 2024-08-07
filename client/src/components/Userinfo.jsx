import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Container, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Account from "./Account";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import axios from "axios";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "200px",
  paddingRight: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const UserInfo = () => {
  const email = useSelector((state) => state.user.email);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    }
  }, [user.loggedIn, navigate]);

  const navItems = [
    { label: "My Account", path: "/app/account" },
    { label: "My Favorites", path: "/app/account/faves" },
  ];

  const deleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const url = `https://upbeatupdates.onrender.com/users/${email}`;
        await axios.delete(url);
        dispatch(logout());
        navigate("/");
        alert("Account deleted successfully");
      } catch (error) {
        alert("Failed to delete account");
      }
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Paper elevation={12} sx={{ display: "flex", padding: 3 }}>
        <Sidebar>
          {navItems.map((item) => (
            <Button
              fullWidth
              variant="contained"
              sx={{ marginBottom: 2 }}
              key={item.label}
              component={Link}
              to={item.path}
            >
              {item.label}
            </Button>
          ))}
          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 2 }}
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Log Out
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "#7a0012",
              color: "white",
              ":hover": { backgroundColor: "black" },
            }}
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </Sidebar>
        <Box sx={{ flexGrow: 1, paddingLeft: 3 }}>
          <Typography
            sx={{ textAlign: "center", fontSize: "2em", fontWeight: "bold" }}
            variant="h5"
            gutterBottom
          >
            Hello there!
          </Typography>
          {location.pathname === "/app/account" && <Account />}
          <Outlet />
        </Box>
      </Paper>
    </StyledContainer>
  );
};

export default UserInfo;
