import React, { useEffect, useState } from 'react'
import {BiLogInCircle} from 'react-icons/bi';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';
import { backendUrl } from '../utils/URLs';
import { toast } from 'react-toastify';
import { toastOptions } from './Signup';


const ForgotPassword = () => {
  
  const [backgroundNo, setBackgroundNo] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const interval = setInterval(() => {
      setBackgroundNo((prev) => (prev === 6 ? 2 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const backgroundClass = isTransitioning ? "bg-transition" : "";
  const background = `bg${backgroundNo}`;



  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/forgotPassword`,{email});
      console.log(data);
      if (data.success) {
        toast.success(data.message, toastOptions);
        navigate("/");
      }else{
        toast.error("Email couldn't be sent, please try again later.");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error)
    }
  }
  return (
    <div  className={`container ${background} ${backgroundClass}`}>
      <div className="form-container">
        <form className='form' onSubmit={handleSubmit}>
          <div className="icon-container"><BiLogInCircle size={48} color='white'/></div>
          <label>Email:</label>
          <input type="email" placeholder='Email' value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
          <button className='btn' type='submit'>Send Email</button>
          <Link to={'/'} className='link'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword