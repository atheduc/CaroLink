







// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function Post() {
//   let { id } = useParams();
//   const [postObject, setPostObject] = useState({});
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
//       setPostObject(response.data);
//     });

//     axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
//       setComments(response.data);
//     });
//   }, [id]);

//   const addComment = () => {
//     axios
//       .post(
//         "http://localhost:3001/comments",
//         {
//           commentBody: newComment,
//           PostId: id,
//         },
//         {
//           headers: {
//             accessToken: sessionStorage.getItem("accessToken"),  // Add token to headers
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data.error) {
//           console.log(response.data.error);
//         } else {
//           const commentToAdd = { commentBody: newComment };
//           setComments([...comments, commentToAdd]);
//           setNewComment("");
//         }
//       });


//       // .catch((error) => {
//       //   console.error("Error posting comment:", error);  // Handle any errors
//       // });
//   };

//   return (
//     <div className="postPage">
//       <div className="leftSide">
//         <div className="post" id="individual">
//           <div className="title"> {postObject.title} </div>
//           <div className="body">{postObject.postText}</div>
//           <div className="footer">{postObject.username}</div>
//         </div>
//       </div>
//       <div className="rightSide">
//         <div className="addCommentContainer">
//           <input
//             type="text"
//             placeholder="Comment..."
//             autoComplete="off"
//             value={newComment}
//             onChange={(event) => {
//               setNewComment(event.target.value);
//             }}
//           />
//           <button onClick={addComment}> Add Comment</button>
//         </div>
//         <div className="listOfComments">
//           {comments.map((comment, key) => (
//             <div key={key} className="comment">
//               {comment.commentBody}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;


// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";
// import { AuthContext } from "../helpers/AuthContext";

// function Post() {
//   let { id } = useParams();
//   const [postObject, setPostObject] = useState({});
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const navigate = useNavigate(); // Use useNavigate for redirection
//   const { authState } = useContext(AuthContext); 


//   useEffect(() => {
//     axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
//       setPostObject(response.data);
//     });

//     axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
//       setComments(response.data);
//     });
//   }, [id]);

//   const addComment = () => {
//     // Check if the user is logged in by looking for the accessToken in sessionStorage
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       // If the user is not logged in, prompt them to log in and redirect to the login page
//       const shouldRedirect = window.confirm(
//         "You need to be logged in to comment. Do you want to log in?"
//       );
//       if (shouldRedirect) {
//         navigate("/login"); // Redirect to the login page
//       }
//       return;
//     }

//     // If the user is logged in, send the comment
//     axios
//       .post(
//         "http://localhost:3001/comments",
//         {
//           commentBody: newComment,
//           PostId: id,
//         },
//         {
//           headers: {
//             accessToken: accessToken, // Send the accessToken in the headers
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data.error) {
//           console.log(response.data.error);
//         } else {
//           const commentToAdd = {
//             commentBody: newComment,
//             username: response.data.username,
//           };
//           setComments([...comments, commentToAdd]);
//           setNewComment("");
//         }
//       })
//       .catch((error) => {
//         console.error("Error posting comment:", error);
//       });
//   };


//   const deleteComment = (id) => {
//     axios
//       .delete(`http://localhost:3001/comments/${id}`, {
//         headers: { accessToken: localStorage.getItem("accessToken") },
//       })
//       .then(() => {
//         setComments(
//           comments.filter((val) => {
//             return val.id != id;
//           })
//         );
//       });
//   };
//   //added

//   return (
//     <div className="postPage">
//       <div className="leftSide">
//         <div className="post" id="individual">
//           <div className="title"> {postObject.title} </div>
//           <div className="body">{postObject.postText}</div>
//           <div className="footer">{postObject.username}</div>
//         </div>
//       </div>
//       <div className="rightSide">
//         <div className="addCommentContainer">
//           <input
//             type="text"
//             placeholder="Comment..."
//             autoComplete="off"
//             value={newComment}
//             onChange={(event) => {
//               setNewComment(event.target.value);
//             }}
//           />
//           <button onClick={addComment}> Add Comment</button>
//         </div>
//         <div className="listOfComments">
//           {comments.map((comment, key) => {
//             return (
//               <div key={key} className="comment">
//                 {comment.commentBody}
//                 <label> Username: {comment.username}</label>
//                 {authState.username === comment.username && (
//                   <button
//                     onClick={() => {
//                       deleteComment(comment.id);
//                     }}
//                   >
//                     X
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;


// //Working ni
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../helpers/AuthContext";

// function Post() {
//   let { id } = useParams();
//   const [postObject, setPostObject] = useState({});
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const navigate = useNavigate();
//   const { authState } = useContext(AuthContext);

//   // Log authState to ensure it is being loaded correctly
//   useEffect(() => {
//     console.log("Authenticated user:", authState.username);

//     axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
//       setPostObject(response.data);
//     });

//     axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
//       setComments(response.data);
//     });
//   }, [id, authState.username]);

//   const addComment = () => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       const shouldRedirect = window.confirm(
//         "You need to be logged in to comment. Do you want to log in?"
//       );
//       if (shouldRedirect) {
//         navigate("/login");
//       }
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:3001/comments",
//         {
//           commentBody: newComment,
//           PostId: id,
//         },
//         {
//           headers: {
//             accessToken: accessToken,
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data.error) {
//           console.log(response.data.error);
//         } else {
//           const commentToAdd = {
//             commentBody: newComment,
//             username: response.data.username,
//           };
//           setComments([...comments, commentToAdd]);
//           setNewComment("");
//         }
//       })
//       .catch((error) => {
//         console.error("Error posting comment:", error);
//       });
//   };

//   const deleteComment = (id) => {
//     console.log(`Attempting to delete comment with ID: ${id}`);
  
//     // Ensure accessToken is present
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//       alert("You must be logged in to delete a comment.");
//       return;
//     }
  
//     // Delete request to the backend
//     axios
//       .delete(`http://localhost:3001/comments/${id}`, {
//         headers: { accessToken: accessToken },
//       })
//       .then((response) => {
//         // Check for success response
//         console.log("Comment deleted successfully:", response.data);
  
//         // Update state to remove the comment locally after successful deletion
//         setComments(comments.filter((comment) => comment.id !== id));
//       })
//       .catch((error) => {
//         console.error("Error deleting comment:", error);
//         alert("Failed to delete comment.");
//       });
//   };
  
//   const deletePost = (id) => {
//     axios
//       .delete(`http://localhost:3001/posts/${id}`, {
//         headers: { accessToken: localStorage.getItem("accessToken") },
//       })
//       .then(() => {
//         navigate("/");
//       });
//   };

//   return (
//     <div className="postPage">
//       <div className="leftSide">
//         <div className="post" id="individual">
//           <div className="title"> {postObject.title} </div>
//           <div className="body">{postObject.postText}</div>
//           <div className="footer"> {postObject.username}
//             {authState.username === postObject.username && (
//               <button
//                 onClick={() => {
//                   deletePost(postObject.id);
//                 }}
//               >
//                 {" "}
//                 Delete Post
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="rightSide">
//         <div className="addCommentContainer">
//           <input
//             type="text"
//             placeholder="Comment..."
//             autoComplete="off"
//             value={newComment}
//             onChange={(event) => {
//               setNewComment(event.target.value);
//             }}
//           />
//           <button onClick={addComment}> Add Comment</button>
//         </div>
//         <div className="listOfComments">
//           {comments.map((comment, key) => {
//             // Log comment username for debugging purposes
//             console.log("Comment username:", comment.username);

//             return (
//               <div key={key} className="comment">
//                 {comment.commentBody}
//                 <label> Username: {comment.username}</label>
//                 {authState.username === comment.username && (
//                   <button
//                     onClick={() => {
//                       deleteComment(comment.id);
//                     }}
//                   >
//                     X
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;





import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  // Log authState to ensure it is being loaded correctly
  useEffect(() => {
    console.log("Authenticated user:", authState.username);

    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id, authState.username]);

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
        {
          headers: {
            accessToken: accessToken,
          },
        }
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

  const deleteComment = (id) => {
    console.log(`Attempting to delete comment with ID: ${id}`);
  
    // Ensure accessToken is present
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("You must be logged in to delete a comment.");
      return;
    }
  
    // Delete request to the backend
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: accessToken },
      })
      .then((response) => {
        // Check for success response
        console.log("Comment deleted successfully:", response.data);
  
        // Update state to remove the comment locally after successful deletion
        setComments(comments.filter((comment) => comment.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment.");
      });
  };
  
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      const newTitle = prompt("Enter New Title:");
      axios
        .put(
          "http://localhost:3001/posts/title", // Ensure this matches the backend route
          {
            id: postObject.id, // Pass the correct post ID
            newTitle: newTitle,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setPostObject({ ...postObject, title: newTitle }); // Update UI
          alert("Title updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating post title:", error);
          alert("Failed to update title.");
        });
    } else if (option === "body") {
      const newPostText = prompt("Enter New Text:");
      axios
        .put(
          "http://localhost:3001/posts/postText", // Ensure this matches the backend route
          {
            id: postObject.id,
            newText: newPostText,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setPostObject({ ...postObject, postText: newPostText }); // Update UI
          alert("Body updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating post body:", error);
          alert("Failed to update body.");
        });
    }
  };
  

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
        <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer"> {postObject.username}
            {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            // Log comment username for debugging purposes
            console.log("Comment username:", comment.username);

            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
