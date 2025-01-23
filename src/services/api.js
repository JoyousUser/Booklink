import axios from 'axios';
import apiBaseUrl from '../config';

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
  });
  console.log('Axios Base URL:', import.meta.env.VITE_API_BASE_URL);
  
  export default api;
  