import pollReducer from './poll';
import userReducer from './user';
import appReducer from './app';
import conversationsReducer from './conversations';
import eventsReducer from './events';

const mainReducer = ({
  app,
  poll,
  conversations,
  user,
  events,
}, action) => ({
  poll: pollReducer(poll, action),
  app: appReducer(app, action),
  user: userReducer(user, action),
  conversations: conversationsReducer(conversations, action),
  events: eventsReducer(events, action),
});

export default mainReducer;
