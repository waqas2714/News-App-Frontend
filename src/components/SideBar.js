import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import LikedPosts from './LikedPosts'
import axios from 'axios'
import { backendUrl } from '../utils/URLs'

const SideBar = ({isSaved, openLiked}) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const email = localStorage.getItem('email');
  
  const getLikedPosts = async ()=>{
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/getLikedPosts`, {email})
      setLikedPosts(data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    getLikedPosts();
  },[isSaved])

  return (
    <>
    <div className={`sidebar ${openLiked? "transfrom-back" : ""}`}>
      <h3>Liked Posts</h3>
      {likedPosts.length > 0 ? (
        likedPosts.map((item, index) => (
          <LikedPosts title={item} number={index + 1} key={index} />
        ))
      ) : (
        <p className="likedPosts">No liked posts.</p>
      )}
    </div>
    </>
  );
  
}

export default SideBar