/* eslint-disable */
import { Platform } from 'react-native';

const apiEndpoint = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
const socketIoEndpoint = Platform.OS === 'ios' ? 'http://localhost:3000/flood' : 'http://10.0.2.2:3000/flood';

export default {
  API_ENDPOINT: apiEndpoint,
  SOCKET_IO_ENDPOINT: socketIoEndpoint,
  ROLLBACK_ENABLED: false,
};
