import io from 'socket.io-client';
import Sound from 'react-native-sound';
import config from '../../config';

const newMessageSound = new Sound('new_message.mp3', Sound.MAIN_BUNDLE);
let socket;

export const socketEvents = ({ dispatch }) => {
  socket.on('message:received', (message) => {
    newMessageSound.play();

    dispatch({
      type: 'receiveMessage',
      message,
    });
  });

  socket.on('message:remove', (messageId) => (
    dispatch({
      type: 'removeMessage',
      messageId,
    })
  ));

  socket.on('online:update', (counter) => (
    dispatch({
      type: 'updateOnlineCounter',
      counter,
    })
  ));

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
