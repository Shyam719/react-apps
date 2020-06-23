import * as ACTIONTYPES from "./actionTypes";

export const success = () => {
  return {
    type: ACTIONTYPES.SUCCESS,
  };
};

export const failure = () => {
  return {
    type: ACTIONTYPES.FAILURE,
  };
};

export const loginSuccess = () => {
  return {
    type: ACTIONTYPES.LOGIN_SUCCESS,
  };
};

export const loginFailure = () => {
  return {
    type: ACTIONTYPES.LOGIN_FAILURE,
  };
};
