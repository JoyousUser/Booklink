// AppContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  user: null,
  books: [],
  borrowedBooks: [],
  // Add more state properties as needed
};

// Create context
const AppContext = createContext();

// Create reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    // Add more cases as needed
    default:
      return state;
  }
};

// Create context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume context
export const useAppContext = () => useContext(AppContext);