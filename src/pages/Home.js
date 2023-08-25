import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Home.css'
import { backendUrl } from '../utils/URLs'
import axios from 'axios'
import Loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from './Signup'

const Home = () => {
  const [ trendingNews, setTrendingNews] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false)
  const navigate = useNavigate();
  const user = localStorage.getItem('userName');
  useEffect(()=>{
    if (!user) {
      toast.error("Not Authorized. Please Log in.",toastOptions);
      navigate("/");
  }
  },[])
  const getTrendingNews = async ()=>{
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/news/getTrendingNews`);
      setTrendingNews(data.headlines);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }
  
  const validityCheck = async ()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      toast.error("Not Authorized. Please Log in.",toastOptions);
    }else{
      const {data} = await axios.post(
        `${backendUrl}/api/user/verifyToken`,
        {token}
      );
      if (data.isVerified) {
        return
      }else{
        navigate('/');
        toast.error("Session expired. Please log in again.",toastOptions);
      }
    }
  }

  useEffect(()=>{
    validityCheck();
  },[])

  useEffect(()=>{
    getTrendingNews();
  },[])  

  


  return (
    <>
    <header>
        <Navbar />
    </header>
    <main className='main-home'>
        <h4>Hi {user}, Here are some trending news</h4>
        <div className="trending-container">
         {isLoading ? <img src={Loader} alt="Loading..."/> : 
         trendingNews && trendingNews.length > 0 ?
          (<>
            <div className="big-container">
              <a className="one" href={trendingNews[0]?.url} rel="noreferrer" target="_blank">
                <div className="category">Category: Entertainment</div>
                <div className="title">{trendingNews[0]?.title}</div>                
                <img src={trendingNews[0]?.urlToImage} alt="Trending News" className='trending-image'/>
              </a>
              <a className="two" href={trendingNews[1]?.url} rel="noreferrer" target="_blank">
                <div className="category">Category: Sports</div>
                <div className="title">{trendingNews[1]?.title}</div>
                <img src={trendingNews[1]?.urlToImage} alt="Trending News" className='trending-image'/>
              </a>
            </div>
            <div className="small-container">
              <a className="three" href={trendingNews[2]?.url} rel="noreferrer" target="_blank">
                <div className="category">Category: Health</div>
                <div className="title">{trendingNews[2]?.title}</div>
                <img src={trendingNews[2]?.urlToImage} alt="Trending News" className='trending-image'/>
              </a>
              <a className="four" href={trendingNews[3]?.url} rel="noreferrer" target="_blank">
                <div className="category">Category: Science</div>
                <div className="title">{trendingNews[3]?.title}</div>
                <img src={trendingNews[3]?.urlToImage} alt="Trending News" className='trending-image'/>
              </a>
            </div>
          </>) : (
            <div>No trending news available.</div>
        )}
        </div>
    </main>
    </>
);


}

export default Home
