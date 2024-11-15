import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

// Import your pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookLink from './pages/BookLink';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';
import TestComponent from './components/testComponent';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/booklink', element: <BookLink /> },
  { path: '/browse', element: <Browse /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/hello', element: <TestComponent /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);