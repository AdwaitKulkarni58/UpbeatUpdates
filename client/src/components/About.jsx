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
        sx={{ fontWeight: "bold", size: "5em", fontStyle: "italic"}}
      >
        About Upbeat Updates
      </Typography>
      <Typography
        paragraph
        sx={{ fontWeight: "normal", fontSize: "1.5em", padding: "1em", fontStyle: "italic" }}
      >
        Welcome to Upbeat Updates, your go-to platform for uplifting and
        inspiring news from around the world. In a time where the news cycle is
        often dominated by negative stories, we aim to be a beacon of light by
        bringing you only the most positive and heartwarming stories.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontWeight: "normal", fontSize: "1.5em", padding: "1em", fontStyle: "italic" }}
      >
        The mission is simple: to spread positivity and joy by showcasing the
        best of humanity. From acts of kindness and breakthroughs in science and
        medicine, to achievements in sports and entertainment, we curate content
        that will brighten your day and remind you of the good in the world.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontWeight: "normal", fontSize: "1.5em", padding: "1em", fontStyle: "italic" }}
      >
        Whether you're interested in politics, sports, entertainment, or just
        want to read about the latest feel-good stories, we've got you covered.
        Every piece of news we share is not only positive but also verified and
        reliable.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontWeight: "normal", fontSize: "1.5em", padding: "1em", fontStyle: "italic" }}
      >
        We believe that by focusing on positive news, we can inspire our readers
        to look for the good in their own lives and communities. Join us in our
        mission to make the world a happier place, one positive news story at a
        time.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontWeight: "normal", fontSize: "1.5em", padding: "1em", fontStyle: "italic" }}
      >
        Together, we can create a ripple effect of positivity that reaches far
        and wide.
      </Typography>
    </Container>
  );
};

export default About;
