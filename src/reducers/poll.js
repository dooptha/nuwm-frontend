const pollReducer = (state, action) => {
  switch (action.type) {
    case 'updateCurrentPoll':
      return {
        ...state,
        current: action.poll,
      };

    case 'updatePolls':
      return {
        ...state,
        items: action.polls,
      };

    default:
      return state;
  }
};

export default pollReducer;
