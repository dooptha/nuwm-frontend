import {Platform} from 'react-native';
import config from './production';

/* eslint-disable */
const apiEndpoint = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
const socketIoEndpoint = Platform.OS === 'ios' ? 'http://localhost:3000/flood' : 'http://10.0.2.2:3000/flood';

const devConfig = {
  API_ENDPOINT: apiEndpoint,
  SOCKET_IO_ENDPOINT: socketIoEndpoint,
};

export default Object.assign(config, devConfig);