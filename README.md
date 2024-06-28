# Upbeat Updates:  
Welcome to Upbeat Updates! This project aims to provide users with a platform where they can read, save, and share positive news articles. The website categorizes news into various topics such as Business, Entertainment, General, Health, Science, Sports, and Technology. It also provides a positiveness analysis of the current news and how your preferences compare to the average news sentiment.  

<hr>

# Table of Contents:
[Features](#Features)  
[Tech Stack](#Tech-Stack)  
[Prerequisites](#Prerequisites)  
[Installation](#Installation)  
[Running the application](#Run)  
[Environment Variables](#Environment-Variables)  
[Routes](#Routes)  
[Screenshots](#Screenshots)  
[Contributions](#Contributions)  
[License](#License)  

<hr>

# Features:  
- User authentication.  
- Categorization of news articles.  
- Fetch the latest news as per categories.
- Save news articles.
- Delete saved news articles.  
- Share news articles on social media.  
- Positivity score for each article.
- Real-time K-Means clustering of articles as per positivity scores.
- Charts depicting real-time sentiment analysis of all articles, including saved articles.

<hr>

# Tech Stack:  
## Front-End:  
- React.js
- Material-UI
- Redux Toolkit
- Axios
- NewsAPI  

## Back-End:  
- Express.js
- Node.js
- MongoDB
- Mongoose
- BCrypt
- Sentiment
- K-Means

<hr>  
  
# Prerequisites:  
Make sure you have the following installed on your local machine:  
- Node.js (v12.x or later)
- MongoDB

<hr>

# Installation:  
1) Clone the repository:  
```
git clone https://github.com/AdwaitKulkarni58/UpbeatUpdates
cd UpbeatUpdates
```
2) Install the dependencies for the front-end:
```
cd client
npm install
```
3) Install the dependencies for the back-end:
```
cd server
npm install
```

<hr>

# Run:  
1) Set up MongoDB:
- Make sure MongoDB is running on your local machine. By default, the application expects MongoDB to be running at `mongodb://localhost:27017`.

2) Run the client:
- Navigate to the client folder and run the following:
```
cd client
npm run dev
```
The front-end client will run on port 3000 (`http://localhost:3000`)  

3) Run the server:
- Navigate to the server folder and run the following:
```
cd server
npm start
```
The back-end server will run on port 5000 (`http://localhost:5000`)

<hr>

# Environment-Variables:  
Create `.env` files in both the client and server root folders and add the following environment variables:  
```
VITE_API_KEY=<your-news-api-key>
DATABASE_URL=<your-mongodb-connection-string>
```

<hr>

# Routes:  
## User Routes:  
- `POST /users/login`: Login with an email address and password, if the user doesn't exist, create a new user.
- `PUT /users/:email`: Edit account details of an existing user.
- `DELETE /users/:email`: Delete the account of an existing user.

## Article Routes:  
- `GET /users/:email/articles`: Get the user's saved articles.  
- `POST /users/:email/articles`: Save an article to the user account's favorites list.
- `DELETE /users/:email/articles`: Delete all saved articles from the user's account.
- `DELETE /users/:email/articles/:id`: Delete a particular saved article from the user's account.

<hr>

# Screenshots:  
  
## Landing Page:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/71f3c850-f443-4063-87eb-c623cd014ffb)
  
## About Page:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/35c9c448-d79f-4e58-9921-2fe8a5936e38)
  
## Main Page:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/8071d9eb-75fd-4846-9b6c-aaf160696d3d)
  
## Individual News Category Page:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/1081b546-05c8-428c-af33-5dd3d760b5bd)
  
## Profile Page:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/dd4f1e54-a361-49a3-8212-2dd5b96cbb35)
  
## Personal Favorites Page:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/fc8022c3-1c39-44bf-81c7-d84a702f2d92)
  
## Analysis Pages:  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/04cd8f6e-8924-485a-b7a2-9c5ed3de59c5)  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/cf75b73c-92bf-4af6-8376-282c3d98cf0a)  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/139f3797-3b51-44a4-9d03-d74eda5bca5f)  
  
![image](https://github.com/AdwaitKulkarni58/UpbeatUpdates/assets/65598707/d71c6893-2fc5-436d-8030-86006ad058a4)


<hr>

# Contributions:  
Contributions are welcome! Please open an issue or submit a pull request if you want to add a new feature or encounter a bug.  

<hr> 

# License:  
This project is licensed under the MIT License.  


