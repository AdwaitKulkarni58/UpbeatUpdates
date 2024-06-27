import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import {
  analyzeSentiment,
  categorizeSentiment,
} from "../sentiment/sentimentAnalysis";
import { useSelector } from "react-redux";
import { KMeans } from "ml";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

const Analysis = () => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const [favoritesData, setFavoritesData] = useState([]);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryPromises = categories.map((category) =>
          axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
              category: category.toLowerCase(),
              apiKey: import.meta.env.VITE_API_KEY,
              language: "en",
            },
          })
        );

        const categoryResponses = await Promise.all(categoryPromises);

        const categoryData = categoryResponses.reduce(
          (acc, response, index) => {
            const articlesWithSentiment = response.data.articles.map(
              (article) => {
                const description = article.description || "";
                const sentimentScore = analyzeSentiment(description);
                return {
                  ...article,
                  sentimentScore,
                  sentimentCategory: categorizeSentiment(sentimentScore),
                };
              }
            );
            acc[categories[index]] = articlesWithSentiment;
            return acc;
          },
          {}
        );

        setCategoryData(categoryData);

        const favoritesResponse = await axios.get(
          `https://upbeat-updates-backend.vercel.app/users/${email}/articles`
        );
        const favoritesWithSentiment = favoritesResponse.data.map((article) => {
          const description = article.description || "";
          const sentimentScore = analyzeSentiment(description);
          return {
            ...article,
            sentimentScore,
            sentimentCategory: categorizeSentiment(sentimentScore),
          };
        });
        setFavoritesData(favoritesWithSentiment);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const performClustering = (data) => {
    if (data.length < 2) return [];

    const maxK = Math.min(10, data.length - 1); // Reasonable upper bound for k

    const kmeans = new KMeans(data, maxK);
    return kmeans.clusters;
  };

  const createChartData = (articles) => {
    const scores = articles.map((article) => article.sentimentScore);
    const clusters = performClustering(scores.map((score) => [score]));

    return {
      labels: articles.map((_, index) => `Article ${index + 1}`),
      datasets: [
        {
          label: "Sentiment Score",
          data: scores,
          backgroundColor: clusters.map((cluster) => {
            switch (cluster) {
              case 0:
                return "rgba(255, 99, 132, 0.6)";
              case 1:
                return "rgba(75, 192, 192, 0.6)";
              case 2:
                return "rgba(54, 162, 235, 0.6)";
              default:
                return "rgba(255, 205, 86, 0.6)";
            }
          }),
        },
      ],
    };
  };

  const getOverallSentiment = (articles) => {
    if (!articles.length) return "No Data";

    const totalScore = articles.reduce(
      (acc, article) => acc + article.sentimentScore,
      0
    );
    const averageScore = totalScore / articles.length;
    return categorizeSentiment(averageScore);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sentiment of News Categories
      </Typography>
      {categories.map((category) => (
        <Box key={category} sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>
            {category} News ({getOverallSentiment(categoryData[category] || [])}
            )
          </Typography>
          <Radar data={createChartData(categoryData[category] || [])} />
        </Box>
      ))}
      <Typography variant="h4" gutterBottom>
        Sentiment of My Favorite Articles ({getOverallSentiment(favoritesData)})
      </Typography>
      <Radar data={createChartData(favoritesData)} />
    </Box>
  );
};

export default Analysis;
