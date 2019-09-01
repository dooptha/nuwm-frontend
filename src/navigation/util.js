const findCurrentRoute = (state) => {
  if (state.routes && state.routes.length !== 0) {
    return findCurrentRoute(state.routes[state.index]);
  }

  return state;
};

export const getCurrentRouteIndex = (navigation) => navigation.state.index;

export const isRootRoute = (index) => index !== 0;

export const getCurrentStateName = (state) => findCurrentRoute(state).routeName;

export const getCurrentRouteState = (navigation) => findCurrentRoute(navigation.state);
