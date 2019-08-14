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
        properties: action.properties,
      };

    case 'setAction':
      changes = { ...state.actions };
      changes[action.key] = action.callback;

      return {
        ...state,
        actions: changes,
      };

    case 'updateDeviceId':
      return {
        ...state,
        deviceId: action.deviceId,
      };

    case 'updateOnlineCounter':
      return {
        ...state,
        onlineCounter: action.counter,
      };

    case 'connect':
      return {
        ...state,
        connected: true,
      };

    case 'disconnect':
      return {
        ...state,
        connected: false,
      };

    case 'loadGroups':
      return {
        ...state,
        groups: action.groups,
      };

    default:
      return state;
  }
};

export default appReducer;
