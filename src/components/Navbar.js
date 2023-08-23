import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {BiPowerOff} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import './Navbar.css';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <nav>
        <div className="burger">
          <RxHamburgerMenu size={48} color='black' onClick={()=>setBurgerOpen(true)}/>
        </div>
        <div className="logo-container">
          <Link to={'/home'}>
          <img src={Logo} alt="Logo" className='nav-logo'/>
          </Link>
        </div>
        <div className={`backdrop ${burgerOpen? "transform-back" : ""}`} onClick={()=>setBurgerOpen(false)}></div>
        <div className={`vertical-links-container ${burgerOpen? "transform-back" : ""}`}>
        
            <Link to={'/news/all'} className = {'left-links'}> All News </Link>
            
            <Link to={'/news/science'} className = {'left-links'}> Science </Link>
            
            <Link to={'/news/health'} className = {'left-links'}> Health </Link>
            
            <Link to={'/news/sports'} className = {'left-links'}> Sports </Link>
            
            <Link to={'/news/entertainment'} className = {'left-links'}> Entertainment </Link>
        </div>
        <div className="links-container">
            <div className="link-and-underline">
            <Link to={'/news/all'} className = {'main-links'}> All News </Link>
            <div className="underline"></div>
            </div>
            <div className="link-and-underline">
            <Link to={'/news/science'} className = {'main-links'}> Science </Link>
            <div className="underline"></div>
            </div>
            <div className="link-and-underline">
            <Link to={'/news/health'} className = {'main-links'}> Health </Link>
            <div className="underline"></div>
            </div>
            <div className="link-and-underline">
            <Link to={'/news/sports'} className = {'main-links'}> Sports </Link>
            <div className="underline"></div>
            </div>
            <div className="link-and-underline">
            <Link to={'/news/entertainment'} className = {'main-links'}> Entertainment </Link>
            <div className="underline"></div>
            </div>
            <BiPowerOff
      size={48}
      color={isHovered ? 'red' : 'black'}
      style={{ cursor: 'pointer', transition: "0.3s ease-in-out", height: "2rem" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={logout}
    />
        </div>
    </nav>
  );
}

export default Navbar;
