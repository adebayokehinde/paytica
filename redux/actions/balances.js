import axios from "axios";
import * as actionTypes from "./actionTypes";

const host = "https://www.nomad-pay.tech"

export const fetchStart = () => {
    return { 
      type: actionTypes.AUTH_START
    };
  };
   
  export const fetchSuccess = user => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      user
    };
  }; 
   
  export const fecthFail = error => {
    message.error('Invalid Username or password',10)
    return {
      type: actionTypes.AUTH_FAIL,
      error: error
    };
    
  };

  export const getEthBalance = async (userid) => {
    const endpoint = host + `/web3/get-ethbalance/`;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${token}`,
      sessionuserid: `${userid}`,
    };
    axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setEthBalance(res.data["Balance"]);
      } else {
      }
    });
  };