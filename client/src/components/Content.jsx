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
import Modal from "@mui/material/Modal";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

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
    fontFamily: "Times New Roman, sans-serif",
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function Content() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  React.useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    }
  }, [user.loggedIn, navigate]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setOpen(true);
    setLoading(true);

    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          category: category.toLowerCase(),
          apiKey: import.meta.env.VITE_API_KEY,
          language: "en",
        },
      });

      setNews(response.data.articles.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNews([]);
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              gutterBottom
            >
              {selectedCategory} News
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            news.map((article, index) => (
              <Box key={index} mb={3}>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {article.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {article.source.name}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </>
  );
}
