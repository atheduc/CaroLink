

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { AuthProvider } from "./helpers/AuthContext";
// import axios from "axios";
// import Home from "./pages/Home";
// import CreatePost from "./pages/CreatePost";
// import Post from "./pages/Post";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";

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
//           setAuthState({ ...authState, status: false });
//         } else {
//           setAuthState({
//             username: response.data.username,
//             id: response.data.id,
//             status: true,
//           });
//         }
//       });
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setAuthState({ username: "", id: 0, status: false });
//   };

//   return (
//     <div className="App">
//       <AuthProvider>
//         <Router>
//           <div className="navbar">
//             <Link to="/">Home</Link>
//             {authState.status && <Link to="/createpost">Create A Post</Link>}
//             {!authState.status && (
//                 <>
//                   <Link to="/login"> Login</Link>
//                   <Link to="/registration"> Registration</Link>
//                 </>
//               )}
//             </div>
//             <div className="loggedInContainer">
//               <h1>{authState.username} </h1>
//               {authState.status && <button onClick={logout}> Logout</button>}
//             </div>
        
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/createpost" element={<CreatePost />} />
//             <Route path="/post/:id" element={<Post />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          {authState.status && <Link to="/createpost">Create A Post</Link>}
          {!authState.status && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Registration</Link>
            </>
          )}
        </div>
        <div className="loggedInContainer">
          {authState.status ? (
            <>
              <h1>{authState.username}</h1>
              <button onClick={logout}>Logout</button>
            </>
          ) : null}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
