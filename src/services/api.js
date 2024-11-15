import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3500/',
    withCredentials: true,
});

export default API;