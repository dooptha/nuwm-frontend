import io from 'socket.io-client';
import config from '../../config';

export const socketEvents = ({ dispatch, socket }) => {
  socket.on('message:received', (message) => (
    dispatch({
      type: 'receiveMessage',
      message,
    })));
};

export const initSockets = ({ dispatch, token }) => {
  const socket = io(config.SOCKET_IO_ENDPOINT, {
    query: `token=${token}`,
    secure: true,
    forceNew: true,
  });

  socketEvents({ dispatch, socket });

  return socket;
};
