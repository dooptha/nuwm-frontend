import axios from 'axios';
import config from '../../config';

export const api = axios.create({
  baseURL: config.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

export const setAuthHeaders = (authToken, deviceId) => {
  api.defaults.headers.common['Auth-Token'] = authToken;
  api.defaults.headers.common['Device-Token'] = deviceId;
};
