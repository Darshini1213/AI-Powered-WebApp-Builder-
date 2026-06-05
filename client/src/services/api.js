import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config.js';

const BASE_URL = config.apiUrl;

const http = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((req) => {
  const token = Cookies.get('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message =
        'Cannot reach the server. Make sure the backend is running on port 5000.';
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      Cookies.remove('token');
      if (!window.location.pathname.includes('/login')) {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  }
);

const getErrorMessage = (error) => {
  const data = error.response?.data;
  return data?.errors?.[0]?.message || data?.message || error.message;
};

const api = {
  get: (url) => http.get(url),
  post: (url, data) => http.post(url, data ?? {}),
  put: (url, data) => http.put(url, data),
  delete: (url) => http.delete(url),
  getErrorMessage,
};

export default api;