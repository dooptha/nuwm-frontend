const userReducer = (state, action) => {
  switch (action.type) {
    case 'signUp':
    case 'updateCurrentUser':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'updateUser':
    case 'signUpSuccess':
      return {
        ...state,
        ...{ current: action.user },
        isLoading: false,
      };

    case 'signUpFailure':
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
