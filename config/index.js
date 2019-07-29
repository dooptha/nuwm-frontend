import { Platform } from 'react-native';
import overrideConfig from '../override';

/* eslint-disable */
const apiEndpoint = __DEV__ ? Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000' : 'production_api';
const socketIoEndpoint = __DEV__ ? Platform.OS === 'ios' ? 'http://localhost:3000/flood' : 'http://10.0.2.2:3000/flood' : 'production_api';

const config = {
  API_ENDPOINT: apiEndpoint,
  SOCKET_IO_ENDPOINT: socketIoEndpoint,
  INITIAL_ROUTE_NAME: 'Settings', /* [Timetable, Conversations, Settings] */
  INSTAGRAM_HASHTAG: 'нувгп',
  TWITTER_HASHTAG: 'нувгп',
  CONTACT_EMAIL: 'pelykh_ak15@nuwm.edu.ua',
  WEBSITE_URL: 'https://dooptha.com',
  GITHUB_URL: 'https://github.com/dooptha',
  DISCORD_URL: 'https://discord.gg/NEqGFEa',
  USE_DEFAULT_PROPERTIES: false,
};

export default __DEV__ ? { ...config, ...overrideConfig } : config;
