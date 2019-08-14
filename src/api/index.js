import axios from 'axios';
import config from '../../config';


/* eslint-disable */
if (__DEV__) {
  // Parse all network request to the chrome dev tools
  const _XHR = GLOBAL.originalXMLHttpRequest ?
      GLOBAL.originalXMLHttpRequest :
      GLOBAL.XMLHttpRequest

  XMLHttpRequest = _XHR
}
/* eslint-enable */


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
