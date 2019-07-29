const userReducer = (state, action) => {
  switch (action.type) {
    case 'signUp':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'signUpSuccess':
      return {
        ...state,
        ...{ current: action.user },
        isLoading: false,
      };

    case 'signUpFailure':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };


    case 'updateUser':
      return {
        ...state,
        current: { ...state.current, ...action.user },
      };

    default:
      return state;
  }
};

export default userReducer;
