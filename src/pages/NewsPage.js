import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/NewsPage.css'
import '../styles/Paginate.css'
import SideBar from '../components/SideBar'
import ReactPaginate from 'react-paginate'
import NewsContainer from '../components/NewsContainer'
import Loader from '../assets/loader.gif'
import { useNavigate, useParams } from 'react-router-dom'
import { backendUrl } from '../utils/URLs'
import {FcLike} from 'react-icons/fc'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toastOptions } from './Signup'

const NewsPage = () => {
  const [allNews, setAllNews] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [openLiked, setOpenLiked] = useState(false);
  const {pageName} = useParams();  
  const navigate = useNavigate();
  const user = localStorage.getItem('userName');
  useEffect(()=>{
    if (!user) {
      toast.error("Not Authorized. Please Log in.",toastOptions);
      navigate("/");
  }
  },[])

  const getSingleNews = async ()=>{
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/news/getPageNews`, {pageName});     
      setAllNews(data.articles);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getSingleNews();
  },[])

  useEffect(()=>{
    getSingleNews();
  },[pageName])

  
  const itemsPerPage = 10;
  const initialPage = 0;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedItems = allNews?.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
    <SideBar pageName={pageName} openLiked={openLiked}/>
     <header>
      <Navbar />
     </header>
     <main>
     <div className={`sidebar-backdrop ${openLiked? "transfrom-back" : ""}`} onClick={()=>setOpenLiked(false)}></div>
      <div className={`liked ${openLiked? "none" : ""}`}>
            <FcLike size={32} style={{cursor: "pointer"}} onClick={()=>setOpenLiked(true)}/>
        </div>
     {isLoading ? (
          <img src={Loader} alt="Loading..." className='loader'/>
        ) : (
          <>
            {displayedItems?.map((item, index) => (
              <NewsContainer
                key={index}
                url={item.url}
                title={item.title}
                author={item.source.name}
                imageUrl={item.urlToImage}
                description={item.description}
                info={item}
              />
            ))}
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={Math.ceil((allNews?.length || 0) / itemsPerPage)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </>
        )}
      </main>
    </>
  )
}

export default NewsPage
