







// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
  
//   const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

//   const login = () => {
//     const data = { username: username, password: password };
//     axios.post("http://localhost:3001/auth/login", data).then((response) => {
//       if (response.data.error) {
//         alert(response.data.error);
//       } else {
//         sessionStorage.setItem("accessToken", response.data);  // Store token in sessionStorage
//         navigate("/"); // Redirect on success
//       }
//     });
//   };

//   return (
//     <div className="loginContainer">
//       <label>Username:</label>
//       <input
//         type="text"
//         onChange={(event) => setUsername(event.target.value)}
//       />
//       <label>Password:</label>
//       <input
//         type="password"
//         onChange={(event) => setPassword(event.target.value)}
//       />

//       <button onClick={login}> Login </button>
//     </div>
//   );
// }

// export default Login;








// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = () => {
//     const data = { username: username, password: password };
//     axios.post("http://localhost:3001/auth/login", data).then((response) => {
//       if (response.data.error) {
//         alert(response.data.error);
//       } else {
//         localStorage.setItem("accessToken", response.data); //ep10
//         navigate("/"); // Redirect to the home page after login
//       }
//     });
//   };

//   return (
//     <div className="loginContainer">
//       <label>Username:</label>
//       <input
//         type="text"
//         onChange={(event) => {
//           setUsername(event.target.value);
//         }}
//       />
//       <label>Password:</label>
//       <input
//         type="password"
//         onChange={(event) => {
//           setPassword(event.target.value);
//         }}
//       />
//       <button onClick={login}> Login </button>
//     </div>
//   );
// }

// export default Login;



// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthState } = useContext(AuthContext); // Access AuthContext
//   const navigate = useNavigate(); // Use useNavigate from react-router-dom v6

//   const login = () => {
//     const data = { username, password };
//     axios
//       .post("http://localhost:3001/auth/login", data)
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           localStorage.setItem("accessToken", response.data);
//           setAuthState(true); // Set authState to true when login is successful
//           navigate("/"); // Redirect to the home page
//         }
//       })
//       .catch((err) => {
//         console.error("Login error:", err);
//         alert("An error occurred. Please try again.");
//       });
//   };

//   return (
//     <div className="loginContainer">
//       <label>Username:</label>
//       <input
//         type="text"
//         value={username}
//         onChange={(event) => setUsername(event.target.value)}
//         placeholder="Enter your username"
//       />
//       <label>Password:</label>
//       <input
//         type="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         placeholder="Enter your password"
//       />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;






// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthState } = useContext(AuthContext); // Access AuthContext
//   const navigate = useNavigate(); // Use useNavigate from react-router-dom v6

//   const login = () => {
//     const data = { username, password };
//     axios
//       .post("http://localhost:3001/auth/login", data)
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           localStorage.setItem("accessToken", response.data); // Save the token
//           setAuthState(true); // Update authState on login success
//           navigate("/"); // Redirect to home page
//         }
//       })
//       .catch((err) => {
//         console.error("Login error:", err);
//         alert("An error occurred. Please try again.");
//       });
//   };

//   return (
//     <div className="loginContainer">
//       <label>Username:</label>
//       <input
//         type="text"
//         value={username}
//         onChange={(event) => setUsername(event.target.value)}
//         placeholder="Enter your username"
//       />
//       <label>Password:</label>
//       <input
//         type="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         placeholder="Enter your password"
//       />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;





// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthState } = useContext(AuthContext); // Access AuthContext
//   const navigate = useNavigate(); // Use useNavigate from react-router-dom v6

//   const login = () => {
//     const data = { username, password };
//     axios
//       .post("http://localhost:3001/auth/login", data)
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           localStorage.setItem("accessToken", response.data); // Save the token
//           setAuthState({
//             username: response.data.username,
//             id: response.data.id,
//             status: true,
//           });
//           navigate("/"); // Redirect to home page
//         }
//       })
//       .catch((err) => {
//         console.error("Login error:", err);
//         alert("An error occurred. Please try again.");
//       });
//   };

//   return (
//     <div className="loginContainer">
//       <label>Username:</label>
//       <input
//         type="text"
//         value={username}
//         onChange={(event) => setUsername(event.target.value)}
//         placeholder="Enter your username"
//       />
//       <label>Password:</label>
//       <input
//         type="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         placeholder="Enter your password"
//       />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate(); // Use useNavigate from react-router-dom v6

  const login = () => {
    const data = { username, password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
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
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter your username"
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
