import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from '../src/appContext';
import apiBaseUrl from './config';
import api from './services/api'


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
