/* eslint-disable */
export default {
  VERSION: '1.0.1',
  API_ENDPOINT: 'https://api.dooptha.com',
  SOCKET_IO_ENDPOINT: 'https://api.dooptha.com/flood',
  INITIAL_ROUTE_NAME: 'Timetable', /* [Timetable, Conversations, Settings] */
  INSTAGRAM_HASHTAG: 'нувгп',
  TELEGRAM_URL: 'tg://resolve?domain=nuwee_chat',
  TELEGRAM_CHANNEL_URL: 'tg://resolve?domain=nuwee_feed',
  TELEGRAM_BOT_URL: 'tg://resolve?domain=nuwee_bot',
  TWITTER_HASHTAG: 'нувгп',
  CONTACT_EMAIL: 'dooptha@gmail.com',
  WEBSITE_URL: 'https://dooptha.com',
  GITHUB_URL: 'https://github.com/dooptha',
  DISCORD_URL: 'https://discord.gg/Fcb922G',
  PRIVACY_POLICY_URL: 'https://dooptha.com/policy/nuwee',
  USE_DEFAULT_PROPERTIES: false,
  FORCE_SIGN_UP_PAGE: false,

  // Today Widget
  APP_GROUP: 'group.com.dooptha.nuwee',

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

  // 604800000 = every 7 days
  UPDATE_AUTOCOMPLETE_GROUPS_TIMER: 604800000,
  // 604800000 = every 7 days
  UPDATE_AUTOCOMPLETE_TEACHERS_TIMER: 604800000,
};
