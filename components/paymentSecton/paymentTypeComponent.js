import React, { useState } from "react";
import BillsPaymentboxes from "./paybox";
import MandoePaymentFormComponent from "../MandoePaySection/paymentForm";
import router from "next/router";
 
import { motion } from "framer-motion";


export default function PayTypeboxes() {
  const [showBox, setShowBox] = useState(true);

  const [selectType, setSelectType] = useState({
    Bills: false,
    P2P: false,
  });

  const [previousPageType, setPreviousPageType] = useState({
    paymentTypeDefaultPage: true,
    billsDefaultPage: false,
    AutomatedP2PDefaultPage: false,
  });

  const handlePreviousPageSelection = async (e, field, boolType) => {
    e.preventDefault();
    switch (field) {
      case "PaymentPageDefualt":
        console.log("Default Page", boolType);
        // setShowBox(!boolType);
        setPreviousPageType({
          ...previousPageType,
          paymentTypeDefaultPage: boolType,
          AutomatedP2PDefaultPage: !boolType,
        });
        break;
      case "BillsDefault":
        setPreviousPageType({
          ...previousPageType,
          billsDefaultPage: boolType,
          paymentTypeDefaultPage: !boolType,
        });
        break;
      case "Automatedp2pDefualt":
        setPreviousPageType({
          ...previousPageType,
          AutomatedP2PDefaultPage: boolType,
          paymentTypeDefaultPage: !boolType,
        });
        break;
      default:
        break;
    }
  };

  const [paymentType, setPaymentType] = useState({
    billsPaymentType: false,
    p2pPaymentType: false,
  });

  const handleType = async (e, field, boolType) => {
    e.preventDefault();
    switch (field) {
      case "TheBillsPaymentType":
        console.log("Switching to Bills Payment", boolType);
        setPaymentType({ ...paymentType, billsPaymentType: boolType });
        setPreviousPageType({
          ...previousPageType,
          billsDefaultPage: boolType,
          paymentTypeDefaultPage: !boolType,
        });
        break;
      case "AutomatedP2PPaymentType":
        console.log("Switching to P2P Payment", boolType);
        // setPaymentType({ ...paymentType, p2pPaymentType: boolType });
        // setPreviousPageType({
        //   ...previousPageType,
        //   AutomatedP2PDefaultPage: boolType,
        //   paymentTypeDefaultPage: !boolType,
        // });
        router.push(
          "/MandoePaySection/formPage/peersPaymentPage",
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section>
        {previousPageType.billsDefaultPage ? (
          <>
            <div>
              <span
                onClick={(e) => {
                  handlePreviousPageSelection(e, "BillsDefault", false);
                }}
                className=" shadow utils-back-button mb-3 mt-3"
              >
                <i className=" utils-back-button-icon fa fa-arrow-left"></i>
              </span>
            </div>

            {paymentType.billsPaymentType ? (
              <>
                <BillsPaymentboxes />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        {previousPageType.AutomatedP2PDefaultPage ? (
          <>
            <div>
              <span
                onClick={(e) => {
                  handlePreviousPageSelection(e, "Automatedp2pDefualt", false);
                }}
                className=" shadow utils-back-button mb-3 mt-3"
              >
                {/* <i
                  className="utils-back-button-icon fa fa-arrow-left"
                ></i> */}
              </span>
            </div>

            {paymentType.p2pPaymentType ? (
              <>
                <MandoePaymentFormComponent />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {previousPageType.paymentTypeDefaultPage ? (
          <>
            <div className="utils-box mt-3">
            <motion.div
                  className=""
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  whileTap={{ scale: 0.8, rotate: 0, borderRadius: "100%" }}
                >
              <div
                onClick={(e) => {
                  handleType(e, "TheBillsPaymentType", true);
                }}
                className="shadow utils-box-content "
              >
                <div className="utils-image-box">
                  <i
                    className="utils-icon fa fa-credit-card"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="utils-text-box">
                  <p className="utils-text">Bills </p>
                </div>
              </div> 
              </motion.div>

              <motion.div
                  className=""
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  whileTap={{ scale: 0.8, rotate: 0, borderRadius: "100%" }}
                >
              <div
                onClick={(e) => {
                  handleType(e, "AutomatedP2PPaymentType", true);
                }}
                className="shadow utils-box-content "
              >
                <div className="utils-image-box">
                  <i
                    className="utils-icon fa fa-exchange"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="utils-text-box">
                  <p className="utils-text">P2C </p>
                </div>
              </div>
              </motion.div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
