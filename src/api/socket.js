import io from 'socket.io-client';
import config from '../../config';

let socket;

export const socketEvents = ({ dispatch }) => {
  socket.on('message:received', (message) => (
    dispatch({
      type: 'receiveMessage',
      message,
    })));
  socket.on('message:remove', (messageId) => (
    dispatch({
      type: 'removeMessage',
      messageId,
    })));

  socket.on('online:update', (counter) => (
    dispatch({
      type: 'updateOnlineCounter',
      counter,
    })));
};

export const initSockets = ({ dispatch, token }) => {
  if (socket) socket.disconnect();

  socket = io(config.SOCKET_IO_ENDPOINT, {
    query: `token=${token}`,
    secure: true,
    forceNew: true,
  });

  socketEvents({ dispatch, socket });
};

export default {
  socket,
  initSockets,
  emit: (event, data) => socket.emit(event, data),
};
