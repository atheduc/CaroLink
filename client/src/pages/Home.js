import React from 'react';
import axios from "axios"; 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
          setListOfPosts(response.data);
        });
      }, []);

      const likeAPost = (postID) => {
        axios.post("http://localhost:3001/likes", { PostId: postID}, { headers: { accessToken: localStorage.getItem("accessToken")}}
      ).then((response) => {
        setListOfPosts(listOfPosts.map((post) => {
          if(post.id == postID){
            if(response.data.liked){
              return {...post, Likes: [...post.Likes, 0]};
            }else{
              const likesArray = post.Likes
              likesArray.pop()
              return {...post, Likes: likesArray};
            }
            
          }else{
            return post;
          }
        }))
      });
      }
    return(
        <div>
            {listOfPosts.map((value, key) => {
          return (
            
            <div className="post" key={key}> {/* Add key prop for better performance */}
              <div className="title"> {value.title} </div>
              <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}>{value.postText}</div>
              <div className="footer">
              {value.username}{" "}
              <button
                onClick={() => {
                  likeAPost(value.id);
                }}
              >
                {" "}
                Like
              </button>
              <label> {value.Likes.length}</label>
            </div>
            </div>
          );
        })}
        </div>
    )
}

export default Home