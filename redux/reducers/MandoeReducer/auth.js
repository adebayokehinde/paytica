import * as actionTypes from "../actions/action-types";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  userId: null,
  error: null,
  loading: false,
  email:null ,
  isAdmin : null,
  isConsumer : null,
  isRider: null ,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    userId: action.user.userId,
    email:action.user.email,
    error: null,
    loading: false ,
    isAdmin : action.user.isAdmin ,
    isConsumer : action.user.isConsumer,
    isRider: action.user.isRider ,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;