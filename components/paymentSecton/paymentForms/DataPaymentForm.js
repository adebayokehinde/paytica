import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SemipolarLoading } from "react-loadingg";
import router, { useRouter } from "next/router";
import { host } from "../../utils/constants";
import { coinList } from "../utilities/getPayticaCoins";

import {
  validateNairaPrice,
  validatePhoneNumber,
  validateIfInteger,
  spiltCodeAndAmount,
} from "../utilities/dataValidation";
import { SetNairaToCrypto } from "../utilities/priceCaculator";
import { useToasts } from "react-toast-notifications";


function DataBundlePaymentForm(props) {
  const history = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);


  const [Providers, setProviders] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const [coinToken, setCoinToken] = useState("");

  const [theTransactionID, setTransactionID] = useState("");
  const [paymentinitState, setPaymentInitState] = useState(false);

  const [AmountInCrypto, setAmountInCrypto] = useState("");
  const [formInputs, setFormInputs] = useState({
    Amount: "",
    RecipientPhone: "",
    NetworkCarriers: "",
    Datacode: "",
    CoinType: "",
    BillType: "",
    ProviderService: "",
    ClientEmail: "",
    isCoinChanged: false,
  });

  const [miniumAmount, setMinimumAmount] = useState(100);
  const [minimumCrypto, setMinimumCrypto] = useState(0.01);
  const [formErrors, setFormErrors] = useState({
    message: "",
    showFormError: false,
  });

  const [sectionStep, setSectionStep] = useState(1);
  const [buttonSectionStep, setButtonSectionStep] = useState(0);

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

  // COINS SELECTIONS

  const [coinRep, setCoinRep] = useState("Bitcoin");

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
      isCoinChanged: true,
    });
    convertNairaToCrypto(selectedCoinObject[0]["CoinName"], formInputs.Amount);
    setButtonSectionStep(2);

    console.log("This is the Re[", coinRep);
  };

  // -- ENDS HERE

  const handleFormChange = async (e, field, dataBundlePrice) => {
    switch (field) {
      case "ProviderService":
        setFormInputs({ ...formInputs, ProviderService: e.target.value });
        await getBundlePackage(e.target.value);
        break;
      case "DataBundleType":
        const values = e.target.value;
        const valueContext = spiltCodeAndAmount(values);
        setFormInputs({
          ...formInputs,
          Datacode: valueContext["code"],
          Amount: valueContext["amount"],
        });

        if (formInputs.isCoinChanged == true) {
          convertNairaToCrypto(formInputs.CoinType, valueContext["amount"]);
          setButtonSectionStep(2);
        }
        // Unlocks at Buttonstep == 1
        setButtonSectionStep(1);
        break;
      case "CoinType":
        console.log(e.target.value);
        setFormInputs({
          ...formInputs,
          CoinType: e.target.value,
          isCoinChanged: true,
        });

        convertNairaToCrypto(e.target.value, formInputs.Amount);
        setButtonSectionStep(2);
        break;
      case "RecipientPhone":
        // ------ VALIDATE PHONE ---///
        const validatePhone = validatePhoneNumber(e.target.value);
        console.log("The Phone stat", validatePhone);
        if (validatePhone == true) {
          setFormInputs({ ...formInputs, RecipientPhone: e.target.value });
          setButtonSectionStep(3);
          setFormErrors({ ...formErrors, showFormError: false });
        } else {
          setFormInputs({ ...formInputs, RecipientPhone: e.target.value });
          setFormErrors({
            ...formErrors,
            message: `Phone Number must be not be greater or lesser than 11`,
            showFormError: true,
          });
          setButtonSectionStep(2);
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

  const StartPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted(true)
    const endpoint = host + "/AnonymousPayRoute/create-anonymous-transaction";
    axios
      .post(endpoint, {
        Amount: formInputs.Amount,
        AmountInCrypto: AmountInCrypto,
        PhoneNumber: formInputs.RecipientPhone,
        CoinType: formInputs.CoinType,
        DataBundleType: formInputs.Datacode,
        ServiceType: "DataBundle",
        ProviderName: formInputs.ProviderService,
        ClientEmail: formInputs.ClientEmail,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          const theData = res.data["data"];

          setIsLoading(false);
          setTransactionID(theData["orderID"]);
          setPaymentInitState(true);
          
          console.log("This is the is transaction ID", theData["orderID"]);
          console.log("This is the is transaction ID", theTransactionID);

          if (typeof window !== "undefined") {
            localStorage.setItem("transactionData", theData["orderID"]);
          }
          notifyEvent("Success", "Payment Link Generated");
          router.push("/paymentSection/paymentDetails");
        }else{
          setIsSubmitted(false)
          notifyEvent("Error", "Error Generating Payment Link");
        }
      });
  };

  const getDataProviders = async () => {
    const endpoint = host + "/baxiRoutes/fetch-data-bundles/";
    axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setIsLoaded(true);
        setProviders(res.data.providers);
        console.log(res.data.providers);
      }
    });
  };

  const [serviceName, setServiceName] = useState([]);
  const [bundlePackage, setBundlePackage] = useState([]);
  const [showBundles, setShowBundles] = useState(false);
  const getBundlePackage = async (sName) => {
    const endpoint = host + "/baxiRoutes/fetch-data-bundles-from-service/";

    setIsLoading(true);
    setServiceName(sName);
    console.log("this is the service name", sName);
    axios
      .get(endpoint, {
        params: {
          serviceName: sName,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setBundlePackage(res.data.providers);
          setShowBundles(true);
          setIsLoading(false);

          console.log("tHIS ARE THE bundle packehe", res.data);
        }
      });
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

  useEffect(() => {
    getDataProviders();
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
                  <p className="payBox-heading">Carrier Network</p>

                  <p className="payBox-text">
                    What Network are you paying to ?
                  </p>

                  <select
                    onChange={(e) => {
                      handleFormChange(e, "ProviderService");
                    }}
                    value={formInputs.ProviderService}
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

                  {showBundles ? (
                    <>
                      <div className="form-input-box">
                        <p className="payBox-text">
                          What Data Plan are you paying for ?
                        </p>
                        <select
                          onChange={(e) => {
                            handleFormChange(e, "DataBundleType");
                          }}
                          value={[formInputs.Datacode, formInputs.Amount]}
                          className="authForm"
                        >
                          <option name="datacode" value="">
                            Please Select Data Plan
                          </option>
                          {bundlePackage.map((i) => (
                            <option
                              name="datacode"
                              value={[i.datacode, i.price]}
                            >
                              {i.name} - ₦{i.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <> </>
                  )}

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
                </div>
              </>
            ) : null}

            {sectionStep == 2 ? (
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
                  <p className="payBox-heading">Recipient Phone</p>

                  <p className="payBox-text">
                    What Phone number would you like to recharge ?
                  </p>
                  <input
                    onChange={(e) => {
                      handleFormChange(e, "RecipientPhone");
                    }}
                    className="authForm"
                    type="text"
                    name="thePhoneNumber"
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
  );
}

const mapStateToProps = (state) => {
  return {
    PayticaCryptoPrices: state.PayticaCryptoPrices,
  };
};
export default connect(mapStateToProps, null)(DataBundlePaymentForm);
