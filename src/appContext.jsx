import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  user: null,
  books: [],
  borrowedBooks: [],
};

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT_USER':
      return { ...state, user: null };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
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
        if (response.ok) {
          const userData = await response.json();
          dispatch({ type: 'SET_USER', payload: userData });
        }
      } catch (error) {
        console.error('Error checking session', error);
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