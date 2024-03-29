import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});
