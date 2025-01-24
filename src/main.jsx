import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from '../src/appContext';
import apiBaseUrl from './config';
import api from './services/api'
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
