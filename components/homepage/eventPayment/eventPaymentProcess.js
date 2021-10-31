import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../uiComponent/footerSection/footer";
import NavbarTwo from "../../uiComponent/navbar/navbar";
import { host } from "../../utils/constants"
import Pusher from "pusher-js";
import router from "next/router";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { useToasts } from "react-toast-notifications";
import { SemipolarLoading } from "react-loadingg";

// ProcessPairPrice
var QRCode = require("qrcode.react");

const pusherKeys = {
  app_id: "995927",
  key: "8b827980b6cb1e62195c",
  secret: "b5232b1ca8bbd63b0edd",
  cluster: "eu",
};

function EventTicketPurchase(props) {
  // TEMP AMOUNT
  let tempAmount = 0;
  // NOTIFICATION
  const getNotification = () => {
    let transactionID = null;
    if (typeof window !== "undefined") {
      transactionID = localStorage.getItem("transactionData");
    }
    const pusher = new Pusher(pusherKeys["key"], {
      cluster: pusherKeys["cluster"],
      // encrypted: true,
    });

    const channel = pusher.subscribe("paymentRelayChannel");
    channel.bind("paymentRelayEvent", (data) => {
      console.log("Data from socket", data);
      if (data["isPaid"] == true && data["paymentOrderID"] == transactionID) {
        router.push("/extraPages/successPage");
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

  //---------------- --------------- //
  const [isPaid, setIsPaid] = useState(false);
  const [Loaded, setLoaded] = useState(true);
  const [theHour, setTheHour] = useState("");
  const [theMinutes, setTheMinutes] = useState("");
  const [theSeconds, setTheSeconds] = useState("");
  const [expiredCounter, setExpiredCounter] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const [isEthereum, setIsEtheruem] = useState(false);
  const [isLumen, setIsLumen] = useState(false);
  const [isNaira, setIsNaira] = useState(false);
  const [isRipple, setIsRipple] = useState(false);
  const [isBitcoin, setIsBitcoin] = useState(false);
  const [isTetherUSDT, setIsTetherUSDT] = useState(false);
  const [isBnb, setIsBnb] = useState(false);
  const [isBusd, setIsBusd] = useState(false);

  const [theCoin, setTheCoin] = useState("");
  const [theAmount, setTheAmount] = useState(0);
  const [theTransactionID, setTheTransactionID] = useState("");
  const [thePublicAddress, setThePublicAddress] = useState("");
  const [theService, setTheService] = useState("useState");

  const [PaymentData, setPaymentData] = useState({
    paymentTransactionID: "",
    paymentServiceName: "",
    paymentAmount: "",
    paymentAmountInCrypto: "",
    paymentCoinType: "",
    paymentPublicAddress: "",
    paymentServiceType: "",
  });

  // Get Selected Coin
  const processSelectedCoin = async (theCoin) => {
    console.log("This is the selected Coin", theCoin);
    if (theCoin == "Ethereum") {
      setIsEtheruem(true);
    }
    if (theCoin == "Lumen") {
      setIsLumen(true);
    }
    if (theCoin == "Ripple") {
      setIsRipple(true);
    }
    if (theCoin == "Bitcoin") {
      setIsBitcoin(true);
    }

    if (theCoin == "BinanceUSD") {
      setIsBusd(true);
    }

    if (theCoin == "TetherUSDT") {
      setIsTetherUSDT(true);
    }

    if (theCoin == "BinanceCoin") {
      setIsBnb(true);
    }
  };

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

  // Loads Payment Window data from backend

  const getTransactionData = () => {
    let transactionID = null;
    if (typeof window !== "undefined") {
      transactionID = localStorage.getItem("transactionData");
    }
    const endpoint = host + "/AnonymousPayRoute/get-payment-data";
    axios
      .get(endpoint, {
        params: {
          transactionID,
        },
      })
      .then(async (res) => {
        if (res.status == 200) {
          const theData = res.data["data"];

          setPaymentData({
            ...PaymentData,
            paymentTransactionID: theData["TransactionID"],
            paymentServiceName: theData["ProviderName"],
            paymentAmount: theData["Amount"],
            paymentAmountInCrypto: theData["AmountInCrypto"],
            paymentPublicAddress: theData["PublicKey"],
            paymentServiceType: theData["ServiceType"],
            paymentCoinType: theData["CoinType"],
          });

          if (theData["isExpired"] == true) {
            setIsExpired(true);
          } else {
          }
          await processSelectedCoin(theData["CoinType"]);
          await initPaymentSocket(theData["CoinType"], transactionID);
          countDownTimer();
          setLoaded(true);
        }
      });
  };

  const initPaymentSocket = async (theCoin, transactionID) => {
    const endpoint = host + "/AnonymousPayRoute/run-payment-order";
    axios
      .post(endpoint, {
        orderID: transactionID,
        CoinType: theCoin,
      })
      .then((res) => {
        if (res.status == 200) {
        }
      });
  };

  useEffect(() => {
    getTransactionData();
    getNotification();
  }, []);

  return (
    <>
      <NavbarTwo />

      <>
        <div 
      style={{ marginTop: 100, marginBottom: 20 }}

        className="container">
          <div className="row">
            <div className="col-sm-6">
              {Loaded ? (
                <>
                  <div
                    className=""
                  >
                    <div className="exc-mobile shadow ">
                      <div className="anon-box">
                        <div className="anon-box-header p-3 ">
                          <p>Paytica Ticket Purchase</p>
                        </div>
                        <div className="pl-2 pr-2 pt-3 pb-2">
                          <div className className="">
                            <div className="flex-row anon-flex-row-height">
                              <span>
                                <p className="anon-details-items-left">
                                  Amount
                                </p>
                              </span>
                              <span className="ml-auto">
                                <b>₦{PaymentData.paymentAmount}</b>
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
                            <div className="mandoe-payment-crypto-section">
                              <div className="mandoe-payment-qr">
                                <QRCode
                                  value={PaymentData.paymentPublicAddress}
                                  logoImage={
                                    "https://res.cloudinary.com/djhjipy7n/image/upload/v1629201815/MANDOE_LOGO_1_pweozz.png"
                                  }
                                  //  fgColor={'black'}
                                />
                              </div>
                              <div className="mandoe-payment-wallet">
                                <span>
                                  <p className="mandoe-payment-wallet-text">
                                    Open your Crypto wallet app and send the
                                    crypto amount to the wallet address below.
                                  </p>
                                </span>

                                <span className="flex-r">
                                  <p className="mandoe-payment-text">
                                    {`${PaymentData.paymentPublicAddress.substring(
                                      0,
                                      15
                                    )}...`}
                                  </p>
                                  <CopyToClipboard
                                    text={PaymentData.paymentPublicAddress}
                                    onCopy={() => copyItemNotify("Address")}
                                  >
                                    <i className="mandoe-payment-icon fa fa-clone pt-2 pl-5 "></i>
                                  </CopyToClipboard>
                                </span>
                              </div>
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
                  </div>
                </>
              )}
            </div>

            <div className="col-sm-6 col-lg-6 col-md-6">
              <div className="col-lg-12 col-md-12 col-sm-12 flex-c">
                <span className="event-img-detail">
                  <img src="https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xf6793da657495ffeff9ee6350824910abc21356c:79620866622375052805449593826879326143915809581831826021747550262892660011158/62a1e1da" />
                </span>

                <div className="">
                  <div className="event-details">
                    <h3>
                      The Global Financial Markets: “The 21st Century Money”.
                    </h3>
                    <p>by TradelandMark</p>
                    <p>Date and time</p>
                    <p className="text-danger">Sat, 6 Nov 2021, 09:30 WAT</p>
                    <div className="pt-3">
                      <h6>About</h6>
                      <p>
                        Unveiling the opportunities available in trading the
                        global financial markets
                      </p>
                      <p>
                        TradelandMark invites you to a value packed Mega
                        Conference
                      </p>
                    </div>
                  </div>

            
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <Footer />
    </>
  );
}

export default EventTicketPurchase;
