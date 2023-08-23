import React from 'react'
import '../styles/NewsPage.css'
import { useNavigate } from 'react-router-dom';

const NewsContainer = ({title, author, imageUrl, description, info}) => {
  const navigate = useNavigate();  
  const openDetail = ()=>{
      localStorage.setItem('newsDetail', JSON.stringify(info));
      navigate(`/news/newsDetail/${info.title}`);
  }

  return (
    <div className="news-container" onClick={openDetail}>
          <div className="heading"><h2>{title}</h2></div>
          <h4 className='author'>By {author}</h4>
          <div className="image-container"><img src={imageUrl} alt="Image" className='news-image'/></div>
          <div className="description"><h4>{description}</h4></div>
    </div>
  )
}

export default NewsContainer