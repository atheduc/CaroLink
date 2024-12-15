import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../lgister.css';

function LoginRegisterTest() {
  const [isLogin, setIsLogin] = useState(true); // Tracks if we're on the Login or Register screen
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const switchContent = () => {
    setIsLogin(!isLogin); // Toggle between Login and Register form
  };

  const register = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/register", { username, email, password })
      .then(() => {
        switchContent(); // Switch to Login Panel after successful registration
        alert("Registration successful! Please log in.");
      })
      .catch((err) => console.log(err));
  };

  const login = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", { email, password })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("accessToken", res.data.accessToken); // Save the token
          navigate("/home");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-register-container'>
      <div className='content'>
        <div className={`switch-content ${isLogin ? 'active' : ''}`}>
          <div className='switch'>
            {/* Login Form */}
            {isLogin ? (
              <div className='switch-left'>
                <h1>Sign In</h1>
                <p>Welcome back, please sign in!</p>
                <form onSubmit={login}>
                  <div className='input-group mb-3'>
                    <input
                      type='email'
                      placeholder='Email'
                      className='form-control form-control-lg bg-light fs-6'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      type='password'
                      placeholder='Password'
                      className='form-control form-control-lg bg-light fs-6'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className='btn btn-lg w-100'>Login</button>
                </form>
              </div>
            ) : (
              // Register Form
              <div className='switch-right'>
                <h1>Create Account</h1>
                <p>Join our community!</p>
                <form onSubmit={register}>
                  <div className='input-group mb-3'>
                    <input
                      type='text'
                      placeholder='Username'
                      className='form-control form-control-lg bg-light fs-6'
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      type='email'
                      placeholder='Email'
                      className='form-control form-control-lg bg-light fs-6'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      type='password'
                      placeholder='Password'
                      className='form-control form-control-lg bg-light fs-6'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className='btn btn-lg w-100'>Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='switch-panel'>
        <button className='btn w-100' onClick={switchContent}>
          {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default LoginRegisterTest;
