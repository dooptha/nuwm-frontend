const conversationsReducer = (state, action) => {
  const { messages } = state;

  switch (action.type) {
    case 'sendMessage':
      messages.push(action.message);

      return {
        ...state,
        messages,
      };
    case 'receiveMessage':
      messages.push(action.message);

      return {
        ...state,
        messages,
        unreadCounter: state.unreadCounter + 1,
      };

    case 'removeMessage':
      return {
        ...state,
        ...messages.filter((message) => message.id === action.messageId),
      };

    case 'readMessages':
      return {
        ...state,
        unreadCounter: 0,
      };

    default:
      return state;
  }
};

export default conversationsReducer;
