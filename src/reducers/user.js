const userReducer = (state, action) => {
  switch (action.type) {
    case 'signUp':
      return {
        ...state,
        isLoading: true,
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
