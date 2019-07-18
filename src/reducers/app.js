const appReducer = (state, action) => {
  let changes;

  switch (action.type) {
    case 'setProperty':
      changes = { ...state.properties };
      changes[action.key] = action.value;

      return {
        ...state,
        properties: changes,
      };

    case 'loadProperties':
      return {
        ...state,
        ...{ properties: action.properties },
      };

    case 'setAction':
      changes = { ...state.actions };
      changes[action.key] = action.callback;

      return {
        ...state,
        actions: changes,
      };

    default:
      return state;
  }
};

export default appReducer;
