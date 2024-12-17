import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

// Importing Pages
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import Post from "../pages/Post";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import LoginRegistration from "../pages/LoginRegistration";

// Importing Components
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function LegitHome() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  // Authentication check on component mount
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
      <div className="app">
        {/* Header fixed at the top */}
        <Header />

        {/* Main layout with Sidebar and Content */}
        <div className="main-layout">
          <Sidebar />

          {/* Main content area */}
          <div className="content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/loginregistration" element={<LoginRegistration />} />
              <Route path="/testroute" element={<div>Testroute Works!</div>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default LegitHome;
