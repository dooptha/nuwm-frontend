/* eslint-disable */
import { Platform } from 'react-native';
import config from './production';

const apiEndpoint = Platform.OS === 'ios' ? 'http://localhost:3000' : 'https://api.dooptha.com';
const socketIoEndpoint = Platform.OS === 'ios' ? 'http://localhost:3000/flood' : 'https://api.dooptha.com/flood';

const devConfig = {
  API_ENDPOINT: apiEndpoint,
  SOCKET_IO_ENDPOINT: socketIoEndpoint,
  ROLLBACK_ENABLED: false,
};

export default Object.assign(config, devConfig);
