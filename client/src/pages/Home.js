


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';


// function Home() {
//   const [listOfPosts, setListOfPosts] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {

//     const token = localStorage.getItem("accessToken");
//     setIsLoggedIn(!!token);

//     axios.get("http://localhost:3001/posts").then((response) => {
//       setListOfPosts(response.data);
//     });
//   }, []);

//   const likeAPost = (postId) => {
//     if (!isLoggedIn) {
//       alert("You must be logged in to like a post!");
//       navigate("/login");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:3001/likes",
//         { PostId: postId },
//         { headers: { accessToken: localStorage.getItem("accessToken") } }
//       )
//       .then((response) => {
//         setListOfPosts(
//           listOfPosts.map((post) => {
//             if (post.id === postId) {
//               if (response.data.liked) {
//                 return { ...post, Likes: [...post.Likes, 0] };
//               } else {
//                 const likesArray = post.Likes;
//                 likesArray.pop();
//                 return { ...post, Likes: likesArray };
//               }
//             } else {
//               return post;
//             }
//           })
//         );
//       });
//   };

//   return (
//     <div>
//       {listOfPosts.map((value, key) => {
//         return (
//           <div className="post" key={key}>
//             <div className="title">{value.title}</div>
//             <div
//               className="body"
//               onClick={() => {
//                 navigate(`/post/${value.id}`);
//               }}
//             >
//               {value.postText}
//             </div>
//             <div className="footer">
//               {value.username}<ThumbUpIcon  onClick={() => {
//                   likeAPost(value.id);
//                 }}/>
//               <label>{value.Likes?.length ?? 0} Likes</label>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Home;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]); // Ensure it's always an array
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    axios
      .get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log the entire response
        setListOfPosts(response.data); // Directly set the array of posts
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const likeAPost = (postId) => {
    if (!isLoggedIn) {
      alert("You must be logged in to like a post!");
      navigate("/login");
      return;
    }

    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0], isLiked: true };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray, isLiked: false };
              }
            } else {
              return post;
            }
          })
        );

        // Toggle the like status in the likedPosts array
        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => id !== postId)); // Unliked
        } else {
          setLikedPosts([...likedPosts, postId]); // Liked
        }
      })
      .catch((error) => {
        console.error("Error liking the post:", error);
      });
  };

  return (
    <div>
      {listOfPosts.length === 0 ? (
        <p>No posts available.</p> // Show a message if there are no posts
      ) : (
        listOfPosts.map((value, key) => {
          return (
            <div className="post" key={key}>
              <div className="title">{value.title}</div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                {value.username}
                <ThumbUpIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={value.isLiked ? 'liked' : 'unliked'} // Use class to set color
                />
                <label>{value.Likes?.length ?? 0} Likes</label>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Home;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// function Home() {
//   const [listOfPosts, setListOfPosts] = useState([]); // Ensure it's always an array
//   const [likedPosts, setLikedPosts] = useState([]); // Track liked posts
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     setIsLoggedIn(!!token);

//     axios
//       .get("http://localhost:3001/posts", {
//         headers: { accessToken: localStorage.getItem("accessToken") },
//       })
//       .then((response) => {
//         console.log("API Response:", response.data); // Log the entire response
//         setListOfPosts(response.data); // Directly set the array of posts
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   const likeAPost = (postId) => {
//     if (!isLoggedIn) {
//       alert("You must be logged in to like a post!");
//       navigate("/login");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:3001/likes",
//         { PostId: postId },
//         { headers: { accessToken: localStorage.getItem("accessToken") } }
//       )
//       .then((response) => {
//         setListOfPosts(
//           listOfPosts.map((post) => {
//             if (post.id === postId) {
//               if (response.data.liked) {
//                 return { ...post, Likes: [...post.Likes, 0], isLiked: true };
//               } else {
//                 const likesArray = post.Likes;
//                 likesArray.pop();
//                 return { ...post, Likes: likesArray, isLiked: false };
//               }
//             } else {
//               return post;
//             }
//           })
//         );

//         // Toggle the like status in the likedPosts array
//         if (likedPosts.includes(postId)) {
//           setLikedPosts(likedPosts.filter((id) => id !== postId)); // Unliked
//         } else {
//           setLikedPosts([...likedPosts, postId]); // Liked
//         }
//       })
//       .catch((error) => {
//         console.error("Error liking the post:", error);
//       });
//   };

//   return (
//     <div>
//       {listOfPosts.length === 0 ? (
//         <p>No posts available.</p> // Show a message if there are no posts
//       ) : (
//         listOfPosts.map((value, key) => {
//           return (
//             <div className="post" key={key}>
//               <div className="title">{value.title}</div>
//               <div
//                 className="body"
//                 onClick={() => {
//                   navigate(`/post/${value.id}`);
//                 }}
//               >
//                 {value.postText}
//               </div>
//               <div className="footer">
//                 {value.username}
//                 <ThumbUpIcon
//                   onClick={() => {
//                     likeAPost(value.id);
//                   }}
//                   className={likedPosts.includes(value.id) ? 'liked' : 'unliked'} // Check if post is liked
//                 />
//                 <label>{value.Likes?.length ?? 0} Likes</label>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

// export default Home;
