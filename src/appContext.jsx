import React, { createContext, useReducer, useEffect, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  user: undefined, // Change to undefined for initial loading state
  token: localStorage.getItem('token') || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        token: action.payload?.accessToken || null
      };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT_USER':
      localStorage.removeItem('token');
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          // Try to refresh the token
          const refreshResponse = await fetch('http://localhost:3500/api/refresh', {
            method: 'GET', // Changed to POST as per your backend
            credentials: 'include',
          });

          if (!refreshResponse.ok) {
            dispatch({ type: 'LOGOUT_USER' });
            return;
          }

          // After successful refresh, try to get session again
          const newSessionResponse = await fetch('http://localhost:3500/api/session', {
            method: 'GET',
            credentials: 'include',
          });

          if (!newSessionResponse.ok) {
            dispatch({ type: 'LOGOUT_USER' });
            return;
          }

          const userData = await newSessionResponse.json();
          dispatch({ type: 'SET_USER', payload: userData });
        } else if (response.ok) {
          const userData = await response.json();
          dispatch({ type: 'SET_USER', payload: userData });
        }
      } catch (error) {
        console.error('Error checking session:', error);
        dispatch({ type: 'LOGOUT_USER' });
      }
    };

    checkSession();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);