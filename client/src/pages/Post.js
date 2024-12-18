import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "./Post.css"; // Import a separate CSS file for cleaner code
import { FaExclamationTriangle } from "react-icons/fa"; // Importing an icon

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showErrorBanner, setShowErrorBanner] = useState(false); // State for error banner
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      const shouldRedirect = window.confirm(
        "You need to be logged in to comment. Do you want to log in?"
      );
      if (shouldRedirect) {
        navigate("/login");
      }
      return;
    }

    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        { headers: { accessToken } }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const deleteComment = (commentId) => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .delete(`http://localhost:3001/comments/${commentId}`, {
        headers: { accessToken },
      })
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setShowErrorBanner(true); // Show error banner on failure

        // Optionally hide the banner after 5 seconds
        setTimeout(() => {
          setShowErrorBanner(false);
        }, 5000);
      });
  };

  return (
    <div className="postPage">
      {/* Error banner */}
      {showErrorBanner && (
        <div className="errorBanner">
          <FaExclamationTriangle className="errorIcon" />
          <span className="errorMessage">Please Reload.</span>
          <button
            className="closeErrorBanner"
            onClick={() => setShowErrorBanner(false)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">
            Posted by: {postObject.username}
            {authState.username === postObject.username && (
              <button
                className="deletePostButton"
                onClick={() => {
                  axios
                    .delete(`http://localhost:3001/posts/${id}`, {
                      headers: { accessToken: localStorage.getItem("accessToken") },
                    })
                    .then(() => navigate("/"));
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            className="commentInput"
            type="text"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button className="addCommentButton" onClick={addComment}>
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          <h3>Comments:</h3>
          {comments.map((comment, index) => (
            <div
              key={index}
              className={`commentCard ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <p className="commentBody">{comment.commentBody}</p>
              <div className="commentFooter">
                <span>By: {comment.username}</span>
                {authState.username === comment.username && (
                  <button
                    className="deleteCommentButton"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
