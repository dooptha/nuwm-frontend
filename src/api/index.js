import axios from 'axios';
import config from '../../config';

export const api = axios.create({
  baseURL: config.API_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthHeaders = (token) => {
  api.defaults.headers.common['x-access-token'] = token;
};
