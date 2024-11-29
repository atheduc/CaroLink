// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Use `useNavigate` instead of `useHistory`
// import axios from "axios";

// function Profile() {
//   let { id } = useParams();
//   let navigate = useNavigate(); // Initialize `useNavigate`
//   const [username, setUsername] = useState("");
//   const [listOfPosts, setListOfPosts] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
//       setUsername(response.data.username);
//     });

//     axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
//       setListOfPosts(response.data);
//     });
//   }, [id]); // Add `id` as a dependency to avoid stale data

//   return (
//     <div className="profilePageContainer">
//       <div className="basicInfo">
//         <h1>Username: {username}</h1>
//       </div>
//       <div className="listOfPosts">
//         {listOfPosts.map((value, key) => {
//           return (
//             <div key={key} className="post">
//               <div className="title">{value.title}</div>
//               <div
//                 className="body"
//                 onClick={() => {
//                   navigate(`/post/${value.id}`); // Use `navigate` here
//                 }}
//               >
//                 {value.postText}
//               </div>
//               <div className="footer">
//                 <div className="username">{value.username}</div>
//                 <div className="buttons">
//                   <label>{value.Likes.length}</label>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Profile;


import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Import the like icon
import { AuthContext } from "../helpers/AuthContext";


function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // Fetch basic user info (username)
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    }).catch((err) => {
      console.error("Error fetching user info:", err);
    });

    // Fetch the list of posts created by the user
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    }).catch((err) => {
      console.error("Error fetching posts:", err);
    });
  }, [id]);

  const likeAPost = (postId) => {
    // Implement your like post functionality here
    axios.post(`http://localhost:3001/likes/${postId}`).then((response) => {
      console.log("Post liked", response);
      // Optionally, you can update the list of posts to reflect the new like count
    }).catch((err) => {
      console.error("Error liking the post:", err);
    });
  };

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            {" "}
            Change My Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.length > 0 ? (
          listOfPosts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="title">{post.title}</div>
                <div
                  className="body"
                  onClick={() => {
                    navigate(`/post/${post.id}`); // Navigate to the post details page
                  }}
                >
                  {post.postText}
                </div>
                <div className="footer">
                  <span>{post.username}</span>
                  <ThumbUpIcon
                    onClick={() => {
                      likeAPost(post.id); // Call likeAPost when the like button is clicked
                    }}
                  />
                  <label>{post.Likes?.length ?? 0} Likes</label>
                </div>
              </div>
            );
          })
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

