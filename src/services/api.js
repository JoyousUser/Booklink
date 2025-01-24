import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });
  console.log('Axios Base URL:', import.meta.env.VITE_API_BASE_URL);
  
  export default api;
  