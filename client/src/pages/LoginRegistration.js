import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../lgister.css';

const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Added error state
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    // Post login request to /auth/login
    axios
      .post("http://localhost:8081/auth/login", { username, password })
      .then((res) => {
        if (res.data.token) { // Check for token in response
          localStorage.setItem("accessToken", res.data.token); // Save the token
          navigate("/home"); // Redirect to home page
        } else {
          setErrorMessage(res.data.error || "Login failed!"); // Show error message
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred during login.");
      });
  };

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();

    // Post registration request to /auth/register
    axios
      .post("http://localhost:8081/auth/register", { username, password })
      .then(() => {
        setIsLogin(true); // Switch to Login Panel
        alert("Registration successful! Please log in.");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred during registration.");
      });
  };

  // Switch between Login and Register panels
  const switchContent = (action) => {
    setIsLogin(action === 'login');
  };

  return (
    <div className='login-register-container'>
      <div className={`content ${!isLogin ? 'active' : ''}`}>

        {/* Register Form */}
        <div className='col-md-6'>
          <form onSubmit={handleRegister}>
            <div className='header-text mb-4'>
              <h1>Create Account</h1>
            </div>
            <div className='input-group mb-3'>
              <input
                type='text'
                placeholder='Username'
                className='form-control form-control-lg bg-light fs-6'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                placeholder='Password'
                className='form-control form-control-lg bg-light fs-6'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input-group mb-3 justify-content-center'>
              <button className='btn border-white text-white w-59 fs-6'>Register</button>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className='col-md-6 right-box'>
          <form onSubmit={handleLogin}>
            <div className='header-text mb-4'>
              <h1>Sign In</h1>
            </div>
            <div className='input-group mb-3'>
              <input
                type='text'
                placeholder='Username'
                className='form-control form-control-lg bg-light fs-6'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                placeholder='Password'
                className='form-control form-control-lg bg-light fs-6'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input-group mb-3 justify-content-center'>
              <button className='btn border-white text-white w-59 fs-6'>Login</button>
            </div>
          </form>
        </div>

        {/* Switch Panel */}
        <div className='switch-content'>
          <div className='switch'>
            <div className='switch-panel switch-left'>
              <h1>Hello, Again</h1>
              <p>We are happy to see you back</p>
              <button
                className='hidden btn text-white w-50 fs-6'
                id='login'
                onClick={() => switchContent('login')}
              >
                Login
              </button>
            </div>
            <div className='switch-panel switch-right'>
              <h1>Welcome</h1>
              <p>Join Carolink, Link with Carolinians</p>
              <button
                className='hidden btn border-white text-white w-50 fs-6'
                id='register'
                onClick={() => switchContent('register')}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LoginRegistration;
