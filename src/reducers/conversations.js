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
      };

    case 'removeMessage':
      return {
        ...state,
        ...messages.filter((message) => message.id === action.messageId),
      };

    default:
      return state;
  }
};

export default conversationsReducer;
