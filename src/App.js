import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import AllNews from './pages/AllNews';
import SingleNews from './pages/SingleNews';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/news/:pageName' element={<NewsPage />} />
        <Route path='/news/all' element={<AllNews />} />
        <Route path='/news/newsDetail/:newsTitle' element={<SingleNews />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App