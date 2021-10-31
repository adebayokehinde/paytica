import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  mode:null
};


const initPaymentAnonymously = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    }); 
  };

const AnonymousPaySuccess = (state, action) => {
    return updateObject(state, {
        payForDetails : action
    });
  };

//   const AnoynymousPayFail = (state, action) => {
//     return updateObject(state, {
//       error: null,
//       loading: true
//     });
//   };


  
  const AnynonymousPayReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ANOYNYMOUS_PAYMENT_START:
        return initPaymentAnonymously(state, action);
      case actionTypes.ANOYNYMOUS_PAYMENT_SUCCESS:
        return AnonymousPaySuccess(state, action);
    //   case actionTypes.ANOYNYMOUS_PAYMENT_FAIL:
    //     return AnoynymousPayFail(state, action);
      default:
        return state;
    } 
  };

  export default AnynonymousPayReducer;