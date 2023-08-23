import React, { useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";
import { toastOptions } from "./Signup";
import axios from "axios";
import { backendUrl } from "../utils/URLs";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  // const [background, setBackground] = useState("bg2");
  // const [backgroundNo, setBackgroundNo] = useState(2);
  // useEffect(() => {
  //   setInterval(() => {
  //     setBackgroundNo((prev) => {
  //       var bgNumber;
  //       if (prev === 6) {
  //         bgNumber = 2;
  //       } else {
  //         bgNumber = prev + 1;
  //       }
  //       setBackground(() => `bg${bgNumber}`);
  //       return bgNumber;
  //     });
  //   }, 5000);
  // }, []);

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

  const isLoggedIn = async ()=>{
    const token = localStorage.getItem('token');
    if (token) {
      const {data} = await axios.post(`${backendUrl}/api/user/verifyToken`, {token});
      if (data.isVerified) {
        navigate('/home');
      }
    }
  }
  useEffect(()=>{
    isLoggedIn();
  },[])
  
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error(
        "Please provide input in all the fields.",
        toastOptions
      );
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        formData
      );
      if (data.error) {
        return toast.error(data.error)
      }
      toast.success("Logged in successfully.", toastOptions);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("savedNews", JSON.stringify(data.savedNews));
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    // <div className={`container ${background}`}>
    <div  className={`container ${background} ${backgroundClass}`}>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="icon-container">
            <BiLogInCircle size={48} color="white" />
          </div>
          <label>Email:</label>
          <input type="email" placeholder="Email" name="email" value={email} onChange={handleInputChange}/>
          <label>Password:</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}/>
          <Link
            to={"/forgotPassword"}
            className="link"
            style={{ margin: "0px " }}
          >
            Forgot Password
          </Link>
          <button className="btn" type="submit">Log In</button>
          <Link to={"/signup"} className="link">
            Dont have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
