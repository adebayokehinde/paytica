import React, { useEffect, useState } from "react";
import FooterComponent from "../uiComponent/footerSection/footerB";
import NavbarTwo from "../uiComponent/navbar/navbar";
import { host } from "../utils/constants";
import axios from "axios";

import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SuccessPageDisplay = () => {
  const [transactionData, setTransactionData] = useState({
    billType: "",
    amountInNaira: "",
    amountInCrypto: "",
    publicKey: "",
    coinType: "",
    transactionCode: "",
  });

  const copyItemNotify = (x) => {
    notifyEvent("Success", `${x} Copied`);
  };

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
          console.log("The Data", theData);
          setTransactionData({
            ...transactionData,
            billType: theData["ServiceType"],
            amountInNaira: theData["Amount"],
            // amountInCrypto : theData[''] ,
            coinType: theData["CoinType"],
            transactionCode: theData["TransactionID"],
          });
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

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <>
      <NavbarTwo />
      <div style={{ marginTop: 120, marginBottom: 200 }} className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="successPage-box shadow">
              <p className="successPage-text-small">Payment Successful</p>
              <p className="successPage-text-large">
                ₦{transactionData.amountInNaira}
              </p>
              <hr />
              <div className="">Crypto Amount</div>
              <p className="successPage-text-small">
                ₦{transactionData.amountInNaira}
              </p>

              {transactionData.billType == "Electricity" ? (
                <>
                  <hr />
                  <div className="">Electricty Token</div>
                  <p className="successPage-text-small">{"i4o940404949"}</p>
                </>
              ) : null}

              <hr />
              <div className="">TransactionID</div>
              <p className="successPage-text-small">
                {transactionData.transactionCode}
                <CopyToClipboard
                  text={transactionData.transactionCode}
                  onCopy={() => copyItemNotify("Transaction Code")}
                >
                  <i
                  className="transactionPortal-address-icon fa fa-clone"></i>
                </CopyToClipboard>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default SuccessPageDisplay;
