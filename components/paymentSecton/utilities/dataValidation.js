import axios from "axios";
import { host } from "../../utils/constants";

export const validateNairaPrice = (minimumAmount, currentAmount) => {
  parseInt(currentAmount);
  parseInt(minimumAmount);

  if (minimumAmount > currentAmount) {
    console.log("The Price is less");
    return false;
  }
  console.log("The Price is greater");
  return true;
};

export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length > 10 && phoneNumber.length <= 11) {
    return true;
  }
  return false;
};

export const validateIfInteger = (amount) => {
  const checker = !isNaN(parseFloat(amount)) && isFinite(amount);
  return checker;
};

export const valdateMeterNumber = async (meterNumber, providerName) => {
  const endpoint = host + "/baxiRoutes/verify-meter-number";
  const verify = await axios
    .post(endpoint, {
      providerName: providerName,
      meterNumber: meterNumber,
    })
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }else {
        return res.data.data
      }
    });
  return verify;
};

export const spiltCodeAndAmount = (value) => {
  const splitter = value.split(",");
  const context = {
    code: String(splitter[0]),
    amount: parseFloat(splitter[1]),
  };
  return context;
};

export const splitMonthsPaidAndAmount = (value) => {
  const splitter = value.split(",");
  const context = {
    monthsPaid: String(splitter[0]),
    amount: parseFloat(splitter[1]),
  };
  console.log("This is the Context for  val", context);
  return context;
};


export const splitCoinNameAndCodeName =(value)=>{
  const splitter = value.split(",")
  const context = {
    coinName : String(splitter[0]),
    coinCode : String(splitter[0])
  }
  console.log("This is the Coin Data", context)
  return context
}