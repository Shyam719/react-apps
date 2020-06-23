import * as ACTIONTYPES from "../actions/actionTypes";
import agent from "../../utils/agent";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case ACTIONTYPES.LOGIN:
    case ACTIONTYPES.REGISTER:
      const isErrorResponse = action.error;
      if (!isErrorResponse) {
        localStorage.setItem("jwt", action.payload.data.user.token);
        agent.setToken(action.payload.data.user.token);
      }
      return {
        ...state,
        isAuthenticated: isErrorResponse ? false : true,
        //errors: isErrorResponse ? action.payload.errors.errors : null,
        token: isErrorResponse ? null : action.payload.data.user.token,
        currentUser: isErrorResponse ? null : action.payload.data.user,
        redirectTo: isErrorResponse ? null : "/",
      };
    case ACTIONTYPES.LOGIN_PAGE_UNLOADED:
    case ACTIONTYPES.REGISTER_PAGE_UNLOADED:
      return { ...state, errors: null };
    default:
      return state;
  }
};

export default AuthReducer;
