import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API_URL;