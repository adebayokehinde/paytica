import React, { useState,useDispatch } from "react";
import axios from "axios";
import * as actionTypes from "./actionTypes";

import {host} from "../../constants";


// Dispatched Acitons
export const getBalStart = () => {
  return {
    type: actionTypes.GET_BALANCE_START,
  };
}

export const getBalSuccessForLumen = (data) => {
  return {
    type: actionTypes.LUMEN_BALANCE,
    data,
  };
};

export const getBalSuccessForEthereum = (data) => {
  return {
    type: actionTypes.ETHEREUM_BALANCE,
    data,
  };
};

export const checkWalletAccessStatus = (data) => {
  return {
    type: actionTypes.WALLET_ENABLED,
    data,
  };
};

// --------Ends Here--------------------------//

export const WalletAccessCheck = ()=> {
  const endpoint = host + `/wallets/getUserWallet/`;

  // axios.defaults.headers = {
  //   "Content-Type": "application/json",
  //   sessionuserid: `${userID}`,
  // };
  // axios
  //   .get(endpoint)
  //   .then((res) => {
  //     if (res.status == 200) {
  //       console.log("the WALLET", res.data["wallet"]);
  //       if (res.data["wallet"].isConnected === false) {
  //         // setIsWallet(false);
  //         // Redirects user to setup their wallet
  //         dispatch(checkWalletAccessStatus(false))

  //         props.history.push("/setUpAccount");
  //       } else {
  //         // setIsWallet(true);
  //         dispatch(checkWalletAccessStatus(true))
  //       }
  //     }
  //     if (res.status == 400) {
  //       console.log("No Wallet Yet");
  //       if (res.data["action"] == false) {
  //         props.history.push("/setUpAccount");
  //       }
  //     }
  //   })

  return (dispatch)=>{
    console.log('Dispathcing Wallet')

    dispatch(checkWalletAccessStatus(true))
  }
}

export const getLumenBalance = (userID) => {
  return (dispatch) => {
    const endpoint = host + `/wallets/check-stellar-balance`;
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   // Authorization: `Token ${token}`,
    //   sessionuserid: `${userID}`,
    // };
    // console.log(endpoint);
    // axios.get(endpoint).then((res) => {
    //   if (res.status == 200) {
    //     //   setlumenBalance(Math.round(res.data["Lumen"].balance));
    //     //   setNaira(Math.round(res.data.Naira.balance));
    //     //   setUSD(Math.round(res.data.USD.balance));
    //     dispatch(getBalSuccess(res.data["Balance"]));
    //   }
    // });

    console.log('Dispathcing Lumen')
    dispatch(getBalSuccessForLumen('2005'))
  };
};

export const getEthBalance = (userID) => {
  return (dispatch) => {
    // const endpoint = host + `/web3/get-ethbalance/`;
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   // Authorization: `Token ${token}`,
    //   sessionuserid: `${userID}`,
    // };
    // axios.get(endpoint).then((res) => {
    //   if (res.status == 200) {
    //     // setEthBalance(res.data["Balance"]);
    //     dispatch(getBalSuccess(res.data["Balance"]));
    //   } else {
    //   }
    // });
    
    dispatch(getBalSuccessForEthereum('3344'))

  };
};

// export const getRippleBalance = (userID) => {
//   return (dispatch) => {
//     const endpoint = host + `/get-rippleBalance/`;
//     axios.defaults.headers = {
//       "Content-Type": "application/json",
//       // Authorization: `Token ${token}`,
//       sessionuserid: `${userID}`,
//     };
//     axios.get(endpoint).then((res) => {
//       if (res.status == 200) {
//         // setXRPbalance(res.data["Balance"]);
//         // setXRPbalance(1);
//         dispatch(getBalSuccess(res.data["Balance"]));
//       } else {
//       }
//     });
//   };
// };
