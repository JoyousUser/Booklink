import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import BookLink from './pages/BookLink';
import Browse from './pages/Browse';


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/home" element={<Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booklink" element={<BookLink />} />
        <Route path="/browse" element={<Browse />} />
        
        
      </Routes>
    </Router>
    
  )
}


export default App
