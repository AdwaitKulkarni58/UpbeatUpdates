import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container
      id="about"
      sx={{
        padding: 4,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", size: "5em", fontStyle: "italic" }}
      >
        About Upbeat Updates
      </Typography>
      <Typography
        paragraph
        sx={{
          fontWeight: "normal",
          fontSize: "1.5em",
          padding: "1em",
          fontStyle: "italic",
        }}
      >
        Welcome to Upbeat Updates, your go-to platform for the most recent news
        from around the world. In a time where the news cycle is often dominated
        by negative stories, we aim to be a beacon of light by showing you not
        only the latest news, but also how positive it is.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontWeight: "normal",
          fontSize: "1.5em",
          padding: "1em",
          fontStyle: "italic",
        }}
      >
        The mission is simple: to spread positivity and joy by showcasing the
        best of humanity. We know that the world is full of negative news and
        news channels like to focus on that for views, but we want to give back
        control to the people by letting them decide what to read and what not
        to read.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontWeight: "normal",
          fontSize: "1.5em",
          padding: "1em",
          fontStyle: "italic",
        }}
      >
        Whether you're interested in politics, sports, entertainment, or just
        want to read about the latest feel-good stories, we've got you covered.
        Using a reliable sentiment analysis method, we make sure that the
        positivity rating of each article is accurate and precise.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontWeight: "normal",
          fontSize: "1.5em",
          padding: "1em",
          fontStyle: "italic",
        }}
      >
        We also offer additional features like viewing the positivity trends of
        different news categories and allowing you to see how your favorite
        articles compare to others. Using modern clustering algorithms, we
        construct real-time, easy-to-read charts that showcase your net
        positivity. with color coding for better interpretations.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontWeight: "normal",
          fontSize: "1.5em",
          padding: "1em",
          fontStyle: "italic",
        }}
      >
        Together, we can create a ripple effect of positivity that reaches far
        and wide.
      </Typography>
    </Container>
  );
};

export default About;
