import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import About from "./About";
import Login from "./Login";

function Title() {
  return (
    <Typography
      variant="h1"
      align="center"
      sx={{
        marginBottom: "20px",
        backgroundClip: "text",
        color: "#FFEA20",
        fontSize: "6.5vmin",
        fontWeight: "700",
        letterSpacing: "0.5em",
        display: "inline-block",
      }}
    >
      Upbeat Updates
    </Typography>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Typography color="inherit" sx={{ display: "inline", padding: "5px" }}>
        Copyright ©UpbeatUpdates 2024
      </Typography>
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LandingPage() {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToLogin = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Title />
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Login />
        </Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <ExpandMoreIcon
            sx={{ fontSize: "7rem", cursor: "pointer", color: "white" }}
            onClick={handleScrollToAbout}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "5px",
            backgroundColor: "#FFEA20",
            mt: 15,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <KeyboardArrowUpIcon
          sx={{ fontSize: "7rem", cursor: "pointer", color: "white" }}
          onClick={handleScrollToLogin}
        />
      </Box>
      <About />
      <Copyright sx={{ mt: 8, mb: 4, color: "white" }} />
    </ThemeProvider>
  );
}
