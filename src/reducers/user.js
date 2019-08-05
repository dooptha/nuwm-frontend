const userReducer = (state, action) => {
  switch (action.type) {
    case 'logIn':
    case 'updateCurrentUser':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'updateUser':
    case 'logInSuccess':
      return {
        ...state,
        ...{ current: action.user },
        isLoading: false,
      };

    case 'logInFailure':
    case 'updateCurrentUserFailure':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case 'updateCurrentUserSuccess':
      return {
        ...state,
        isLoading: false,
        current: { ...state.current, ...action.user },
      };

    default:
      return state;
  }
};

export default userReducer;
