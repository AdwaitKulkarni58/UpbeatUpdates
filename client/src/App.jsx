import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Content from "./components/Content";
import Layout from "./components/Layout";
import UserInfo from "./components/Userinfo";
import Favorites from "./components/Favorites";
import Analysis from "./components/Analysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="app" element={<Layout />}>
          <Route path="content" element={<Content />} />
          <Route path="account" element={<UserInfo />}>
            <Route path="faves" element={<Favorites />} />
            <Route path="analysis" element={<Analysis />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
