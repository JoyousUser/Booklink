import axios from 'axios';
import apiBaseUrl from '../config';

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
  });
  
  export default api;
  