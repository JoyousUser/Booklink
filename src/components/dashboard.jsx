import React, { useEffect } from 'react';
import { useAppContext } from '../appContext';
import { useNavigate } from 'react-router-dom';

function DashboardComponent() {
  const { state, dispatch } = useAppContext(); // Changed from setState to dispatch
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        // Adjust these URLs to match your actual API endpoints
        const sessionRes = await fetch('http://localhost:3500/api/session', {
          credentials: 'include'
        });

        if (!sessionRes.ok) {
          // If session fails, try to refresh
          const refreshRes = await fetch('http://localhost:3500/api/refresh', {
            method: 'GET',
            credentials: 'include'
          });

          if (!refreshRes.ok) {
            throw new Error('Refresh failed');
          }

          // Get fresh session after refresh
          const newSessionRes = await fetch('http://localhost:3500/api/session', {
            credentials: 'include'
          });

          if (!newSessionRes.ok) {
            throw new Error('Session invalid');
          }

          const user = await newSessionRes.json();
          
          if (mounted) {
            dispatch({ type: 'SET_USER', payload: { user: user } });
          }
        } else {
          const user = await sessionRes.json();
          if (mounted) {
            dispatch({ type: 'SET_USER', payload: { user: user } });
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        if (mounted) {
          dispatch({ type: 'SET_USER', payload: null });
          navigate('/login');
        }
      }
    };

    checkSession();

    // Set up periodic refresh
    const refreshInterval = setInterval(async () => {
      try {
        const refreshRes = await fetch('http://localhost:3500/api/refresh', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (!refreshRes.ok) {
          throw new Error('Refresh failed');
        }
      } catch (error) {
        if (mounted) {
          dispatch({ type: 'SET_USER', payload: null });
          navigate('/login');
        }
      }
    }, 25000); // Refresh every 25 seconds since your token expires in 30

    return () => {
      mounted = false;
      clearInterval(refreshInterval);
    };
  }, [dispatch, navigate]);

  // Show loading when no user data yet
  if (!state.user && state.user !== null) {
    return (
      <div className="text-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle not logged in state
  if (!state.user?.user) {
    return (
      <div className="text-center p-4">
        <p>Please log in to view your dashboard</p>
      </div>
    );
  }

  const user = state.user.user;

  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role?.User}</p>

      <button > <a href="http://localhost:5173/dashboard/user/me">Profile</a></button>

      <button> Admin panel</button>
    </>
  );
}

export default DashboardComponent;