const pollReducer = (state, action) => {
  switch (action.type) {
    case 'createPoll':
    case 'loadCurrentPoll':
      return {
        ...state,
        isLoading: true,
      };

    case 'socketPollCreated':
    case 'createPollSuccess':
    case 'loadCurrentPollSuccess':
      return {
        ...state,
        current: action.poll,
        isLoading: false,
      };

    case 'hidePoll':
      return {
        ...state,
        current: null,
      };

    case 'socketPollUpdated':
      return {
        ...state,
        current: {
          ...action.poll,
          voted: state.current.voted,
        },
      };

    case 'createPollFailure':
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

    case 'vote':
      return {
        ...state,
        votingFor: action.index,
      };

    case 'voteSuccess':
      return {
        ...state,
        current: {
          ...action.poll,
          voted: true,
        },
        votingFor: undefined,
      };

    case 'voteFailure':
      return {
        ...state,
        votingFor: undefined,
      };

    case 'closeLastPollSuccess':
      return {
        ...state,
        current: undefined,
      };

    default:
      return state;
  }
};

export default pollReducer;
