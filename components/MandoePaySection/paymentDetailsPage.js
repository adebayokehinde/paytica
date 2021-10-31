import React, { useState, useEffect } from "react";
import NavbarComponent from "../uiComponent/navbar/navbar";
import FooterB from "../uiComponent/footerSection/footer";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  GetCryptoPrices,
  getLivePrices,
} from "../../redux/actions/MandoeAction/cryptoPrices";
import axios from "axios";
import { SemipolarLoading } from "react-loadingg";
import { useToasts } from "react-toast-notifications";


var QRCode = require("qrcode.react");

const MandoeHost = "https://mandoe-pay.herokuapp.com";

const pusherKeys = {
  app_id: "995927",
  key: "8b827980b6cb1e62195c",
  secret: "b5232b1ca8bbd63b0edd",
  cluster: "eu",
};

// TEMP AMOUNT
let tempAmount = 0;

const PaymentDetails = (props) => {
  const getPaymentNotification = async () => {
    try {
      const pusher = new Pusher(pusherKeys["key"], {
        cluster: pusherKeys["cluster"],
        encrypted: true,
      });

      const channel = pusher.subscribe("paymentRelayChannel");
      channel.bind("paymentRelayEvent", (data) => {
        console.log(data);
      });
    } catch (e) {
      // console.log(e)
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [theHour, setTheHour] = useState("");
  const [theMinutes, setTheMinutes] = useState("");
  const [theSeconds, setTheSeconds] = useState("");
  const [expiredCounter, setExpiredCounter] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  //   --- Ends here
  const [theCoin, setTheCoin] = useState("");

  const [isEthereum, setIsEtheruem] = useState(false);
  const [isLumen, setIsLumen] = useState(false);
  const [isNaira, setIsNaira] = useState(false);
  const [isRipple, setIsRipple] = useState(false);
  const [isBitcoin, setIsBitcoin] = useState(false);
  const [isBinaceCoin, serIsBinanceCoin] = useState(false);

  const [PaymentData, setPaymentData] = useState({
    paymentTransactionID: "",
    paymentServiceName: "",
    paymentAmount: "",
    paymentAmountInCrypto: "",
    paymentAmountInNaira : "",
    paymentCoinType: "",
    paymentPublicAddress: "",
    paymentServiceType: "",
  });

  // Get Selected Coin
  const processSelectedCoin = async (theCoin) => {
    console.log("This is the selected Coin", theCoin);
    if (theCoin == "Ethereum") {
      await getAssestPrice(theCoin);

      setIsEtheruem(true);
    }
    if (theCoin == "Lumen") {
      setIsLumen(true);
      await getAssestPrice(theCoin);
    }
    if (theCoin == "Ripple") {
      setIsRipple(true);
      await getAssestPrice(theCoin);
    }
    if (theCoin == "Bitcoin") {
      setIsBitcoin(true);
      await getAssestPrice(theCoin);
    }
    if (theCoin == "Naira") {
      setIsNaira(true);
      await getAssestPrice(theCoin);
    }

    if (theCoin == "BinanceCoin") {
      serIsBinanceCoin(true);
      await getAssestPrice(theCoin);
    }
  };

  // console.log(clientData['clientCoinType'])

  const [theAmount, setTheAmount] = useState(0);
  const [theTransactionID, setTheTransactionID] = useState("");
  const [thePublicAddress, setThePublicAddress] = useState("");

  const [priceData, setPriceData] = useState([]);
  const [caculatedAmount, setCaculatedAmount] = useState(0);

  const copyItemNotify = (x) => {
    notifyEvent("Success", `${x} Copied`);

  };

  const countDownTimer = () => {
    // Set the date we're counting down to
    var countDownDate = new Date().getTime() + 15 * 60 * 1000;

    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for hours, minutes and seconds
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTheHour(hours);
      setTheMinutes(minutes);
      setTheSeconds(seconds);

      if (distance < 0) {
        clearInterval(x);
        setIsExpired(true);
        setExpiredCounter(true);
        // document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  };


  const PayticaCryptoPrices = props.PayticaCryptoPrices

  const assetObject = {
    BitcoinInNaira: PayticaCryptoPrices.BitcoinPriceinNaira,
    EthereumInNaira: PayticaCryptoPrices.EthereumPriceinNaira,
    LumenInNaira: PayticaCryptoPrices.LumenPriceinNaira,
    RippleInNaira: PayticaCryptoPrices.RipplePriceinNaria,
    BinanceCoinNaira : PayticaCryptoPrices.BinanceCoinNaira ,

    BitcoinInDollar : PayticaCryptoPrices.BitcoinPriceinDollar ,
    EthereumInDollar : PayticaCryptoPrices.EthereumPriceinDollar ,
    LumenInDollar : PayticaCryptoPrices.LumenPriceinDollar ,
    RipplePriceInDollar : PayticaCryptoPrices.RipplePriceinDollar,
    BinanceCoinInDollar : PayticaCryptoPrices.BinanceCoinPriceinDollar
  };

  const getAssestPrice = (theCoin) => {
    // return theAssetPrice
    console.log("GETTING THE PRICE FOR", theCoin);
    console.log("The Assest And Prices from LS", assetObject);
    for (let [key, value] of Object.entries(assetObject)) {
      // console.log(key, value);

      console.log("THE SELECTED COIN IS", theCoin);
      console.log("THE LOOPED COIN ", key);

      if (theCoin == key) {
        console.log("The Coin is ", key);
        console.log("THE MAIN AMOUNT", tempAmount);

        const theAssetPrice = tempAmount / value;
        console.log("this is the value", theAssetPrice);
        setCaculatedAmount(theAssetPrice);
        return theAssetPrice;
      }
    }
  };
 


  const getPaymentData = async () => {
    let transactionID = null;
    if (typeof window !== "undefined") {
      transactionID = localStorage.getItem("payticaTransactionData");
    }

    console.log("The Transaction ID", transactionID);

    const endpoint = MandoeHost + "/pay/transaction-details";

    await axios
      .post(endpoint, {
        transactionID: transactionID,
      })
      .then(async (res) => {
        if (res.status == 200) {
          console.log("Fetched Data", res.data["data"]);
          const theData = res.data["data"];

          tempAmount = theData["Amount"];

          setIsLoaded(true);

          setPaymentData({
            ...PaymentData,
            paymentTransactionID: theData["TransactionID"],
            paymentAmount: theData["Amount"],
            paymentAmountInCrypto: theData["AmountInCrypto"],
            paymentPublicAddress: theData["PublicKey"],
            paymentCoinType: theData["CoinType"],
            paymentAmountInNaira : theData['AmountInNaira']
          });

          // Countdown
          countDownTimer();
          // process selected coinan
          await processSelectedCoin(theData["CoinType"]);
        }
      });
  };

  const initPaymentSocket = async () => {
    let transactionID = null;

    if (typeof window !== "undefined") {
      transactionID = localStorage.getItem("payticaTransactionData");
    }
    const endpoint = MandoeHost + "/pay/transaction-socket/";
    await axios
      .post(endpoint, {
        transactionID: transactionID,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Connected To Backend For Transaction Socket");
          console.log(res.data);
        }
      });
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



  useEffect(async () => {
    await getPaymentData(); 
    await initPaymentSocket();
    getPaymentNotification();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="fitter"></div>

      <>
        {isLoaded ? (
          <>
            <div className="container mt-5">
              <div
                style={{ marginTop: 20, marginBottom: 20 }}
                className="exc-mobile shadow "
              >
                <div className="anon-box">
                  <div className="anon-box-header p-3 ">
                    <p>Paytica Automated P2P</p>
                  </div>
                  <div className="pl-2 pr-2 pt-3 pb-2">
                    <div className className="">
                      <div className="flex-row anon-flex-row-height">
                        <span>
                          <p className="anon-details-items-left">I send</p>
                        </span>
                        <span className="ml-auto">
                          <p> ${PaymentData.paymentAmount}</p>
                        </span>
                      </div>
                      <hr />

                      <div className="flex-row anon-flex-row-height">
                        <span>
                          <p className="anon-details-items-left">
                            Recipient recieves
                          </p>
                        </span>
                        <span className="ml-auto">
                          <p> ₦{PaymentData.paymentAmountInNaira}</p>
                        </span>
                      </div>
                      <hr />
                      <div className="flex-row anon-flex-row-height">
                        <span>
                          <p className="anon-details-items-left">
                            Transaction ID
                          </p>
                        </span>
                        <span className="ml-auto">
                          <p> {PaymentData.paymentTransactionID}</p>
                        </span>
                      </div>
                      <hr />
                      <div className="flex-row anon-flex-row-height">
                        <span>
                          <p>Time Left</p>
                        </span>
                        <span className="ml-auto">
                          {!isExpired ? (
                            <>
                              <p style={{ color: "green" }}>
                                {theHour}:{theMinutes}:{theSeconds}
                              </p>
                            </>
                          ) : (
                            <p style={{ color: "red" }} className="">
                              Expired
                            </p>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex-col-center mt-5 mb-5">
                      <div>
                        <p className="text-center">QR CODE</p>
                        <span>
                          <QRCode
                            className="QR-flexContain"
                            value={PaymentData.paymentPublicAddress}
                            size={300}
                          />
                        </span>
                      </div>

                      {/* <div className="mt-3">
            <button className="btn btn-success">Open Wallet</button>
          </div> */}

                      <div className="transactionPortal-address-flex">
                        <div className="transactionPortal-address-text-box">
                          {isEthereum ? (
                            <p className="transactionPortal-address-text">
                              {PaymentData.paymentAmountInCrypto} ETH
                            </p>
                          ) : (
                            <></>
                          )}

                          {isRipple ? (
                            <p className="transactionPortal-address-text">
                              {PaymentData.paymentAmountInCrypto} XRP
                            </p>
                          ) : (
                            <></>
                          )}

                          {isLumen ? (
                            <p className="transactionPortal-address-text">
                              {PaymentData.paymentAmountInCrypto} XLM
                            </p>
                          ) : (
                            <></>
                          )}

                          {isBinaceCoin ? (
                            <p className="transactionPortal-address-text">
                             {PaymentData.paymentAmountInCrypto} BNB
                            </p>
                          ) : (
                            <></>
                          )}

                          {isBitcoin ? (
                            <p className="transactionPortal-address-text">
                             {PaymentData.paymentAmountInCrypto} BTC
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="transactionPortal-address-icon-box">
                          <CopyToClipboard
                            text={PaymentData.paymentAmount}
                            onCopy={() => copyItemNotify("Amount")}
                          >
                            <i className="transactionPortal-address-icon fa fa-clone"></i>
                          </CopyToClipboard>
                        </div>
                      </div>

                      <div className="transactionPortal-address-flex">
                        <div className="transactionPortal-address-text-box">
                          <p className="transactionPortal-address-text">
                            {`${PaymentData.paymentPublicAddress.substring(0, 15)}...`}
                          </p>
                        </div>
                        <div className="transactionPortal-address-icon-box">
                          <CopyToClipboard
                            text={PaymentData.paymentPublicAddress}
                            onCopy={() => copyItemNotify("Address")}
                          >
                            <i className="transactionPortal-address-icon fa fa-clone"></i>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <span>
                        {" "}
                        <p>
                          For faster payment, please avoid using an exchange
                          platform to send this payment.
                        </p>
                      </span>
                      <div className="flex-row">
                        <span>
                          <button className="btn btn-outline-danger">
                            {" "}
                            Cancel{" "}
                          </button>
                        </span>
                        <span className="ml-auto">
                          <p className="pt-2">
                            Transaction ID: #{PaymentData.paymentTransactionID}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ height: 600 }} className="exc-mobile">
              <SemipolarLoading color={"#5a1d65"} />
            </div>{" "}
          </>
        )}
      </>

      <FooterB />
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

const mapDispatchToProps = (dispatch) => {
  return {
    // clientData: (data) => dispatch(updateClientPaymentDetails(data)),
    getCryptoPrices: () => dispatch(GetCryptoPrices()),
    updatePricesFromStore: (data) => dispatch(getLivePrices(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
 