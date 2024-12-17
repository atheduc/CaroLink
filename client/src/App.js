import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

// Importing Pages
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import LoginRegistration from "./pages/LoginRegistration";
import LegitHome from "./pages/LegitHome"; // Import LegitHome

// Importing Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Welcome from "./components/Welcome";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/auth", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        });

        if (response.data.error) {
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };

    fetchAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {/* Wrap legitHome with routes for nested pages */}
          <Route path="/legitHome" element={<LegitHome />}>
            <Route path="home" element={<Home />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="loginregistration" element={<LoginRegistration />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
