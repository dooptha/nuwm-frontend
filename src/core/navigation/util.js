export const getCurrentStateName = (state) => {
  return findCurrentRoute(state).routeName;
};

export const getCurrentRouteState = (navigation) => {
  return findCurrentRoute(navigation.state);
};

export const getCurrentRouteIndex = (navigation) => {
  return navigation.state.index;
};

const findCurrentRoute = (state) => {
  if (state.routes && state.routes.length !== 0) {
    return findCurrentRoute(state.routes[state.index]);
  }

  return state;
};

export const isRootRoute = (index) => {
  return index !== 0;
};
