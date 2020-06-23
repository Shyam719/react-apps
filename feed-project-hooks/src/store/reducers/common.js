import * as ACTIONTYPES from "../actions/actionTypes";

export const CommonReducer = (state, action) => {
  switch (action.type) {
    case ACTIONTYPES.APP_LOAD:
      return {
        ...state,
        token: action.token || false,
        appLoaded: action.error ? false : true,
        currentUser:
          action.payload.data && action.payload.data.user
            ? action.payload.data.user
            : null,
        redirectTo: null,
        isAuthenticated: action.token ? true : false,
      };
    case ACTIONTYPES.LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        //redirectTo: "/",
        token: null,
        currentUser: null,
        isAuthenticated: false,
      };
    case ACTIONTYPES.MY_POSTS:
      return { ...state, redirectTo: "/posts" };
    case ACTIONTYPES.PAGE_UNLOAD:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
};
