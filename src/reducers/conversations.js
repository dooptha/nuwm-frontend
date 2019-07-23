const conversationsReducer = (state, action) => {
  const {messages} = state;

  switch (action.type) {
    case 'sendMessage':
      messages.push(action.message);

      return {
        ...state,
        messages,
      };
    case 'receiveMessage':
      console.log(action.message);
      messages.push(action.message);
      return {...state};

    default:
      return state;
  }
};

export default conversationsReducer;
