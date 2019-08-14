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
        unreadCounter: state.unreadCounter + (action.isInConversation ? 0 : 1),
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

    case 'loadMessages':
      return {
        ...state,
        messages: action.messages,
      };

    default:
      return state;
  }
};

export default conversationsReducer;
