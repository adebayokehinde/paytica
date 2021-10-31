import React, { useState } from "react";
import router from 'next/router'
import { motion } from "framer-motion";


const BillsPaymentboxes = () => {
  const [showBillsBox, setShowBillsBox] = useState(true);

  const [billType, setBillType] = useState({
    Airtime: false,
    Electricity: false,
    Data: false,
    Cable: false,
  });

  const handleBillType = (e, billName) => {
    e.preventDefault();
    switch (billName) {
      case "Airtime":
        setBillType({
          ...billType,
          Airtime: false,
          Electricity: false,
          Data: false,
          Cable: false,
        });
        setShowBillsBox(true);
        router.push('/paymentSection/formPages/airtimePage')
        console.log("Is Airime");
        break;
      case "Electricity":
        setBillType({
          ...billType,
          Airtime: false,
          Electricity: true,
          Data: false,
          Cable: false,
        });
        setShowBillsBox(true);
        router.push('/paymentSection/formPages/electricityPage')
        break;
      case "Cable":
        setBillType({
          ...billType,
          Airtime: false,
          Electricity: false,
          Data: false,
          Cable: true,
        });
        setShowBillsBox(true);
        router.push('/paymentSection/formPages/cablePage')
        break;
      case "Data":
        setBillType({
          ...billType,
          Airtime: false,
          Electricity: false,
          Data: true,
          Cable: false,
        });
        setShowBillsBox(true);
        router.push('/paymentSection/formPages/dataBundlePage')
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* --------------- Bills Section ------------------------*/}

      <section>


        {showBillsBox ? (
          <>
            <div className="">
              <div className="utils-box">
                <motion.div
                  className=""
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  whileTap={{ scale: 0.8, rotate: 0, borderRadius: "100%" }}
                >
                  <div
                    onClick={(e) => {
                      handleBillType(e, "Airtime");
                    }}
                    className="shadow utils-box-content ">
                    <div

                      className="utils-image-box"
                    >
                      <i
                        className="utils-icon fa fa-phone"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="utils-text-box">
                      <p className="utils-text">Buy Airtime</p>
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
                    handleBillType(e, "Data");
                  }}
                  className="shadow utils-box-content ">
                  <div
                    onClick={(e) => {
                      handleBillType(e, "Data");
                    }}
                    className="utils-image-box"
                  >
                    <i
                      className="utils-icon fa fa-database"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="utils-text-box">
                    <p className="utils-text">Buy Data </p>
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
                    handleBillType(e, "Electricity");
                  }}
                  className="shadow utils-box-content ">
                  <div
                    onClick={(e) => {
                      handleBillType(e, "Electricity");
                    }}
                    className="utils-image-box"
                  >
                    <i
                      onClick={(e) => {
                        handleBillType(e, "Electricity");
                      }}
                      className="utils-icon fa fa-bolt" aria-hidden="true"></i>
                  </div>
                  <div className="utils-text-box">
                    <p className="utils-text">Buy Power</p>
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
                    handleBillType(e, "Cable");
                  }}
                  className="shadow utils-box-content ">
                  <div
                    onClick={(e) => {
                      handleBillType(e, "Cable");
                    }}
                    className="utils-image-box"
                  >
                    <i
                      className="utils-icon fa fa-television"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="utils-text-box">
                    <p className="utils-text">Buy Cable</p>
                  </div>
                </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default BillsPaymentboxes;
