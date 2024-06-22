import Navbar from "./Navbar";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
  },
});

const CategoryItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.primary,
  padding: 80,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 28,
  fontSize: "4em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
    cursor: "pointer",
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
    boxShadow: theme.shadows[6],
  },
}));

export default function Content() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    }
  }, [user.loggedIn, navigate]);

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
    // For example, fetch news for this category and display it
    // navigate(`/news/${category}`);
  };

  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <ThemeProvider theme={darkTheme}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 6,
            }}
          >
            {categories.map((category, index) => (
              <ButtonBase
                key={index}
                onClick={() => handleCategoryClick(category)}
                sx={{ width: "50%" }}
              >
                <CategoryItem elevation={7}>
                  <Typography variant="h1">{category}</Typography>
                </CategoryItem>
              </ButtonBase>
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    </>
  );
}
