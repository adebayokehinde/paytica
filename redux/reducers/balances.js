import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  eth_balance: "",
};

const fetchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    //  is_buyer: action.user.is_buyer,
    //is_seller: action.user.is_seller,
    userID: action.user.userID,
    error: null,
    loading: false,
  });
};

const fecthFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BALANCE_START:
      return fetchStart(state, action);
    case actionTypes.GET_BALANCE_SUCCESS:
      return fetchSuccess(state, action);
    case actionTypes.GET_BALANCE_FAIL:
      return fecthFail(state, action);
    default:
      return state;
  }
};

export default balanceReducer;
