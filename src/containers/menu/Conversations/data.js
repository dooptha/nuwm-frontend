import config from '../../../../config';

export default {
  chat: {
    routeName: 'Conversation',
    params: {
      conversation: {
        id: '0',
        title: 'Flood',
      },
    },
  },
  twitter: {
    routeName: 'WebView',
    params: {
      url: `https://twitter.com/hashtag/${config.TWITTER_HASHTAG}?f=tweets&vertical=default&src=unkn`,
      title: 'Twitter',
    },
  },
  instagram: {
    routeName: 'WebView',
    params: {
      url: `https://www.instagram.com/explore/tags/${config.INSTAGRAM_HASHTAG}/?hl=uk`,
      title: 'Instagram',
    },
  },
};
