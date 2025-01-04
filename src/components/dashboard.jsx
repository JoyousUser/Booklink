import React, { useEffect } from 'react';
import { useAppContext } from '../appContext';
import { useNavigate } from 'react-router-dom';

function DashboardComponent() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const sessionRes = await fetch('http://localhost:3500/api/session', {
          credentials: 'include'
        });

        if (!sessionRes.ok) {
          const refreshRes = await fetch('http://localhost:3500/api/refresh', {
            method: 'GET',
            credentials: 'include'
          });

          if (!refreshRes.ok) {
            throw new Error('Refresh failed');
          }

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
    }, 25000);

    return () => {
      mounted = false;
      clearInterval(refreshInterval);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!state.user?.user) {
      navigate('/dashboard/user/me');
    }
  }, [state.user, navigate]);

  const sessionPrint = () => {
    console.log(state?.user);
  };

  if (state.user === undefined) {
    return (
      <div className="text-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!state.user?.user) {
    return (
      <>
        {sessionPrint()}
        <div className="text-center p-4">
          <p>Please log in to view your dashboard</p>
        </div>
      </>
    );
  }

  const user = state.user.user;

  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role?.User}</p>

      <button>
        <a href="http://localhost:5173/dashboard/user/me">Profile</a>
      </button>

      <button>
        <a href="http://localhost:5173/backoffice">Admin panel</a>
      </button>   
      </>
  );
}

export default DashboardComponent;
