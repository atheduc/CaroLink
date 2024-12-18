import React, { useState, useEffect } from "react";
import { FaHome, FaInfoCircle } from "react-icons/fa"; // Importing the info icon for About Us
import "./LandingPage.css";
import video1 from './images/video1.mp4';


const LandingPage = ({ onLogin }) => {
  const [showAboutUs, setShowAboutUs] = useState(false); // State to toggle About Us visibility
  const [isDarkBackground, setIsDarkBackground] = useState(true); // State to toggle background color

  useEffect(() => {
    // Add a class to body when LandingPage is mounted
    document.body.classList.add("landing-body");

    // Cleanup by removing the class when LandingPage is unmounted
    return () => {
      document.body.classList.remove("landing-body");
    };
  }, []);

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs); // Toggle About Us section visibility
  };

  const toggleBackground = () => {
    setIsDarkBackground(!isDarkBackground); // Toggle the background color
  };

  return (
    <>
      {/* Transparent Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-brand">Carolink</h1>
        </div>
        <div className="navbar-middle">
          <div className="background-toggle-container">
            <button className="background-toggle-button" onClick={toggleBackground}>
              {isDarkBackground ? "Watch" : "Log in"}
            </button>
          </div>
        </div>
        <div className="navbar-right">
          <button className="navbar-about-us" onClick={toggleAboutUs}>
            <FaInfoCircle size={20} /> {showAboutUs ? "Close About Us" : "About Us"}
          </button>
        </div>
      </nav>

      {/* Landing Page Content */}
      <div className={`landing-container ${isDarkBackground ? "dark-bg" : "light-bg"}`}>
        {/* Background video for light mode */}
        {!isDarkBackground && (
          <video className="background-video" autoPlay loop>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="landing-content">
          <h1 className="landing-title">
            <FaHome size={40} /> Welcome to Carolink
          </h1>
          <p className="landing-subtitle">
            Discover a seamless experience with our modern design.
          </p>
          <button className="landing-button" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>

      {/* About Us Modal (Pop-up) */}
      {showAboutUs && (
        <div className="about-us-modal">
          <div className="about-us-modal-content">
            <h2>About Us</h2>
            <p>
              Carolink is a modern platform designed to connect and provide a seamless experience for Carolinian students.
              We aim to create a collaborative and informative space for our users.
            </p>
            <button className="close-about-us" onClick={toggleAboutUs}>Close</button>
          </div>
        </div>
      )}

      {/* Floating Shapes in Background */}
      <div className="floating-shapes">
        <div className="shape shape-circle"></div>
        <div className="shape shape-rectangle"></div>
        <div className="shape shape-triangle"></div>
        <div className="shape shape-square"></div>
        <div className="shape shape-diamond"></div>
        <div className="shape shape-arrow"></div>
      </div>
    </>
  );
};

export default LandingPage;
