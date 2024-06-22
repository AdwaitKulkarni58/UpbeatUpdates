import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Content from "./components/Content";
import Layout from "./components/Layout";
import UserInfo from "./components/Userinfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="content" element={<Content />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<UserInfo />}>
            <Route path="faves" element={<div>My Favorites</div>} />
            <Route path="logout" element={<div>Log Out</div>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
