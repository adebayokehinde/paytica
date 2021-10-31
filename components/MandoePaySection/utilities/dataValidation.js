import axios from "axios";

const MandoeHost = "https://mandoe-pay.herokuapp.com";


export const validateMinimumAmount = (minimumAmount, currentAmount) => {
  parseInt(currentAmount);
  parseInt(minimumAmount);

  if (minimumAmount > currentAmount) {
    console.log("The Price is less");
    return false;
  }
  console.log("The Price is greater");
  return true;
};

export const validateAccountNumberLength = (phoneNumber) => {
  if (phoneNumber.length > 9 && phoneNumber.length <= 10) {
    return true;
  }
  return false;
};

export const validateIfInteger = (amount) => {
  const checker = !isNaN(parseFloat(amount)) && isFinite(amount);
  return checker;
};

export const spiltBankCodeAndBankName = (value) => {
  const splitter = value.split(",");
  const context = {
    bankName: String(splitter[0]),
    bankCode: String(splitter[1])
  };
  return context;
};


export const verifyBankDetails = async (theTempAccountNumber, theBankCode) => {
  const endpoint = MandoeHost + "/bank/verify-bank-details/";
  if (theBankCode.length == 0 || theTempAccountNumber.length == 0) {
    const context = {
      message: "Please fill bank details",
      status: false,
    };
    return context;
  }

  const theData =  await axios
    .post(endpoint, {
      bankAccount: theTempAccountNumber,
      bankCode: theBankCode,
    })
    .then((res) => {
      if (res.status == 200) {
        console.log("The Bank name", res.data);
        const theData = res.data["data"];

        let context = {
          message: "Bank Details gotten succssfully",
          status: true,
          accountName: theData["account_name"],
        };

        return context;
      }

      const context = {
        message: "Invalid Bank Account",
        status: false,
        accountName: "",
      };

      return context;
    });
    return theData
};
