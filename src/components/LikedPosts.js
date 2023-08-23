import React, { useEffect } from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

const LikedPosts = ({title, number}) => {
    const navigate = useNavigate();

    const seePost = async()=>{
      localStorage.removeItem('newsDetail');
      navigate(`/news/newsDetail/${title}`);
    }


  return (
    <div className="likedPosts" onClick={seePost}>
        <h5>{number}.</h5> <p style={{margin: "0px"}}>{title}</p>
    </div>
  )
}

export default LikedPosts