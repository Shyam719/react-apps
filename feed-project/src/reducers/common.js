import {
  APP_LOAD,
  LOGIN,
  REGISTER,
  REDIRECT,
  LOGOUT,
  MY_POSTS,
  ASYNC_START,
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  APPLY_TAG_FILTER,
  ASYNC_END,
} from "../constants/actionTypes";

const defaultState = {
  appName: "Feed Project",
  token: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload.data.user ? action.payload.data.user : null,
      };

    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.data.user.token,
        currentUser: action.error ? null : action.payload.data.user,
      };
    case LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case MY_POSTS:
      return { ...state, redirectTo: "/posts" };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case ASYNC_START:
      if (
        action.subtype === LOGIN ||
        action.subtype === REGISTER ||
        action.subtype === CHANGE_TAB ||
        action.subtype === HOME_PAGE_LOADED ||
        action.subtype === APPLY_TAG_FILTER ||
        action.subtype === APP_LOAD
      ) {
        return { ...state, loading: true };
      }
      break;
    case ASYNC_END:
      return { ...state, loading: false };
    default:
      return state;
  }
};
