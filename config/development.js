/* eslint-disable */
import { Platform } from 'react-native';
import config from './production';

const apiEndpoint = Platform.OS === 'ios' ? 'https://api.dooptha.com' : 'https://api.dooptha.com';
const socketIoEndpoint = Platform.OS === 'ios' ? 'https://api.dooptha.com/flood' : 'https://api.dooptha.com/flood';

const devConfig = {
  API_ENDPOINT: apiEndpoint,
  SOCKET_IO_ENDPOINT: socketIoEndpoint,
  ROLLBACK_ENABLED: false,
};

export default Object.assign(config, devConfig);
