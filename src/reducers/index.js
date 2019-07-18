import pollReducer from './poll';
import userReducer from './user';
import appReducer from './app';
import conversationsReducer from './conversations';

const mainReducer = ({
  app,
  poll,
  conversations,
  user,
}, action) => ({
  poll: pollReducer(poll, action),
  app: appReducer(app, action),
  user: userReducer(user, action),
  conversations: conversationsReducer(conversations, action),
});

export default mainReducer;
