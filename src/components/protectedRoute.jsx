import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../appContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { state } = useAppContext();
  const { user } = state;

  console.log('ProtectedRoute State:', state);
  console.log('ProtectedRoute User:', user);

  // Handle null user (loading state)
  if (user === null) {
    
    return null;
  }
const role = user.role?.User; // Safely access 'User' key

  // Check if role exists and is allowed
  if (!role || !allowedRoles.includes(role)) {
    
    return <Navigate to="/dashboard" replace />;
  }

  console.log('User is authorized with role:', role);
  return <Outlet />; // Render child routes if authorized
};

export default ProtectedRoute;