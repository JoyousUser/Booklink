// components/Dashboard.jsx
import React from 'react';
import { useAppContext } from '../appContext'; 

function Dashboard() {
  const { state } = useAppContext();
  const { user } = state;
  

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      
    </div>
  );
}

export default Dashboard;