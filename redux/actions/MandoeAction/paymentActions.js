import axios from "axios";
import * as actionTypes from "./action-types";

export const paymentSuccess = () => {
  return {
    type: actionTypes.PAYMENT_SUCCESS,
  };
};

export const paymentDetailsAdded = (data) => {
  return {
    type: actionTypes.PAYMENT_DETAILS_ADDED,
    data,
  };
};

// Fixes
export const updateClientPaymentDetails = (paymentData) => {
  return (dispatch) => {
    const paymentDetails = {
      theAccountNumber: paymentData["clientAcountNumber"],
      theAmountInNaria: paymentData["clientAmountInNaria"],
      theAmountInUsd: paymentData["clientAmountInUsd"],
      theBankName: paymentData["clientBankName"],
      theAccountName: paymentData["clientAccountName"],
      theCoinType: paymentData["clientCoinType"],
    };

    dispatch(paymentDetailsAdded(paymentDetails));
  };
};

export const getPaymentDataFromStorage = () => {
  let paymentData = null;
  if (typeof window !== "undefined") {
    paymentData = JSON.parse(localStorage.getItem("paymentData"));
    console.log("The Payment Data", paymentData);

  }
  const paymentDetails = {
    theAccountNumber: 1,
    theAmountInNaria: 22 ,
    theAmountInUsd: paymentData["clientAmountInUsd"],
    theBankName: paymentData["clientBankName"],
    theAccountName: "2003710531",
    theCoinType: paymentData["clientCoinType"],
  };


  return (dispatch) => {
    dispatch(paymentDetailsAdded(paymentDetails));
  };
};
 