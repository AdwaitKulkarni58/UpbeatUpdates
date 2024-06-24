import Sentiment from "sentiment";
const sentiment = new Sentiment();

export const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);
  return result.score;
};

export const categorizeSentiment = (score) => {
  if (score <= -2) {
    return "Very Negative";
  } else if (score < 0) {
    return "Negative";
  } else if (score === 0) {
    return "Neutral";
  } else if (score <= 2) {
    return "Positive";
  } else {
    return "Very Positive";
  }
};
