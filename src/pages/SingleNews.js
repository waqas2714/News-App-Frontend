import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/NewsPage.css";
import SideBar from "../components/SideBar";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils/URLs";
import Loader from "../assets/loader.gif";
import Comments from "../components/Comments";
import { FcLike } from "react-icons/fc";
import { toastOptions } from "./Signup";
import { toast } from "react-toastify";

const SingleNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [requiredNews, setRequiredNews] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const email = localStorage.getItem("email");
  const { newsTitle } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [openLiked, setOpenLiked] = useState(false);
  // name, title, imgUrl, description, content, reference
  const user = localStorage.getItem('userName');
  useEffect(()=>{
    if (!user) {
      toast.error("Not Authorized. Please Log in.",toastOptions);
      navigate("/");
  }
  },[])
  if (requiredNews) {
    var { content, description, name, url, urlToImage, title } = requiredNews;
  }
  const news = JSON.parse(localStorage.getItem("newsDetail"));

  const isSavedNews = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/isSaved`, {
        title,
        email,
      });
      if (data.isSaved) {
        setIsSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNews = async () => {
    if (!news) {
      const { data } = await axios.post(
        `${backendUrl}/api/user/getASavedNews`,
        { title: newsTitle, email }
      );
      setRequiredNews(data.requiredNews);
      setIsSaved(true)
    } else {
      setRequiredNews(() => {
        const { content, description, source, url, urlToImage, title } = news;
        return {
          content,
          description,
          name: source.name,
          url,
          urlToImage,
          title,
        };
      });
    }
  };

  const saveNews = async () => {
    try {
      const { data } = await axios.patch(`${backendUrl}/api/user/saveNews`, {
        name: news.source.name,
        title: news.title,
        urlToImage: news.urlToImage,
        description: news.description,
        content: news.content,
        url: news.url,
        email,
      });
        setIsSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unsaveNews = async () => {
    try {
      const { data } = await axios.patch(`${backendUrl}/api/user/unSaveNews`, {
        title,
        email,
      });
        setIsSaved(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async()=>{
    try {
        const {data} = await axios.post(`${backendUrl}/api/comment/getComments`, {title});   
        if (data.length > 0) {
            setComments(data);
            console.log(comments);
        }         
    } catch (error) {
        console.log(error);
    }
}

useEffect(()=>{
    getComments();
},[])


  useEffect(() => {
    isSavedNews();
    getNews();
  }, []);

  useEffect(() => {
    isSavedNews();
    getNews();
  }, [newsTitle]);

  useEffect(()=>{
    getNews();
  },[isSaved])

  return (
    <>
      <SideBar isSaved = {isSaved} openLiked={openLiked}/>
      <header>
        <Navbar />
      </header>
      <main>
      <div className={`sidebar-backdrop ${openLiked? "transfrom-back" : ""}`} onClick={()=>setOpenLiked(false)}></div>
      <div className={`liked ${openLiked? "none" : ""}`}>
            <FcLike size={32} style={{cursor: "pointer"}} onClick={()=>setOpenLiked(true)}/>
        </div>
        {requiredNews || requiredNews?.title.length > 0 ? (
          <div className="news-container" style={{cursor: "default"}}>
            <div className="source">
              <div className="heart">
                <AiFillHeart
                  size={32}
                  color={isSaved ? "red" : "black"}
                  style={{ cursor: "pointer" }}
                  onClick={isSaved ? unsaveNews : saveNews}
                />
              </div>
            </div>
            <div className="heading">
              <h2>{title}</h2>
            </div>
            <h4 className="author">By {name}</h4>
            <div className="image-container">
              <img src={urlToImage} alt="Image" className="news-image" />
            </div>
            <div className="description">
              <h4>{description}</h4>
            </div>
            <div className="content">
              <p>{content}</p>
            </div>
            <div className="reference">
              <h5 style={{fontSize: "1.2rem"}}>Reference : </h5>
              <a href={url} target="_blank" rel="noreferrer">
                <i style={{cursor :"pointer", textDecoration : "dotted", color: "blue"}}>Checkout for more details....</i>
              </a>
            </div>
            <Comments title={title} getComments={getComments} comments={comments} />
          </div>
        ) : (
          <>
            <img src={Loader} alt="Loading..." className="loader" />{" "}
            <h1 style={{ marginLeft: "4%" }}>{!isSaved ? "News Not Found Till Now" : `News removed from Liked Posts. Please check some other news.`}</h1>{" "}
          </>
        )}
      </main>
    </>
  );
};

export default SingleNews;
