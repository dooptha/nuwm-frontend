import moment from 'moment';

const formatDate = (message) => moment(message.date).format('HH:mm');

const formattedMessage = (message) => ({
  ...message,
  date: formatDate(message),
});

const formatMessages = (messages) => (
  messages.map((message) => formattedMessage(message))
);

const findPendingMessageIndex = (messages, newMessage) => (
  messages.findIndex((message) => (
    !message.id
    && message.sender.id === newMessage.sender.id
    && message.body === newMessage.body
  ))
);

const conversationsReducer = (state, action) => {
  const { messages } = state;
  let index;

  switch (action.type) {
    case 'sendMessage':
      messages.push(formattedMessage(action.message));

      return {
        ...state,
        messages,
      };

    case 'receiveMessage':
      if (action.isSender) {
        index = findPendingMessageIndex(messages, action.message);
        messages.splice(index, 1, formattedMessage(action.message));
      } else {
        messages.push(formattedMessage(action.message));
      }

      return {
        ...state,
        messages,
        unreadCounter: state.unreadCounter + (action.isInConversation ? 0 : 1),
      };

    case 'removeMessages':
      return {
        ...state,
        messages: [],
        unreadCounter: 0,
      };

    case 'readMessages':
      return {
        ...state,
        unreadCounter: 0,
      };

    case 'loadMessages':
      return {
        ...state,
        messages: formatMessages(action.messages),
      };

    default:
      return state;
  }
};

export default conversationsReducer;
