import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import BookLink from './pages/BookLink';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';
import { useAppContext } from './appContext';
import BookDetails from './components/bookDetails';


function App() {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/session', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          dispatch({ type: 'SET_USER', payload: userData });
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    checkSession();
  }, [dispatch]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/home" element={<Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booklink" element={<BookLink />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:id" element={<BookDetails />} />
        
        
      </Routes>
    </Router>
    
  )
}


export default App
