import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SemipolarLoading } from "react-loadingg";
import router, { useRouter } from "next/router";
import { host } from "../../utils/constants";
import {
  validateNairaPrice,
  validatePhoneNumber,
  validateIfInteger,
  splitCoinNameAndCodeName,
} from "../utilities/dataValidation";

import { SetNairaToCrypto } from "../utilities/priceCaculator";
import { useToasts } from "react-toast-notifications";

import { coinList } from "../utilities/getPayticaCoins";

function AirtimePaymentForm(props) {
  const history = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [Providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [coinToken, setCoinToken] = useState("");

  const [theTransactionID, setTransactionID] = useState("");
  const [paymentinitState, setPaymentInitState] = useState(false);

  // HANDLE FORM DATA AND DATA VALIDATION
  const [AmountInCrypto, setAmountInCrypto] = useState("");
  const [formInputs, setFormInputs] = useState({
    Amount: "",
    Service: "",
    RecipientPhone: "",
    CoinType: "",
    ClientEmail: "",
  });

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

  const [miniumAmount, setMinimumAmount] = useState(500);
  const [minimumCrypto, setMinimumCrypto] = useState(0.01);
  const [formErrors, setFormErrors] = useState({
    message: "",
    showFormError: false,
  });

  const [sectionStep, setSectionStep] = useState(1);
  const [buttonSectionStep, setButtonSectionStep] = useState(0);

  const handleFormChange = async (e, field) => {
    switch (field) {
      case "Service":
        console.log(e.target.value);
        setFormInputs({ ...formInputs, Service: e.target.value });
        setButtonSectionStep(1);
        break;
      case "CoinType":
        console.log(e.target.value);
        // setFormInputs({ ...formInputs, CoinType: e.target.value });
        handleCryptoType(e.target.value);
        setButtonSectionStep(2);
        break;

      case "Amount":
        // This function processes and Validates the cost
        const validateInteger = validateIfInteger(parseFloat(e.target.value));
        if (validateInteger == false) {
          setFormErrors({
            ...formErrors,
            message: `Your input must be a Number`,
            showFormError: true,
          });
          setButtonSectionStep(2);
        } else {
          setFormErrors({ ...formErrors, showFormError: false });
          setButtonSectionStep(3);
        }

        // if (formInputs.Amount.length <= 0) {
        //   setButtonSectionStep(2);
        // }
        // ---- VALIDATE -----------//
        const validatePrice = validateNairaPrice(
          parseInt(miniumAmount),
          parseInt(e.target.value)
        );
        if (validatePrice == false) {
          setFormErrors({
            ...formErrors,
            message: `Amount must be greater than ₦${miniumAmount}`,
            showFormError: true,
          });
          // Set Section steps here
          setButtonSectionStep(2);
        } else {
          setFormErrors({ ...formErrors, showFormError: false });
          setButtonSectionStep(3);
        }
        // ------ VALIDATE ENDS-----///

        // ---Convert Crypto to Naira
        convertNairaToCrypto(formInputs.CoinType, e.target.value);

        // ---- STATE MANAGEMENT ---- ///
        setFormInputs({ ...formInputs, Amount: e.target.value });
        break;

      case "RecipientPhone":
        // ------ VALIDATE PHONE ---///
        const validatePhone = validatePhoneNumber(e.target.value);
        console.log("The Phone stat", validatePhone);
        if (validatePhone == true) {
          setFormInputs({ ...formInputs, RecipientPhone: e.target.value });
          setButtonSectionStep(4);
          setFormErrors({ ...formErrors, showFormError: false });
        } else {
          setFormInputs({ ...formInputs, RecipientPhone: e.target.value });
          setFormErrors({
            ...formErrors,
            message: ``,
            showFormError: true,
          });
          setButtonSectionStep(3);
        }
        break;

      case "RecipientEmail":
        console.log(e.target.value);
        setFormInputs({ ...formInputs, ClientEmail: e.target.value });
        break;
      default:
        break;
    }
    console.log("Final Form", formInputs);
  };

  // HANDLE CRYPTO TYPE (Error Messages , Minimum Amount to Pay)
  const [coinMessage, setCoinMessage] = useState("");

  const handleCryptoType = (coinType) => {
    let theMessage = "";
    switch (coinType) {
      case "Bitcoin":
        setMinimumCrypto(0.0002);
        theMessage = ``;
        setCoinMessage(theMessage);
        break;
      case "Lumen":
        setMinimumCrypto(0.02);
        theMessage = ``;
        setCoinMessage(theMessage);
        break;
      case "BinanceCoin":
        setMinimumCrypto(0.0002);
        theMessage = ``;
        setCoinMessage(theMessage);
        break;
      case "Ethereum":
        setMinimumCrypto(0.0002);
        theMessage = ``;
        setCoinMessage(theMessage);
        break;
      case "TetherUSDT":
        break;
      default:
        break;
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
    TetherUSDTinNaira: PayticaCryptoPrices.TetherCoinPriceinNaira,
    BinanceUSDinNaira: PayticaCryptoPrices.BinanceUSDPriceinNaira,

    BitcoinInDollar: PayticaCryptoPrices.BitcoinPriceinDollar,
    EthereumInDollar: PayticaCryptoPrices.EthereumPriceinDollar,
    LumenInDollar: PayticaCryptoPrices.LumenPriceinDollar,
    RipplePriceInDollar: PayticaCryptoPrices.RipplePriceinDollar,
    BinanceCoinInDollar: PayticaCryptoPrices.BinanceCoinPriceinDollar,
    TetherUSDTinDollar: PayticaCryptoPrices.TetherCoinPriceinDollar,
    BinanceUSDinDollar: PayticaCryptoPrices.BinanceUSDPriceinDollar,
  };

  const [cryptoConvertedAmount, setcryptoConvertedAmount] = useState(0);
  const [cryptoConversionMessage, setCryptoConversionMessage] = useState({
    showConversionMessage: false,
  });

  const convertNairaToCrypto = async (theCoin, theAmount) => {
    console.log("This 4weduier", theCoin, theAmount);
    const amount = await SetNairaToCrypto(
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

    console.log("This is the Crypto Amount", cryptoConvertedAmount);

    return true;
  };

  // ININTIALIZES PAYMENT
  const StartPayment = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);
    const endpoint = host + "/AnonymousPayRoute/create-anonymous-transaction";
    axios
      .post(endpoint, {
        Service: formInputs.Service,
        Amount: formInputs.Amount,
        AmountInCrypto: AmountInCrypto,
        PhoneNumber: formInputs.RecipientPhone,
        CoinType: formInputs.CoinType,
        ServiceType: "Airtime",
        ProviderName: formInputs.Service,
        ClientEmail: formInputs.ClientEmail,
      })
      .then((res) => {
        if (res.status == 200) {
          const theData = res.data["data"];
          setIsLoading(false);
          setTransactionID(theData["orderID"]);
          setPaymentInitState(true);
          console.log("This is the is transaction ID", theData["orderID"]);
          if (typeof window !== "undefined") {
            localStorage.setItem("transactionData", theData["orderID"]);
          }
          notifyEvent("Success", "Payment Link Generated");
          router.push("/paymentSection/paymentDetails");
        } else {
          setIsLoading(false);
          setIsSubmitted(false);
          notifyEvent("Error", "Payment Link Generated");
        }
      });
  };

  // GETS PROVIDER DATA
  const getAirtimeProvider = async () => {
    const endpoint = host + "/baxiRoutes/fetch-aritime-providers/";

    axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setProviders(res.data.providers);
      }
    });
  };

  const [coinRep, setCoinRep] = useState("");

  const updateSelectedCoin = (coinValue) => {
    if (coinValue === null || coinValue === undefined) {
      return false;
    }

    const selectedCoinObject = coinList.filter((item) => {
      return item.CoinName.includes(coinValue);
    });

    console.log(
      "This is the selected coin object",
      selectedCoinObject[0]["CoinName"]
    );

    setCoinRep(selectedCoinObject[0]["CoinName"]);

    setFormInputs({
      ...formInputs,
      CoinType: selectedCoinObject[0]["CoinName"],
    });

    setButtonSectionStep(2);

    console.log("This is the Re[", coinRep);
  };

  useEffect(() => {
    getAirtimeProvider();
  }, [props.userID]);

  return (
    <>
      <div>
        {isLoading ? (
          <>
            <SemipolarLoading color={"#5a1d65"} />
          </>
        ) : (
          <></>
        )}
      </div>

      <>
        <div className="paymentForm-content mtop">
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
                onClick={() => setSectionStep(1)}
                className={
                  sectionStep == 1
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                onClick={() => setSectionStep(2)}
                className={
                  sectionStep == 2
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                onClick={() => setSectionStep(3)}
                className={
                  sectionStep == 3
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                onClick={() => setSectionStep(4)}
                className={
                  sectionStep == 4
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                onClick={() => setSectionStep(5)}
                className={
                  sectionStep == 5
                    ? "fa fa-minus steps-changer-indicators-icons-active"
                    : "fa fa-minus steps-changer-indicators-icons"
                }
              ></i>
              <i
                onClick={() => setSectionStep(5)}
                className={
                  sectionStep == 6
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

          <div style={{ marginTop: 5 }} className="">
            <form>
              {sectionStep == 0 || sectionStep == 1 ? (
                <>
                  <p className="payBox-heading">Carrier Network</p>

                  <p className="payBox-text">
                    What Network are you paying to ?
                  </p>
                  <div className="form-input-box">
                    <select
                      onChange={(e) => {
                        handleFormChange(e, "Service");
                      }}
                      value={formInputs.Service}
                      className="authForm"
                    >
                      <option name="Select Default" value="">
                        Select Network
                      </option>
                      {Providers.map((i) => (
                        <option name="Service" value={i.service_type}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    {buttonSectionStep >= 1 ? (
                      <>
                        <button
                          onClick={() => {
                            setSectionStep(sectionStep + 1);
                          }}
                          className="form-button2"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="form-button-disabled" disabled>
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {sectionStep === 2 ? (
                <>
                  <p className="payBox-heading">Cypto Asset</p>

                  <p className="payBox-text">
                    What Asset would you like to pay with ?
                  </p>

                  <div className="form-input-box">
                    <div className="coins-flex">
                      {coinList.map((i) => (
                        <>
                          <div
                            onClick={() => {
                              updateSelectedCoin(i.CoinName);
                            }}
                            className={
                              coinRep == i.CoinName
                                ? "coins-item-row coins-item-row-active"
                                : "coins-item-row"
                            }
                          >
                            <div className="coins-item-image">
                              <img
                                src={i.CoinImage}
                                className="coins-item-image-file"
                              />
                            </div>
                            <div className="coins-item-text-section">
                              <p className="coins-item-text">{i.ShortName}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>

                  <p className="payBox-success-message">{coinMessage}</p>

                  <div>
                    {buttonSectionStep >= 2 ? (
                      <>
                        <button
                          onClick={() => {
                            setSectionStep(sectionStep + 1);
                          }}
                          className="form-button2"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="form-button-disabled" disabled>
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {sectionStep == 3 ? (
                <>
                  <p className="payBox-heading">Airtime Amount</p>

                  <p className="payBox-text">
                    What Amount would you like to pay in Naira ?
                  </p>

                  <div className="form-input-box">
                    {/* <p className="form-input-text">Username</p> */}
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "Amount");
                      }}
                      className="authForm"
                      type="text"
                      name="Amount"
                      value={formInputs.Amount}
                      placeholder="Airtime Amount"
                    />
                  </div>

                  <div className="">
                    {formErrors.showFormError ? (
                      <>
                        <p className="payBox-error-message">
                          {formErrors.message}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div className="">
                    {cryptoConversionMessage.showConversionMessage ? (
                      <>
                        <p className="payBox-success-message">
                          {/* you pay {cryptoConvertedAmount} {formInputs.CoinType} */}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div>
                    {buttonSectionStep >= 3 ? (
                      <>
                        <button
                          onClick={() => {
                            setSectionStep(sectionStep + 1);
                          }}
                          className="form-button2"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="form-button-disabled" disabled>
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {sectionStep === 4 ? (
                <>
                  <p className="payBox-heading">Recipient Phone</p>

                  <p className="payBox-text">
                    What Phone number would you like to recharge ?
                  </p>
                  <div className="form-input-box">
                    {/* <p className="form-input-text">Username</p> */}
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "RecipientPhone");
                      }}
                      className="authForm"
                      type="text"
                      name="RecipientPhone"
                      value={formInputs.RecipientPhone}
                      placeholder="Recipient Phone"
                    />
                  </div>

                  <div className="">
                    {formErrors.showFormError ? (
                      <>
                        <p className="payBox-error-message">
                          {formErrors.message}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div>
                    {buttonSectionStep >= 4 ? (
                      <>
                        <button
                          onClick={() => {
                            setSectionStep(sectionStep + 1);
                          }}
                          className="form-button2"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="form-button-disabled" disabled>
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {sectionStep === 5 ? (
                <>
                  <p className="payBox-heading">Email (Optional) </p>

                  <p className="payBox-text">
                    Let’s get you notification ready We’ll keep you notified on
                    the progress of your transaction
                  </p>
                  <div className="form-input-box">
                    {/* <p className="form-input-text">Username</p> */}
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "RecipientEmail");
                      }}
                      className="authForm"
                      type="text"
                      name="RecipientEmail"
                      value={formInputs.ClientEmail}
                      placeholder="Your Email"
                    />
                  </div>

                  <div>
                    {buttonSectionStep >= 5 ? (
                      <>
                        <button
                          onClick={() => {
                            setSectionStep(sectionStep + 1);
                          }}
                          className="form-button2"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setSectionStep(sectionStep + 1);
                          }}
                          className="form-button2"
                        >
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {sectionStep == 6 ? (
                <>
                  <div className="col-sm-12 col-lg-12 col-md-12">
                    <div className="summarySection-box ">
                      <hr />
                      <div className="">
                        <p className="summarySection-text-large">
                          Transaction Amount
                        </p>

                        <p className="summarySection-text-small">
                          ₦{formInputs.Amount}
                        </p>
                      </div>

                      <hr />
                      <div className="">
                        <p className="summarySection-text-large">
                          Crypto Amount
                        </p>

                        <p className="summarySection-text-small">
                          {AmountInCrypto} {formInputs.CoinType}
                        </p>
                      </div>

                      <hr />
                      <div className="">
                        <p className="summarySection-text-large">
                          Recipient Phone
                        </p>
                        <p className="summarySection-text-small">
                          {formInputs.RecipientPhone}
                        </p>
                      </div>

                      <hr />
                      <div className="">
                        <p className="summarySection-text-large">
                          Service/Provider Name
                        </p>
                        <p className="summarySection-text-small">
                          {formInputs.Service}
                        </p>
                      </div>

                      <hr />
                      <div className="">
                        <p className="summarySection-text-large">Coin Type</p>
                        <p className="summarySection-text-small">
                          {formInputs.CoinType}
                        </p>
                      </div>

                      {formInputs.ClientEmail.length > 0 ? (
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

                  {isSubmitted ? (
                    <>
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
                  ) : (
                    <>
                      <div>
                        <button
                          onClick={(e) => {
                            StartPayment(e);
                          }}
                          className="form-button-disabled"
                        >
                          Proceed
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : null}
            </form>
          </div>
        </div>
      </>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    PayticaCryptoPrices: state.PayticaCryptoPrices,
  };
};

export default connect(mapStateToProps, null)(AirtimePaymentForm);
