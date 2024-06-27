import Navbar from "./Navbar";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button } from "@mui/material";
import Link from "@mui/material/Link";
import { addSavedArticle } from "../slices/userSlice";
import { v4 as uuidv4 } from "uuid";

import { analyzeSentiment } from "../sentiment/sentimentAnalysis";
import { categorizeSentiment } from "../sentiment/sentimentAnalysis";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

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
    fontFamily: "Times New Roman",
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
  fontFamily: "Times New Roman",
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
  const dispatch = useDispatch();
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

      const articlesWithSentiment = response.data.articles.map((article) => {
        const description = article.description || "";
        const sentimentScore = analyzeSentiment(description);
        return {
          ...article,
          id: uuidv4(),
          sentimentScore,
          sentimentCategory: categorizeSentiment(sentimentScore),
        };
      });

      setNews(articlesWithSentiment);
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

  const saveArticle = async (article) => {
    try {
      const existingArticle = user.savedArticles.find(
        (savedArticle) => savedArticle.title === article.title
      );
      if (existingArticle) {
        alert("Article is already saved");
        return;
      }
      const response = await axios.post(
        `http://localhost:3000/users/${user.email}/articles`,
        {
          article: {
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source.name,
          },
        }
      );
      const savedArticle = response.data.article;
      dispatch(addSavedArticle(savedArticle));
      alert("Article saved successfully");
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleShare = (platform, url, title) => {
    const shareUrl = encodeURIComponent(url);
    const text = encodeURIComponent(`Check out this article: ${title}`);
    let finalUrl;

    switch (platform) {
      case "twitter":
        finalUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
        break;
      case "facebook":
        finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "linkedin":
        finalUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${text}`;
        break;
      default:
        return;
    }

    window.open(finalUrl, "_blank");
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
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold" }}
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
              <Box key={index} id={article.id} mb={3}>
                <Typography variant="h5" gutterBottom>
                  {article.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic" }}
                  gutterBottom
                >
                  {article.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic" }}
                  gutterBottom
                >
                  Read More:{" "}
                  <Link href={article.url} target="_blank">
                    {article.source.name}
                  </Link>
                </Typography>
                <Typography variant="caption" gutterBottom>
                  Source: {article.source.name}
                </Typography>
                <br></br>
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    fontSize: "1em",
                  }}
                >
                  Sentiment: {article.sentimentCategory} <br></br> Positivity
                  Score: {article.sentimentScore}
                </Typography>
                <br></br>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ padding: "5px", borderRadius: "35px" }}
                  onClick={() => saveArticle(article)}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ padding: "5px", borderRadius: "35px", ml: 2 }}
                  onClick={() =>
                    handleShare("twitter", article.url, article.title)
                  }
                >
                  <ShareIcon /> Twitter
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ padding: "5px", borderRadius: "35px", ml: 2 }}
                  onClick={() =>
                    handleShare("facebook", article.url, article.title)
                  }
                >
                  <ShareIcon /> Facebook
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ padding: "5px", borderRadius: "35px", ml: 2 }}
                  onClick={() =>
                    handleShare("linkedin", article.url, article.title)
                  }
                >
                  <ShareIcon /> LinkedIn
                </Button>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </>
  );
}
