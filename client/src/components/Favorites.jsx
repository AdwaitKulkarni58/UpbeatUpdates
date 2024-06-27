import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
  Link,
  Button,
} from "@mui/material";
import axios from "axios";
import {
  analyzeSentiment,
  categorizeSentiment,
} from "../sentiment/sentimentAnalysis";
import { deleteArticle } from "../slices/userSlice";

const Favorites = () => {
  const email = useSelector((state) => state.user.email);
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${email}/articles`
        );

        const articlesWithSentiment = response.data.map((article) => ({
          ...article,
          sentimentScore: analyzeSentiment(article.description),
          sentimentCategory: categorizeSentiment(
            analyzeSentiment(article.description)
          ),
        }));
        setFavorites(articlesWithSentiment);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    getFavorites();
  }, [email]);

  console.log(favorites);

  const clearFavorites = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${email}/articles`);
      setFavorites([]);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${email}/articles/${id}`);
      dispatch(deleteArticle(id));
      const updatedFavorites = favorites.filter((item) => item._id !== id);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  const validFavorites = favorites.filter(
    (item) =>
      item !== null && item.title && item.description && item.url && item.source
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          My Favorites
        </Typography>
        <List>
          {validFavorites.map((item, index) => (
            <React.Fragment key={index} id={item._id}>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "20px",
                }}
              >
                <Box sx={{ display: "flex", width: "100%" }}>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                </Box>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  Read More
                </Link>
                <Typography variant="caption" display="block" gutterBottom>
                  Source: {item.source}
                </Typography>
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    fontSize: "1em",
                  }}
                >
                  Sentiment: {item.sentimentCategory} <br></br> Positivity
                  Score: {item.sentimentScore}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteFavorite(item._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
              {index < validFavorites.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        {validFavorites.length === 0 ? (
          <Typography>No favorites found.</Typography>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={clearFavorites}
          >
            Clear All
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Favorites;
