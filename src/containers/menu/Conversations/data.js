import config from '../../../../config';

export default {
  telegram: () => ({
    routeName: 'WebView',
    params: {
      url: `${config.TELEGRAM_URL}`,
      title: 'Telegram',
    },
  }),
  events: () => ({
    routeName: 'Events',
    params: {
      title: 'Event',
    },
  }),
  event: ({ url }) => ({
    routeName: 'WebView',
    params: {
      url,
      title: 'Event',
    },
  }),
};
