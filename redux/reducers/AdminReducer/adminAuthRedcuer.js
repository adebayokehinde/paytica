import * as actionTypes from "../../actions/AdminAction/actionTypes"
import { updateObject } from "../../utility";

const initialState = {
  token: null,
  username: null,
  userID: null,
  email : null ,
  error: null,
  loading: false,
  isAdmin : null
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};
 
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    isAdmin :action.user.isAdmin ,
    email : action.user.email,
    error: null,
    loading: false
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

const adminAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_AUTH_START:
      return authStart(state, action);
    case actionTypes.ADMIN_AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.ADMIN_AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.ADMIN_AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default adminAuthReducer;
