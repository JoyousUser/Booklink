
import React from 'react';
import { useAppContext } from '../appContext'; 

import ListGroup from 'react-bootstrap/ListGroup';

function DashboardComponent() {
  const { state } = useAppContext();
  const { user } = state;
  

  return (
    <>
    
    
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      </>
      
      
    
  );
}

export default DashboardComponent;