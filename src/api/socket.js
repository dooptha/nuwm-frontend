import io from 'socket.io-client';
import Sound from 'react-native-sound';
import NavigationService from '../navigation/NavigationService';
import config from '../../config';

const newMessageSound = new Sound('new_message.mp3', Sound.MAIN_BUNDLE);
let socket;

export const socketEvents = ({ dispatch, user }) => {
  socket.on('connect', () => {
    dispatch({ type: 'connect' });
  });

  socket.on('connect_error', () => {
    dispatch({ type: 'disconnect' });
  });

  socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
      socket.connect();
    }

    dispatch({ type: 'disconnect' });
  });

  socket.on('message:received', (message) => {
    if (!message) return null;

    const currentRoute = NavigationService.getCurrentRoute();
    const isInConversation = currentRoute.routeName === 'Conversation';

    const isSender = user && message.sender
      && user._id === message.sender.id;

    console.log("USER", user, message, user._id, message.sender.id, isSender)

    if (!isInConversation && newMessageSound) {
      newMessageSound.play();
    }

    dispatch({
      type: 'receiveMessage',
      message,
      isInConversation,
      isSender,
    });

    return true;
  });

  socket.on('message:remove', (messageId) => (
    dispatch({
      type: 'removeMessage',
      messageId,
    })
  ));

  socket.on('counter:update', (counter) => {
    dispatch({
      type: 'updateOnlineCounter',
      counter,
    });
  });

  socket.on('messages:history', (messages) => {
    dispatch({
      type: 'loadMessages',
      messages,
    });
  });

  socket.on('poll:updated', (poll) => {
    dispatch({
      type: 'socketPollUpdated',
      poll,
    });
  });

  socket.on('poll:created', (poll) => {
    dispatch({
      type: 'socketPollCreated',
      poll,
    });
  });
};

export const initSockets = ({ dispatch, token, user }) => {
  if (socket) socket.disconnect();

  socket = io(config.SOCKET_IO_ENDPOINT, {
    query: `token=${token}`,
    secure: true,
    forceNew: true,
  });

  socketEvents({ dispatch, user });
};

export default {
  socket,
  initSockets,
  emit: (event, data) => socket.emit(event, data),
};
