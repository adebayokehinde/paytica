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
  splitMonthsPaidAndAmount,
} from "../utilities/dataValidation";

import { SetNairaToCrypto } from "../utilities/priceCaculator";
import { coinList } from "../utilities/getPayticaCoins";
import { useToasts } from "react-toast-notifications";



function CablePaymentForm(props) {
  const history = useRouter();
  const monthstoPay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const [coinToken, setCoinToken] = useState("");

  const [theTransactionID, setTransactionID] = useState("");
  const [paymentinitState, setPaymentInitState] = useState(false);

  // Controls the Form Inputs

  const [boquetPricingOptions, setBoquetPricingOptions] = useState("");
  const [cableData, setCableData] = useState({
    serviceName: "",
    cableBoquet: "",
    providerBoquetData: [],
    showBoquet: false,
    cableServiceList: [],
    // boquetPricingOptions : []
  });

  const [AmountInCrypto, setAmountInCrypto] = useState("");

  const [formInputs, setFormInputs] = useState({
    Amount: "",
    SmartCardNumber: "",
    MonthsPaid: "",
    PlanCode: "",
    ClientEmail: "",
    CoinType: "",
    isCoinChanged: false,
  });

  const [miniumAmount, setMinimumAmount] = useState(100);
  const [minimumCrypto, setMinimumCrypto] = useState(0.01);
  const [formErrors, setFormErrors] = useState({
    message: "",
    showFormError: false,
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

  // ------------ CABLE CONFIG STARTS -------------//

  // Get the list of recharge providers
  const getCableProviders = async () => {
    const endpoint = host + "/baxiRoutes/get-cable-providers";
    setIsLoading(true);
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        setCableData({
          ...cableData,
          cableServiceList: res.data["providers"],
        });
      }
    });
  };

  const getCableBoquet = async (cableName) => {
    // console.log("getting Provider Boquet", cableName);

    const endpoint = host + "/baxiRoutes/get-cable-boquet";
    await axios
      .get(endpoint, {
        params: {
          serviceName: cableName,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          setCableData({
            ...cableData,
            serviceName: cableName,
            providerBoquetData: res.data["providers"],
            showBoquet: true,
          });
          // console.log(res.data.providers);
        }
      });
  };

  const sortProviderToBoquetData = async (dataLoad, bouqetPlan) => {
    const theBoquetPricingOptions = dataLoad.filter(
      (i) => i.code === bouqetPlan
    );
    const theArray = theBoquetPricingOptions[0].availablePricingOptions;
    return theArray;
  };

  const [sectionStep, setSectionStep] = useState(1);
  const [buttonSectionStep, setButtonSectionStep] = useState(0);

  // ---------- CABLE CONFIG HERE -------------//

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
      isCoinChanged: true,
    });

    setButtonSectionStep(3);

  };

  const handleFormChange = async (e, field) => {
    switch (field) {
      case "CableType":
        setCableData({
          ...cableData,
          serviceName: e.target.value,
        });
        await getCableBoquet(e.target.value);
        break;
      case "BoquetType":
        setCableData({
          ...cableData,
          cableBoquet: e.target.value,
        });
        const ProviderBoquet = await sortProviderToBoquetData(
          cableData.providerBoquetData,
          e.target.value
        );
        setBoquetPricingOptions(ProviderBoquet);
        setButtonSectionStep(1);
        break;
      case "CoinType":
        // console.log(e.target.value);
        // setFormInputs({
        //   ...formInputs,
        //   CoinType: e.target.value,
        //   isCoinChanged: true,
        // });
        // setButtonSectionStep(2);
        break;
      case "MonthsPaid":
        // console.log(e.target.value, "The Value for the Change in Month");
        setFormInputs({ ...formInputs, MonthsPaid: e.target.value });
        const valueContext = splitMonthsPaidAndAmount(e.target.value);

        setFormInputs({
          ...formInputs,
          MonthsPaid: valueContext["monthsPaid"],
          Amount: valueContext["amount"],
        });

        if (formInputs.isCoinChanged == true) {
          convertNairaToCrypto(formInputs.CoinType, valueContext["amount"]);
          setButtonSectionStep(3);
        }
        // Unlocks at Buttonstep == 1
        setButtonSectionStep(3);
        break;
      case "SmartCardNumber":
        setFormInputs({ ...formInputs, SmartCardNumber: e.target.value });
        setButtonSectionStep(4);
        break;
      case "RecipientEmail":
        setFormInputs({ ...formInputs, ClientEmail: e.target.value });
        break;
      default:
        break;
    }
    // console.log("Cable Data Input", cableData);
    // console.log("Form Data Input", formInputs);
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

    // console.log("This is the Crypto Amount", cryptoConvertedAmount);

    return true;
  };

  const StartPayment = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    const payDetails = {
      Amount: formInputs.Amount,
      AmountInCrypto: AmountInCrypto,
      thePhoneNumber: formInputs.thePhoneNumber,
      CoinType: formInputs.CoinType,
      ClientEmail: formInputs.ClientEmail,
      ServiceType: "Cable",

      CableBoquetCode: cableData.cableBoquet,
      ProviderName: cableData.serviceName,
      MonthsPaid: formInputs.MonthsPaid,
      SmartCardNumber: formInputs.SmartCardNumber,
    };

    // console.log("this is the payload", payDetails);

    setIsLoading(true);
    const endpoint = host + "/AnonymousPayRoute/create-anonymous-transaction";
    axios
      .post(endpoint, {
        Amount: formInputs.Amount,
        AmountInCrypto: AmountInCrypto,
        thePhoneNumber: formInputs.thePhoneNumber,
        CoinType: formInputs.CoinType,
        ClientEmail: formInputs.ClientEmail,
        ServiceType: "Cable",

        CableBoquetCode: cableData.cableBoquet,
        ProviderName: cableData.serviceName,
        MonthsPaid: formInputs.MonthsPaid,
        SmartCardNumber: formInputs.SmartCardNumber,
      })
      .then((res) => {
        if (res.status == 200) {
          const theData = res.data["data"];
          setIsLoading(false);
          setTransactionID(theData["orderID"]);
          // console.log("This is the is transaction ID", theData["orderID"]);
          // console.log("This is the is transaction ID", theTransactionID);

          if (typeof window !== "undefined") {
            localStorage.setItem("transactionData", theData["orderID"]);
          }
          notifyEvent("Success", "Payment Link Generated");
          router.push("/paymentSection/paymentDetails");
        }else{
          notifyEvent("Error", "Error Generating Payment Link");
          setIsSubmitted(false)
        }
      });
  };

  useEffect(() => {
    getCableProviders();
  }, []);

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
            {sectionStep == 1 ? (
              <>
                <div className="form-input-box">
                  <p className="payBox-heading">Cable Provider</p>

                  <p className="payBox-text">
                    What Cable would you like to pay for ?
                  </p>

                  <select
                    onChange={(e) => {
                      handleFormChange(e, "CableType");
                    }}
                    value={cableData.serviceName}
                    className="authForm"
                  >
                    <option name="Select Default" value="">
                      Select Cable
                    </option>
                    {cableData.cableServiceList.map((i) => (
                      <option name="Service" value={i.service_type}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>

                {cableData.showBoquet ? (
                  <>
                    <div className="form-input-box">
                      <p className="payBox-text">
                        What Boquet would you like to pay for ?
                      </p>

                      <select
                        onChange={(e) => {
                          handleFormChange(e, "BoquetType");
                        }}
                        value={cableData.cableBoquet}
                        className="authForm"
                      >
                        <option name="Select Default" value="">
                          Select Cable
                        </option>
                        {cableData.providerBoquetData.map((i) => (
                          <option name="Service" value={i.code}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : null}

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
                  <p className="payBox-heading">Months payment</p>

                  <p className="payBox-text">
                    How many months would like to pay for ?
                  </p>
                  <select
                    onChange={(e) => {
                      handleFormChange(e, "MonthsPaid");
                    }}
                    value={[formInputs.MonthsPaid, formInputs.Amount]}
                    className="authForm"
                  >
                    <option name="datacode" value="">
                      Select Months To Pay For
                    </option>

                    {boquetPricingOptions.map((i) => (
                      <option
                        name="MonthsPaid"
                        value={[i.monthsPaidFor, i.price]}
                      >
                        {i.monthsPaidFor} Months - ₦{i.price}
                      </option>
                    ))}
                  </select>
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
                  <p className="payBox-heading">SmartCard Number</p>

                  <p className="payBox-text">
                    Kindly provide your smart card number ?
                  </p>
                  <input
                    onChange={(e) => {
                      handleFormChange(e, "SmartCardNumber");
                    }}
                    className="authForm"
                    type="text"
                    name="SmartCardNumber"
                    value={formInputs.SmartCardNumber}
                    placeholder="Your Smart Card Number/IUC Number ?"
                  />
                </div>

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
            ) : null}

            {sectionStep == 5 ? (
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

                <div className="">
                  {formErrors.showFormError ? (
                    <>
                      <p className="payBox-error-message">
                        {formErrors.message}
                      </p>
                    </>
                  ) : null}
                </div>

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
            ) : null}

            {sectionStep == 6 ? (
              <>
                <div>
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
                          Cable Provider
                        </p>
                        <p className="summarySection-text-small">
                          {cableData.serviceName}
                        </p>
                      </div>

                      <hr />
                      <div className="">
                        <p className="summarySection-text-large">
                          Months to pay for
                        </p>
                        <p className="summarySection-text-small">
                          {formInputs.MonthsPaid}
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

export default connect(mapStateToProps, null)(CablePaymentForm);
