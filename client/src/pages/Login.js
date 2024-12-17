import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../Login.css";  // Import login.css

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To capture error message
  const { setAuthState } = useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate(); // Use useNavigate from react-router-dom v6

  // Handle login
  const login = (event) => {
    event.preventDefault(); // Prevent form from refreshing
    const data = { username, password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error); // Display error message
        } else {
          // Save the token in localStorage
          localStorage.setItem("accessToken", response.data.token);

          // Update authState in context with user info
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });

          // Redirect to home page after login
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred. Please try again."); // Display general error message
      });
  };

  // Navigate to the registration page
  const goToRegister = () => {
    navigate("/registration");
  };

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h2>Login</h2>
        <form onSubmit={login}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <button type="submit">Login</button>
        </form>
        <p className="registerLink" onClick={goToRegister}>
          Don't have an account? <span>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
