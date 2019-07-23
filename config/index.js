// eslint-disable-next-line
const apiEndpoint = __DEV__ ? 'localhost:3000' : 'production_api';
const socketIoEndpoint = __DEV__ ? 'http://10.0.2.2:3000/flood' : 'production_api';

export default {
  API_ENDPOINT: apiEndpoint,
  SOCKET_IO_ENDPOINT: socketIoEndpoint,
  USE_DEFAULT_PROPERTIES: false,
  INITIAL_ROUTE_NAME: 'Conversations', /* [Timetable, Conversations, Settings] */
  INSTAGRAM_HASHTAG: 'нувгп',
  TWITTER_HASHTAG: 'нувгп',
};
