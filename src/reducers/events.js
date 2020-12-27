const eventsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'loadEvents':
      return {
        ...state,
        isLoading: true,
      };

    case 'loadEventsSuccess':
      return {
        ...state,
        items: action.events,
        isLoading: false,
      };

    case 'loadEventsFailure':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default eventsReducer;
