// src/services/api.js
import axios from 'axios';

const BASE_URLS = {
  user: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:3000',
};

const api = {
  user: axios.create({ baseURL: BASE_URLS.user }),
};

const setAuthToken = (token) => {
  if (token) {
    api.user.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.user.defaults.headers.common['Authorization'];
  }
};

export { api, setAuthToken };