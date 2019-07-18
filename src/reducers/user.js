const userReducer = (state, action) => {
  switch (action.type) {
    case 'updateUser':
      return {
        ...state,
        ...{ current: action.user },
      };

    default:
      return state;
  }
};

export default userReducer;
