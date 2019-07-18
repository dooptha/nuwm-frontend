import pollReducer from './poll';
import userReducer from './user';
import appReducer from './app';
import conversationsReducer from './conversations';

const mainReducer = ({
  app,
  poll,
  conversations,
  user,
  onlineCount,
  socket,
}, action) => ({
  poll: pollReducer(poll, action),
  app: appReducer(app, action),
  user: userReducer(user, action),
  conversations: conversationsReducer(conversations, action),
  onlineCount,
  socket,
});

export default mainReducer;
