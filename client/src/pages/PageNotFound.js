import React from "react";
import { Link } from "react-router-dom";



function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <div className="message-container">
        <h1 className="error-title">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="description">Sorry, the page you’re looking for doesn’t exist.</p>
        <h3 className="home-link">
          Go back to the <Link to="/" className="home-link-text">Home Page</Link>
        </h3>
      </div>
    </div>
  );
}

export default PageNotFound;
