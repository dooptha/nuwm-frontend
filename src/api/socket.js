import io from 'socket.io-client';
import config from '../utils/config';

export const socket = io(config.API_ENDPOINT);

export const socketEvents = ({ dispatch }) => {
  socket.on('message:received', ({ message }) => (
    dispatch({
      type: 'receiveMessage',
      message,
    })));
};

export const initSockets = ({ dispatch }) => {
  socketEvents({ dispatch });
};
