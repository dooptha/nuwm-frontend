/* eslint-disable */
export default {
  VERSION: '1.0.0',
  API_ENDPOINT: 'https://api.dooptha.com',
  SOCKET_IO_ENDPOINT: 'https://api.dooptha.com/flood',
  INITIAL_ROUTE_NAME: 'Timetable', /* [Timetable, Conversations, Settings] */
  INSTAGRAM_HASHTAG: 'нувгп',
  TWITTER_HASHTAG: 'нувгп',
  CONTACT_EMAIL: 'dooptha@gmail.com',
  WEBSITE_URL: 'https://dooptha.com',
  GITHUB_URL: 'https://github.com/dooptha',
  DISCORD_URL: 'https://discord.gg/Fcb922G',
  USE_DEFAULT_PROPERTIES: false,
  FORCE_SIGN_UP_PAGE: false,

  // Exception handlers params
  USE_CUSTOM_JS_EXCEPTION_HANDLER_IN_DEV: false,
  NATIVE_EXCEPTION_HANDLER_FORCE_APP_QUIT: false,
  NATIVE_EXCEPTION_HANDLER_EXECUTE_DEFAULT: false,

  // Rollback params
  ROLLBACK_APP_TOKEN: '1fb60ff4e452430f9b79b7634025450a', // Should move it to .env file
  ROLLBACK_ENABLED: true,
  ROLLBACK_USE_SOURCE_MAP: false,

  MAXIMUM_CHARS_IN_MESSAGE: 500,
  MAX_USERNAME_LENGTH: 30,
};
