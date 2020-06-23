export const initialState = {
  isAuthenticated: false,
  currentUser: null,
  redirectTo: null,
};

export const combineReducers = (...reducers) => {
  return (state = initialState, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };
};
