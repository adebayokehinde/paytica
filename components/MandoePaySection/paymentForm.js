import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { host } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import { SemipolarLoading } from "react-loadingg";
import { ToastContainer, toast } from "react-toastify";

import {
  validateMinimumAmount,
  validateAccountNumberLength,
  verifyBankDetails,
  validateIfInteger,
  spiltBankCodeAndBankName
} from "./utilities/dataValidation";
import { SetDollarToCrypto } from "./utilities/priceCaculator";
import { useToasts } from "react-toast-notifications";


const MandoeHost = "https://mandoe-pay.herokuapp.com";

const coinList = [
  { CoinName: "Bitcoin", ShortName: "BTC" },
 //  { CoinName: "Lumen", ShortName: "XLM" },
  { CoinName: "BinanceCoin", ShortName: "BNB" },
  { CoinName: "Ethereum", ShortName: "ETH" },
];

const MandoePaymentFormComponent = (props) => {
  const router = useRouter();

  const [AmountInCrypto, setAmountInCrypto] = useState("");
  const [formInputs, setFormInputs] = useState({
    bankName: "",
    bankCode : "",
    accountNumber: "",
    amountUsd: "",
    amountNaira: "",
    coinType: "",
    accountName: "",
    clientEmail: "",
  });

  const [miniumAmount, setMinimumAmount] = useState(20);
  const [minimumCrypto, setMinimumCrypto] = useState(0.01);
  const [formErrors, setFormErrors] = useState({
    message: "",
    showFormError: false,
  });

  const [Providers, setProviders] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifiedPending, setIsVerifiedPending] = useState(true);
  const [isProceed, setIsProceed] = useState(true);

  // Error Handling
  const [isError, setIsError] = useState(true);

  const [tempNaira, setTempNaira] = useState("");
  const [showTempNaira, setShowTempNaira] = useState(false);

  const [sectionStep, setSectionStep] = useState(1);
  const [buttonSectionStep, setButtonSectionStep] = useState(0);

  const ConvertUsdToTempNaira = async (usdAmount) => {
    const usdToNaira = usdAmount * 490;
    setTempNaira(usdToNaira);
 
    setShowTempNaira(true);
  };

  const handleFormChange = async (e, field) => {
    switch (field) {
      case "changeName":
        const getBank = spiltBankCodeAndBankName(e.target.value)
        console.log("The Result",getBank['bankName'],getBank['bankCode'])
        setFormInputs({
          ...formInputs ,
          bankName : getBank['bankName'] ,
          bankCode : getBank['bankCode']
        })

        setButtonSectionStep(1);
        break;
      case "coinType":
        setFormInputs({ ...formInputs, coinType: e.target.value });
        setButtonSectionStep(2);
        break;

      case "accountNumber":
        setFormInputs({ ...formInputs, accountNumber: e.target.value });

        const validateInteger = validateIfInteger(parseFloat(e.target.value));
        if (validateInteger == true) {
          setFormErrors({ ...formErrors, showFormError: false });
        } else {
          setFormErrors({
            ...formErrors,
            message: `Your input must be a Number`,
            showFormError: true,
          });
        }

        const accountNumberLength = validateAccountNumberLength(e.target.value);
        if (accountNumberLength == true) {
          setFormInputs({ ...formInputs, accountNumber: e.target.value });
          setFormErrors({ ...formErrors, showFormError: false });
        } else {
          setFormErrors({
            ...formErrors,
            message: ``,
            showFormError: true,
          });
        }

        if (e.target.value.length == 10) {
          const bankDetails = await verifyBankDetails(
            e.target.value,
            formInputs.bankCode
          );
          console.log("Bank Details", bankDetails);
          if (bankDetails["status"] == false) {
            console.log("Invalid Bank Account");
            setFormErrors({
              ...formErrors,
              message: `Invalid Bank Account`,
              showFormError: true,
            });
          } else {
            setFormInputs({
              ...formInputs,
              accountNumber: e.target.value,
              accountName: bankDetails["accountName"],
            });
            setButtonSectionStep(3);
          }
        }
        break;
      case "amountInUsd":
        const checkInteger = validateIfInteger(parseFloat(e.target.value));
        if (checkInteger == true) {
          setFormErrors({ ...formErrors, showFormError: false });
        } else {
          setFormErrors({
            ...formErrors,
            message: `Your input must be a Number`,
            showFormError: true,
          });
        }

        setFormInputs({ ...formInputs, amountUsd: e.target.value });
        ConvertUsdToTempNaira(e.target.value);
        setShowTempNaira(true);

        convertUSDtoCrypto(formInputs.coinType, e.target.value);
        // ---- VALIDATE -----------//
        const validatePrice = validateMinimumAmount(
          parseFloat(miniumAmount),
          parseFloat(e.target.value)
        );
        if (validatePrice == false) {
          setFormErrors({
            ...formErrors,
            message: `Amount must be greater than ₦${miniumAmount}`,
            showFormError: true,
          });
          // Set Section steps here
          setButtonSectionStep(3);
        } else {
          setFormErrors({ ...formErrors, showFormError: false });
          setButtonSectionStep(4);
        }

        break;
      default:
        break;
    }
  };

  
  const { addToast } = useToasts();
  // ------------- ------------------- ///
  const notifyEvent = (type, message) => {
    switch (type) {
      case "Success":
        addToast(message, { appearance: "success" });
        break;
      case "Error":
        addToast(message, { appearance: "error" });
        break;
      case "Info":
        addToast(message, { appearance: "info" });
        break;
      default:
        break;
    }

    return true;
  };

  // Get Bank List
  const getBankList = async () => {
    const endpoint = MandoeHost + "/bank/bank-codes/";

    axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setProviders(res.data["data"]);
        console.log(res.data);
      }
    });
  };

  // Init Payment Window
  const StartPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let tempoaryAccountName = null;

    if (typeof window !== "undefined") {
      tempoaryAccountName = localStorage.getItem("theAccountName");
    }
    const paymentData = {
      clientAccountNumber: formInputs["accountNumber"],
      clientAmountInNaria: formInputs["amountNaira"],
      clientAmountInUsd: formInputs["amountUsd"],
      clientBankName: formInputs["bankName"],
      clientAccountName: tempoaryAccountName,
      clientCoinType: formInputs["coinType"],
    };
    console.log("The Payload ", paymentData);

    const endpoint = MandoeHost + "/pay/create-transaction";
    const sendData = await axios
      .post(endpoint, {
        CoinType: formInputs["coinType"],
        Amount: formInputs["amountUsd"],
        AmountInCrypto: AmountInCrypto,
        BankName: formInputs["bankName"],
        BankCode : formInputs['bankCode'],
        AccountName: tempoaryAccountName,
        AccountNumber: formInputs["accountNumber"],
        AmountInNaira : tempNaira
      })
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          const theData = res.data["data"];

          if (typeof window !== "undefined") {
            localStorage.setItem("payticaTransactionData", theData["orderID"]);
          }
          router.push("/MandoePaySection/paymentDetails");
          notifyEvent("Success","Payment Link Generated")
          return true;
        }
        notifyEvent("Error","Error Loading Payment Page")
        return false;
      });

    if (sendData == false) {
      console.log("Payment Init Failed");
    }
  };

  // PROCESS CRYPTO CONVERSION
  const PayticaCryptoPrices = props.PayticaCryptoPrices;
  const coinPricesinNaira = {
    BitcoinInNaira: PayticaCryptoPrices.BitcoinPriceinNaira,
    EthereumInNaira: PayticaCryptoPrices.EthereumPriceinNaira,
    LumenInNaira: PayticaCryptoPrices.LumenPriceinNaira,
    RippleInNaira: PayticaCryptoPrices.RipplePriceinNaria,
    BinanceCoinNaira: PayticaCryptoPrices.BinanceCoinNaira,

    BitcoinInDollar: PayticaCryptoPrices.BitcoinPriceinDollar,
    EthereumInDollar: PayticaCryptoPrices.EthereumPriceinDollar,
    LumenInDollar: PayticaCryptoPrices.LumenPriceinDollar,
    RipplePriceInDollar: PayticaCryptoPrices.RipplePriceinDollar,
    BinanceCoinInDollar: PayticaCryptoPrices.BinanceCoinPriceinDollar,
  };

  const [cryptoConvertedAmount, setcryptoConvertedAmount] = useState(0);
  const [cryptoConversionMessage, setCryptoConversionMessage] = useState({
    showConversionMessage: false,
  });

  const convertUSDtoCrypto = async (theCoin, theAmount) => {
    console.log("PARAMS 1", theCoin, theAmount);

    const amount = await SetDollarToCrypto(
      theCoin,
      theAmount,
      coinPricesinNaira
    );

    setcryptoConvertedAmount(amount);
    setCryptoConversionMessage({
      ...cryptoConversionMessage,
      showConversionMessage: true,
    });

    setAmountInCrypto(parseFloat(amount));
    return true;
  };

  useEffect(async () => {
    await getBankList();
  }, []);

  return (
    <>
      <div>
        {isLoading ? <>{<SemipolarLoading color={"#5a1d65"} />}</> : <></>}
      </div>
      {isError ? (
        <>
          <ToastContainer />
        </>
      ) : (
        <> </>
      )}
      <div 
      style ={{
        marginTop : 20
      }}
      className="paymentForm-content mtop">
        <div className="">
          <div className="steps-changer-section">
            <div className="steps-changer-previousButton-icon-a">
              {sectionStep > 1 ? (
                <>
                  <i
                    onClick={() => setSectionStep(sectionStep - 1)}
                    className="steps-changer-previousButton-icon-a fa fa-arrow-circle-left"
                  ></i>
                </>
              ) : null}
            </div>
            <div className="steps-changer-indicators">
              <i
                className={
                  sectionStep == 1
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                className={
                  sectionStep == 2
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                className={
                  sectionStep == 3
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                className={
                  sectionStep == 4
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                className={
                  sectionStep == 5
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
            </div>
            <div className="steps-changer-previousButton-icon-b">
              {sectionStep > 1 ? (
                <>
                  {/* <i
                    onClick={() => setSectionStep(sectionStep + 1)}
                    className="steps-changer-previousButton-icon-b fa fa-arrow-circle-right"
                  ></i> */}
                </>
              ) : null}
            </div>
          </div>
          <form>
            {sectionStep == 1 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Recipient Bank</p>

                  <p className="payBox-text">What is the recipient bank?</p>
                  <select
                    onChange={(e) => {
                      handleFormChange(e, "changeName");
                    }}
                    value={[formInputs.bankName ,formInputs.bankCode]}
                    className="authForm"
                  >
                    <option name="Select Default" value="Select Bank">
                      Select Bank
                    </option>
                    {Providers.map((i) => (
                      <option name="Service" value={[i.name ,i.code]}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>

                {buttonSectionStep >= 1 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="form-button-disabled" disabled>
                      Continue
                    </button>
                  </>
                )}
              </>
            ) : null}

            {sectionStep == 2 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Cypto Asset</p>

                  <p className="payBox-text">
                    What Asset would you like to pay with ?
                  </p>
                  <select
                    onChange={(e) => {
                      handleFormChange(e, "coinType");
                    }}
                    value={formInputs.coinType}
                    className="authForm"
                  >
                    <option name="Select Default" value="">
                      Select Asset
                    </option>
                    {coinList.map((i) => (
                      <option name="Service" value={i.CoinName}>
                        {i.ShortName}
                      </option>
                    ))}
                  </select>
                </div>

                {buttonSectionStep >= 2 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="form-button-disabled" disabled>
                      Continue
                    </button>
                  </>
                )}
              </>
            ) : null}

            {sectionStep == 3 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Recipient Account</p>

                  <p className="payBox-text">
                    What is the recipient account number ?
                  </p>
                  <input
                    onChange={(e) => {
                      handleFormChange(e, "accountNumber");
                    }}
                    className="authForm"
                    type="text"
                    name="accountNumber"
                    value={formInputs.accountNumber}
                    placeholder="Account Number"
                  />

                  <div className="">
                    {formErrors.showFormError ? (
                      <>
                        <p className="payBox-error-message">
                          {formErrors.message}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <p
                    style={{
                      margin: 1,
                      color: "green",
                      fontSize: 15,
                    }}
                  >
                    {formInputs.accountName}
                  </p>
                </div>

                {buttonSectionStep >= 3 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="form-button-disabled" disabled>
                      Continue
                    </button>
                  </>
                )}
              </>
            ) : null}

            {sectionStep == 4 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Amount</p>

                  <p className="payBox-text">
                    What is the amount you'd like to exchange/send ?
                  </p>
                  <input
                    onChange={(e) => {
                      handleFormChange(e, "amountInUsd");
                    }}
                    className="authForm"
                    type="text"
                    name="amountInUsd"
                    value={formInputs.amountUsd}
                    placeholder="Amount in USD"
                  />
                  {/* <p>1 USD : 478NGN</p> */}
                </div>

                <div className="form-input-box">
                  {showTempNaira ? (
                    <>
                      <input
                       
                        className="authForm"
                        type="text"
                        name="amountNaira"
                        value={`₦${tempNaira}`}
                        disabled
                        placeholder="Recipeint Recieves"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                {buttonSectionStep >= 4 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="form-button-disabled" disabled>
                      Continue
                    </button>
                  </>
                )}
              </>
            ) : null}

            {sectionStep == 5 ? (
              <>
                <div className="col-sm-12 col-lg-12 col-md-12">
                  <div className="summarySection-box ">
                    <hr />
                    <div className="">
                      <p className="summarySection-text-large">
                        Transaction Amount
                      </p>

                      <p className="summarySection-text-small">
                        ${formInputs.amountUsd} 
                      </p>
                    </div>


                    <hr />
                    <div className="">
                      <p className="summarySection-text-large">
                        Recipeint Recieves
                      </p>

                      <p className="summarySection-text-small">
                      ₦{tempNaira} 
                      </p>
                    </div>

                    <hr />
                    <div className="">
                      <p className="summarySection-text-large">Crypto Amount</p>

                      <p className="summarySection-text-small">
                        {AmountInCrypto} {formInputs.CoinType}
                      </p>
                    </div>

                    <hr />
                    <div className="">
                      <p className="summarySection-text-large">
                        Recipient Bank Account
                      </p>
                      <p className="summarySection-text-small">
                        {formInputs.accountName}
                      </p>
                    </div>

                    <hr />
                    <div className="">
                      <p className="summarySection-text-large">
                        Recipient Bank 
                      </p>
                      <p className="summarySection-text-small">
                        {formInputs.bankName}
                      </p>
                    </div>

                    {formInputs.clientEmail.length > 0 ? (
                      <>
                        <hr />
                        <div className="">Client Email</div>
                        <p className="successPage-text-small">
                          {formInputs.ClientEmail}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      StartPayment(e);
                    }}
                    className="form-button-proceed"
                  >
                    Proceed
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    PayticaCryptoPrices: state.PayticaCryptoPrices,
  };
};

export default connect(mapStateToProps, null)(MandoePaymentFormComponent);
