/* eslint-disable */
export default {
  VERSION: '1.0.0',
  API_ENDPOINT: 'http://192.168.0.101:3000',
  SOCKET_IO_ENDPOINT: 'http://192.168.0.101:3000/',
  INITIAL_ROUTE_NAME: 'Timetable', /* [Timetable, Conversations, Settings] */
  INSTAGRAM_HASHTAG: 'нувгп',
  TWITTER_HASHTAG: 'нувгп',
  CONTACT_EMAIL: 'dooptha@gmail.com',
  WEBSITE_URL: 'https://dooptha.com',
  GITHUB_URL: 'https://github.com/dooptha',
  DISCORD_URL: 'https://discord.gg/Fcb922G',
  USE_DEFAULT_PROPERTIES: false,

  // Exception handlers params
  USE_CUSTOM_JS_EXCEPTION_HANDLER_IN_DEV: false,
  NATIVE_EXCEPTION_HANDLER_FORCE_APP_QUIT: false,
  NATIVE_EXCEPTION_HANDLER_EXECUTE_DEFAULT: false,

  // Rollback params
  ROLLBACK_APP_TOKEN: '1fb60ff4e452430f9b79b7634025450a', // Should move it to .env file
  ROLLBACK_ENABLED: true,
  ROLLBACK_USE_SOURCE_MAP: false,
};
