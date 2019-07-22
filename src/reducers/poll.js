const pollReducer = (state, action) => {
  switch (action.type) {
    case 'loadCurrentPoll':
      return {
        ...state,
        isLoading: true,
      };

    case 'loadCurrentPollSuccess':
      return {
        ...state,
        current: action.poll,
        isLoading: false,
      };

    case 'loadCurrentPollFailure':
      return {
        ...state,
        isLoading: false,
      };

    case 'loadPolls':
      return {
        ...state,
        isLoading: true,
      };

    case 'loadPollsSuccess':
      return {
        ...state,
        items: action.polls,
        isLoading: false,
      };

    case 'loadPollsFailure':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default pollReducer;
