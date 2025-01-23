import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookLink from './pages/BookLink';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';
import { useAppContext } from './appContext';
import BookDetails from './components/bookDetails';
import ProtectedRoute from './components/protectedRoute';
import BackOffice from './pages/BackOffice';
import UserDetails from './components/userDetails';
import UserProfile from './components/userProfile';
import apiBaseUrl from './config';
import api from './services/api'

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
       
        <Route path="/book/:id" element={<BookDetails />} />
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Moderator']} />}>
          <Route path="/backoffice" element={<BackOffice />} />
          <Route path="/backoffice/users/:id" element={<UserDetails />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/user/me" element={<UserProfile />} />
      </Routes> 
    </Router>
   
  );
}

export default App;