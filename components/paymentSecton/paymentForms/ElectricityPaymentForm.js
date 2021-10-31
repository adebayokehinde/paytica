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
  valdateMeterNumber,
} from "../utilities/dataValidation";
import { coinList } from "../utilities/getPayticaCoins";
import { SetNairaToCrypto } from "../utilities/priceCaculator";

import { useToasts } from "react-toast-notifications";

function ElectricityPaymentForm(props) {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);


  const [Providers, setProviders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setIsLoaded] = useState(false);

  const [isIconLoading, setIsIconLoading] = useState(false);

  // Controls the Form Inputs
  const [AmountInCrypto, setAmountInCrypto] = useState("");
  const [formInputs, setFormInputs] = useState({
    Amount: "",
    RecipientPhone: "",
    NetworkCarriers: "",
    MeterNumber: "",
    ProviderService: "",
    CoinType: "",
    ClientEmail: "",
    MeterName: "",
    MeterAddress: "",
    isMeterVerififed: false,
  });

  const [miniumAmount, setMinimumAmount] = useState(100);
  const [minimumCrypto, setMinimumCrypto] = useState(0.01);
  const [formErrors, setFormErrors] = useState({
    message: "",
    showFormError: false,
  });

  const [sectionStep, setSectionStep] = useState(1);
  const [buttonSectionStep, setButtonSectionStep] = useState(0);

  const [coinRep, setCoinRep] = useState("Bitcoin");

  const updateSelectedCoin = (coinValue) => {
    if (coinValue === null || coinValue === undefined) {
      return false;
    }

    const selectedCoinObject = coinList.filter((item) => {
      return item.CoinName.includes(coinValue);
    });

    setCoinRep(selectedCoinObject[0]["CoinName"]);

    setFormInputs({
      ...formInputs,
      CoinType: selectedCoinObject[0]["CoinName"],
    });

    setButtonSectionStep(2);

    console.log("This is the Re[", coinRep);
  };

  const handleFormChange = async (e, field) => {
    e.preventDefault();
    switch (field) {
      case "ProviderService":
        setFormInputs({ ...formInputs, ProviderService: e.target.value });
        setButtonSectionStep(1);
        break;
      case "CoinType":
        // console.log(e.target.value);
        // setFormInputs({ ...formInputs, CoinType: e.target.value });
        // setButtonSectionStep(2);
        break;
      case "MeterNumber":
        setFormInputs({ ...formInputs, MeterNumber: e.target.value });
        break;
      case "VerifyMeterNumber":
        setIsIconLoading(true);
        const meterVerification = await valdateMeterNumber(
          formInputs.MeterNumber,
          formInputs.ProviderService
        );
        console.log("This is the Meter Veti", meterVerification);
        if (meterVerification["data"] == false) {
          setFormErrors({
            ...formErrors,
            message: `Meter Number is invalid ,kindly check`,
            showFormError: true,
          });
          setIsIconLoading(false);
          notifyEvent("Error", "Meter Number is invalid ,kindly check your input and provider type");
        } else {
          setFormInputs({
            ...formInputs,
            MeterName: meterVerification.data["address"],
            MeterAddress: meterVerification.data["name"],
            isMeterVerififed: true,
          });
          setIsIconLoading(false);
          notifyEvent("Success", "Meter Number Found");
          setButtonSectionStep(4);

          setFormErrors({
            ...formErrors,
            showFormError: false,
          });
        }
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

        if (formInputs.Amount.length <= 0) {
          setButtonSectionStep(2);
        }
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
          setButtonSectionStep(5);
          setFormErrors({ ...formErrors, showFormError: false });
        } else {
          setFormInputs({ ...formInputs, RecipientPhone: e.target.value });
          setFormErrors({
            ...formErrors,
            message: `Phone Number must be not be greater or less than 11`,
            showFormError: true,
          });
          setButtonSectionStep(4);
        }
        break;

      case "RecipientEmail":
        console.log(e.target.value);
        setFormInputs({ ...formInputs, ClientEmail: e.target.value });
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

  // PROCESS CRYPTO CONVERSION
  const PayticaCryptoPrices = props.PayticaCryptoPrices;

  const coinPricesinNaira = {
    BitcoinInNaira: PayticaCryptoPrices.BitcoinPriceinNaira,
    EthereumInNaira: PayticaCryptoPrices.EthereumPriceinNaira,
    LumenInNaira: PayticaCryptoPrices.LumenPriceinNaira,
    RippleInNaira: PayticaCryptoPrices.RipplePriceinNaria,
    BinanceCoinNaira: PayticaCryptoPrices.BinanceCoinNaira,
    TetherUSDTinNaira: PayticaCryptoPrices.TetherCoinPriceinNaira,
    BinanceUSDinNaira : PayticaCryptoPrices.BinanceUSDPriceinNaira ,

    BitcoinInDollar: PayticaCryptoPrices.BitcoinPriceinDollar,
    EthereumInDollar: PayticaCryptoPrices.EthereumPriceinDollar,
    LumenInDollar: PayticaCryptoPrices.LumenPriceinDollar,
    RipplePriceInDollar: PayticaCryptoPrices.RipplePriceinDollar,
    BinanceCoinInDollar: PayticaCryptoPrices.BinanceCoinPriceinDollar,
    TetherUSDTinDollar: PayticaCryptoPrices.TetherCoinPriceinDollar,
    BinanceUSDinDollar : PayticaCryptoPrices.BinanceUSDPriceinDollar
  };
  const [cryptoConvertedAmount, setcryptoConvertedAmount] = useState(0);
  const [cryptoConversionMessage, setCryptoConversionMessage] = useState({
    showConversionMessage: false,
  });

  const convertNairaToCrypto = async (theCoin, theAmount) => {
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

  // START PAYMENT PROCESS
  const StartPayment = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    setIsLoading(true);
    const endpoint = host + "/AnonymousPayRoute/create-anonymous-transaction";
    await axios
      .post(endpoint, {
        Amount: formInputs.Amount,
        AmountInCrypto: AmountInCrypto,
        PhoneNumber: formInputs.RecipientPhone,
        CoinType: formInputs.CoinType,
        ProviderName: formInputs.ProviderService,
        MeterNumber: formInputs.MeterNumber,
        ServiceType: "Electricity",
        ClientEmail: formInputs.ClientEmail,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("This is the Data", res.data);
          const theData = res.data["data"];
          setIsLoading(false);
          if (typeof window !== "undefined") {
            localStorage.setItem("transactionData", theData["orderID"]);
          }
          notifyEvent("Success", "Payment Link Generated");

          router.push("/paymentSection/paymentDetails");
        } else {
          setIsLoading(false);
          setIsSubmitted(false)
          notifyEvent("Error", "Error Generating Payment Link");
        }
      });
  };

  // Get the list of recharge providers
  const getRechargeProviders = async () => {
    const endpoint = host + "/baxiRoutes/fetch-electricity-providers/";
    axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setIsLoaded(true);
        setProviders(res.data.providers);
        console.log(res.data.providers);
      }
    });
  };

  useEffect(() => {
    getRechargeProviders();
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
              // onClick={() => setSectionStep(1)}
              className={
                sectionStep == 1
                  ? "fa fa-minus steps-changer-indicators-icons-active"
                  : "fa fa-minus steps-changer-indicators-icons"
              }
            ></i>
            <i
              // onClick={() => setSectionStep(2)}
              className={
                sectionStep == 2
                  ? "fa fa-minus steps-changer-indicators-icons-active"
                  : "fa fa-minus steps-changer-indicators-icons"
              }
            ></i>
            <i
              // onClick={() => setSectionStep(3)}
              className={
                sectionStep == 3
                  ? "fa fa-minus steps-changer-indicators-icons-active"
                  : "fa fa-minus steps-changer-indicators-icons"
              }
            ></i>
            <i
              // onClick={() => setSectionStep(4)}
              className={
                sectionStep == 4
                  ? "fa fa-minus steps-changer-indicators-icons-active"
                  : "fa fa-minus steps-changer-indicators-icons"
              }
            ></i>

            <i
              // onClick={() => setSectionStep(5)}
              className={
                sectionStep == 5
                  ? "fa fa-minus steps-changer-indicators-icons-active"
                  : "fa fa-minus steps-changer-indicators-icons"
              }
            ></i>

            <i
              // onClick={() => setSectionStep(6)}
              className={
                sectionStep == 6
                  ? "fa fa-minus steps-changer-indicators-icons-active"
                  : "fa fa-minus steps-changer-indicators-icons"
              }
            ></i>

            <i
              // onClick={() => setSectionStep(7)}
              className={
                sectionStep == 7
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
            {sectionStep === 1 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Electricity Provider</p>

                  <p className="payBox-text">
                    What Provide are you paying to ?
                  </p>
                  <select
                    onChange={(e) => {
                      handleFormChange(e, "ProviderService");
                    }}
                    value={formInputs.ProviderService}
                    className="authForm"
                  >
                    <option name="Select Default" value="">
                      Select Provider
                    </option>
                    {Providers.map((i) => (
                      <option name="ProviderService" value={i.service_type}>
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
                        htmlType="submit"
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
                            <p className="coins-item-text">{i.CoinName}</p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                {buttonSectionStep >= 2 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                        htmlType="submit"
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
                  <p className="payBox-heading">Power Amount</p>

                  <p className="payBox-text">
                    What Amount would you like to pay in Naira ?
                  </p>
                  <input
                    onChange={(e) => {
                      handleFormChange(e, "Amount");
                    }}
                    className="authForm"
                    type="text"
                    name="Amount"
                    value={formInputs.Amount}
                    placeholder="Unit Amount in Naira"
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
                        you pay {cryptoConvertedAmount} {formInputs.CoinType}
                      </p>
                    </>
                  ) : null}
                </div>

                {buttonSectionStep >= 3 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                        htmlType="submit"
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
                  <p className="payBox-heading">Meter Details</p>

                  <p className="payBox-text">What is Your meter number ?</p>
                  <input
                    onChange={(e) => {
                      handleFormChange(e, "MeterNumber");
                    }}
                    className="authForm"
                    type="text"
                    name="MeterNumber"
                    value={formInputs.MeterNumber}
                    placeholder="Your Meter Number"
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

                {formInputs.isMeterVerififed ? (
                  <>
                    <p className="payBox-success-message">
                      {formInputs.MeterName} - {formInputs.MeterAddress}
                    </p>
                  </>
                ) : null}

                {formInputs.isMeterVerififed ? (
                  <>
                    {buttonSectionStep >= 4 ? (
                      <>
                        <div>
                          <button
                            onClick={() => {
                              setSectionStep(sectionStep + 1);
                            }}
                            className="form-button2"
                            htmlType="submit"
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
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        handleFormChange(e, "VerifyMeterNumber");
                      }}
                      className="form-button2-verify"
                    >
                      {isIconLoading ? (
                        <>
                          <i
                            class="fa fa-spinner fa fa-spinner fa-spin fa-3x fa-fw form-spinning-icon"
                            aria-hidden="true"
                          ></i>
                        </>
                      ) : (
                        <>Verify</>
                      )}
                    </button>
                  </>
                )}
              </>
            ) : null}

            {sectionStep == 5 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Phone Number</p>

                  <p className="payBox-text">Phone Number to recieve token</p>

                  <input
                    onChange={(e) => {
                      handleFormChange(e, "RecipientPhone");
                    }}
                    className="authForm"
                    type="text"
                    name="RecipientPhone"
                    value={formInputs.RecipientPhone}
                    placeholder="Your Phone Number"
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

                {buttonSectionStep >= 5 ? (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          setSectionStep(sectionStep + 1);
                        }}
                        className="form-button2"
                        htmlType="submit"
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

            {sectionStep === 6 ? (
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
                  <button
                    onClick={() => {
                      setSectionStep(sectionStep + 1);
                    }}
                    className="form-button2"
                    htmlType="submit"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : null}

            {sectionStep == 7 ? (
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
                      <p className="summarySection-text-large">Crypto Amount</p>

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
                        {formInputs.ProviderService}
                      </p>
                    </div>

                    <hr />
                    <div className="">
                      <p className="summarySection-text-large">Meter Details</p>
                      <p className="summarySection-text-small">
                        {formInputs.MeterName} - {formInputs.MeterAddress}
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

                <div>
                  <button
                    onClick={(e) => {
                      StartPayment(e);
                    }}
                    className="form-button-proceed"
                    htmlType="submit"
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
}

const mapStateToProps = (state) => {
  return {
    PayticaCryptoPrices: state.PayticaCryptoPrices,
  };
};

export default connect(mapStateToProps, null)(ElectricityPaymentForm);
