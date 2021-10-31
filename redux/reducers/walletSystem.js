import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  userID: null,
  error: null,
  loading: false,
  isWalletEnabled: false,
  xlmBalance: null,
  ethBalance: null,
  xrpBalance: null,
};


const updateWalletEnable = (state,action)=>{
  return updateObject(state, {
    isWalletEnabled: action.data,
    loading: false,
  });
}

const getLumenBalance = (state, action) => {
  return updateObject(state, {
    xlmBalance: action.data,
    loading: false,
  });
};

const getEthBalance = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    ethBalance :action.data
  });
};

const getRippleBalance = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    xrpBalance : action.data
  });
};

const walletBalance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WALLET_ENABLED:
      console.log('The Wallet Stats',action)
      return updateWalletEnable(state,action)
    case actionTypes.LUMEN_BALANCE:
      console.log('The Data from Lumen',action)
      return getLumenBalance(state, action);
    case actionTypes.ETHEREUM_BALANCE:
      return getEthBalance(state, action);
    case actionTypes.RIPPLE_BALANCE:
      return getRippleBalance(state, action);
    default:
      return state;
  } 
};

export default walletBalance;
