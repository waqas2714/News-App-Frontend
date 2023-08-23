import React, { useEffect, useState } from 'react'
import {BiLogInCircle} from 'react-icons/bi';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';
import { backendUrl } from '../utils/URLs';
import {toast} from 'react-toastify';
import { toastOptions } from './Signup';


const ResetPassword = () => {
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


  const {token} = useParams();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/resetPassword`, {token, newPassword : password})
      if (data.success) {
        toast.success(data.message,toastOptions)
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div  className={`container ${background} ${backgroundClass}`}>
      <div className="form-container">
        <form className='form' onSubmit={handleSubmit}>
          <div className="icon-container"><BiLogInCircle size={48} color='white'/></div>
          <label>New Password:</label>
          <input type="password" placeholder='New Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label>Confirm Password:</label>
          <input type="password" placeholder='Confirm Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
          <button className='btn' type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword