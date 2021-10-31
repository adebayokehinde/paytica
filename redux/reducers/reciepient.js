import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    data: null,
    error: null,
    loading: false
};

const recipientStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const reciepientSuccess = (state, action) => {
    return updateObject(state, {
    data: action.info,
    error: null,
    loading: false
    });
  };
  
  const reciepientFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };

  const reciepientReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.RECIEPIENT_START:
        return recipientStart(state, action);
      case actionTypes.RECIEPIENT_SUCCESS:
        return reciepientSuccess(state, action);
      case actionTypes.RECIEPEINT_FAIL:
        return reciepientFail(state, action);
      default:
        return state;
    }
  };
  
  export default reciepientReducer;
  
  