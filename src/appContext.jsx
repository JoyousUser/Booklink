import React, { createContext, useReducer, useEffect, useContext } from 'react';
import apiBaseUrl from './config';
import api from './services/api'

const AppContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null, 
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT_USER':
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
        const response = await fetch(`${apiBaseUrl}/api/auth/api/session`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          // If access token is expired, attempt to refresh it
          const refreshResponse = await fetch(`${apiBaseUrl}/api/auth/api/refresh`, {
              method: 'GET',
              credentials: 'include',
          });

          if (refreshResponse.ok) {
              const refreshedData = await refreshResponse.json();
              dispatch({ type: 'SET_USER', payload: { user: refreshedData.user, token: refreshedData.token } });
              return;
          }
      }
        if (response.ok) {
          const userData = await response.json();
          dispatch({ type: 'SET_USER', payload: userData });
        }
        
      } 
        catch (error) {
        console.error('Error checking session', error);
      }
    };

    checkSession();
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);