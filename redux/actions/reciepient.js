import axios from "axios";
import * as actionTypes from "./actionTypes";


export const reciepientStart = () => {
    return {
      type: actionTypes.RECIEPIENT_START
    };
  };
  
  export const reciepientSuccess = info => {
    return {
      type: actionTypes.RECIEPIENT_SUCCESS,
      info
    };
  };
   
  export const reciepientFail = error => {
 
    return {
      type: actionTypes.RECIEPEINT_FAIL,
      error: error
    };
  };
  
 export const getRecipientDetails =(details)=>{
    return dispacth => {
        dispacth(reciepientStart())
        dispacth(reciepientSuccess(details))

    }
}
