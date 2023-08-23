import React, { useEffect, useState } from 'react'
import {VscSignIn} from 'react-icons/vsc';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import '../styles/auth.css';
import axios from 'axios';
import { backendUrl } from '../utils/URLs';

export const toastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
}

const initialState = {
  userName: "",
  email:"",
  password:""
}

const Signup = () => {

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

  const [formData, setFormData] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const {email, password, userName} = formData;
  const navigate = useNavigate();

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData({...formData, [name] : value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
        if (!userName || !email || !password || !confirmPassword) {
            return toast.error("Please provide input in all the fields.",toastOptions)
        }
        if (password.length < 6) {
            return toast.error("Password must be more than 6 characters.", toastOptions)
        }
        if (password!==confirmPassword) {
            return toast.error("Password must match.", toastOptions)
        }
        try {
          const {data} = await axios.post(`${backendUrl}/api/user/signup`,formData);
          if (data.error) {
            return toast.error(data.error)
          }
          toast.success("Signed in successfully.");
          localStorage.setItem('email', data.email);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userName', data.userName);
          navigate('/home');
        } catch (error) {
          toast.error(error.message,toastOptions)
        }
}


  return (
    <div  className={`container ${background} ${backgroundClass}`}>
      <div className="form-container">
        <form className='form' onSubmit={handleSubmit}>
          <div className="icon-container"><VscSignIn size={48} color='white'/></div>
          <label>Username:</label>
          <input type="text" placeholder='Username' name='userName' value={userName} onChange={handleInputChange}/>
          <label>Email:</label>
          <input type="email" placeholder='Email' name='email' value={email} onChange={handleInputChange}/>
          <label>Password:</label>
          <input type="password" placeholder='Password' name='password' value={password} onChange={handleInputChange}/>
          <label>Confirm Password:</label>
          <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <button type='submit' className='btn'>Sign In</button>
          <Link to={'/'} className='link'>Already have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup