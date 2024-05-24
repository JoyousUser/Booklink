
import React, { createContext, useReducer, useContext } from 'react';


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
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    
    default:
      return state;
  }
};


export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);