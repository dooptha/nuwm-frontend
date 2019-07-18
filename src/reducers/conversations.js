const conversationsReducer = (state, action) => {
  const { messages } = state;

  switch (action.type) {
    case 'sendMessage':
      messages.push(action.message);

      return {
        ...state,
        messages,
      };

    default:
      return state;
  }
};

export default conversationsReducer;
