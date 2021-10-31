import React, { useEffect, useState ,useD} from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "./actionTypes";


// import { io } from "socket.io-client";
export const saveAnonymousPayDetails = dataFeed => {
    return {
      type: actionTypes.ANOYNYMOUS_PAYMENT_SUCCESS,
      payForDetails : dataFeed
    };
  }; 


export const  PayChannel =(dataFeed)=>{
    const dispatch =  useDispatch()
    dispatch(saveAnonymousPayDetails(dataFeed))
}