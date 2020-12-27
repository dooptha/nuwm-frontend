export const splitLastLine = (str) => {
  const index = str.lastIndexOf('\n');
  if (index > 0) {
    return [str.substring(0, index), str.substring(index + 1)];
  }

  return ['', str];
};

export const formatDate = (date) => (
  date.toLocaleDateString()
    .replace('/', '.')
    .replace('/', '.')
);

export const buildTelegramPostDeepLink = (str) => {
  const [channelName, postId] = str
    .replace('https://t.me/', '')
    .split('/');
  return `tg://resolve?domain=${channelName}&post=${postId}`;
};
