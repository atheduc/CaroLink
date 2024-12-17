
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { AuthContext } from "./helpers/AuthContext";
// import axios from "axios";
// import Home from "./pages/Home";
// import CreatePost from "./pages/CreatePost";
// import Post from "./pages/Post";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
// import Profile from "./pages/Profile";
// import ChangePassword from "./pages/ChangePassword";

// function App() {
//   const [authState, setAuthState] = useState({
//     username: "",
//     id: 0,
//     status: false,
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/auth/auth", {
//         headers: {
//           accessToken: localStorage.getItem("accessToken"),
//         },
//       })
//       .then((response) => {
//         if (response.data.error) {
//           setAuthState((prevState) => ({ ...prevState, status: false }));
//         } else {
//           setAuthState({
//             username: response.data.username,
//             id: response.data.id,
//             status: true,
//           });
//         }
//       })
//       .catch((err) => {
//         console.error("Authentication error:", err);
//         setAuthState((prevState) => ({ ...prevState, status: false }));
//       });
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setAuthState({ username: "", id: 0, status: false });
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState }}>
//       <Router>
//         <div className="navbar">
//           <Link to="/">Home</Link>
//           {authState.status && <Link to="/createpost">Create A Post</Link>}
//           {!authState.status && (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/registration">Registration</Link>
//             </>
//           )}
//         </div>
//         <div className="loggedInContainer">
//           {authState.status ? (
//             <>
//               <h1>{authState.username}</h1>
//               <button onClick={logout}>Logout</button>
//             </>
//           ) : null}
//         </div>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/createpost" element={<CreatePost />} />
//           <Route path="/post/:id" element={<Post />} />
//           <Route path="/registration" element={<Registration />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile/:id" element={<Profile />} />
//           <Route path="/changepassword" element={<ChangePassword />} /> 
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </Router>
//     </AuthContext.Provider>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

// Importing Pages
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import LoginRegistration from "./pages/LoginRegistration";
import Welcome from './components/Welcome';
import Home from './pages/Home';

// Importing Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/legitHome" element={<legitHome/>} />
      </Routes>
    </Router>
  )

}

export default App;
