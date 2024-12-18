import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";
import "./Profile.css"; // Import CSS for styling

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // Fetch basic user info
    axios
      .get(`http://localhost:3001/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });

    // Fetch the list of posts
    axios
      .get(`http://localhost:3001/posts/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, [id]);

  const likeAPost = (postId) => {
    axios
      .post(`http://localhost:3001/likes/${postId}`)
      .then(() => {
        setListOfPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, Likes: [...(post.Likes || []), {}] }
              : post
          )
        );
      })
      .catch((err) => {
        console.error("Error liking the post:", err);
      });
  };

  return (
    <div className="profileContainer">
      {/* User Basic Information */}
      <div className="profileHeader">
        <div className="profileDetails">
          <h1 className="profileUsername">{username}'s Profile</h1>
          {authState.username === username && (
            <button
              onClick={() => navigate("/changepassword")}
              className="changePasswordBtn"
            >
              Change My Password
            </button>
          )}
        </div>
      </div>

      {/* User Posts */}
      <div className="postsContainer">
        <h2 className="sectionTitle">Your Posts</h2>
        {listOfPosts.length > 0 ? (
          <div className="postsGrid">
            {listOfPosts.map((post) => (
              <div className="postCard" key={post.id}>
                <div
                  className="postBody"
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <h3 className="postTitle">{post.title}</h3>
                  <p className="postText">{post.postText}</p>
                </div>
                <div className="postFooter">
                  <div className="likeSection">
                    <ThumbUpIcon
                      onClick={() => likeAPost(post.id)}
                      className="likeIcon"
                    />
                    <span className="likeCount">
                      {post.Likes?.length ?? 0} Likes
                    </span>
                  </div>
                  <span className="postAuthor">By {post.username}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="noPostsText">No posts found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
