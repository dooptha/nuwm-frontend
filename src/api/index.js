import axios from 'axios';
import config from '../../config';

export const api = axios.create({
  baseURL: config.API_ENDPOINT,
  headers: {
    "Content-Type": 'application/json'
  },
});

export const setAuthHeaders = (authToken, deviceId) => {
  api.defaults.headers.common['x-access-token'] = authToken;
};
