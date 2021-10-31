import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BillsProcess = () => {
  return (
    <>
      <div 
      className="col-sm-12 col-lg-6 col-md-6 ml-auto sel-box-transition p-5 ">
        <div className="flex-r">
          <span className="p-r-5">
            <h1>1</h1>
          </span>
          <span>
            <h6>Buy Bill</h6>
            <p>
              Purchase fractions to collect and own a percentage of your
              favorite NFTs
            </p>
          </span>
        </div>
        <div className="flex-r">
          <span className="p-r-5">
            <h1>2</h1>
          </span>
          <span>
            <h6>VOTE</h6>
            <p>
              Purchase fractions to collect and own a percentage of your
              favorite NFTs
            </p>
          </span>
        </div>
        <div className="flex-r">
          <span className="p-r-5">
            <h1>3</h1>
          </span>
          <span>
            <h6>DECIDE TO TRANSFER OR HOLD</h6>
            <p>
              Purchase fractions to collect and own a percentage of your
              favorite NFTs
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

const P2CProcess = () => {
  return (
    <>
      <div className="col-sm-12 col-lg-6 col-md-6 ml-auto sel-box-transition p-5  ">
        <div className="flex-r">
          <span className="p-r-5">
            <h1>1</h1>
          </span>
          <span>
            <h6>Buy P2P</h6>
            <p>
              Purchase fractions to collect and own a percentage of your
              favorite NFTs
            </p>
          </span>
        </div>
        <div className="flex-r">
          <span className="p-r-5">
            <h1>2</h1>
          </span>
          <span>
            <h6>VOTE</h6>
            <p>
              Purchase fractions to collect and own a percentage of your
              favorite NFTs
            </p>
          </span>
        </div>
        <div className="flex-r">
          <span className="p-r-5">
            <h1>3</h1>
          </span>
          <span>
            <h6>DECIDE TO TRANSFER OR HOLD</h6>
            <p>
              Purchase fractions to collect and own a percentage of your
              favorite NFTs
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

const Content = () => {
  const [isBills, setIsBills] = useState(true);
  const [isPeer, setIsPeer] = useState(false);

  const divSelector = (divType) => {
    switch (divType) {
      case "Peer2Contractor":
        setIsPeer(true);
        setIsBills(false);
        console.log("is Contractor");
        break;
      case "Bills":
        setIsBills(true);
        setIsPeer(false);
        console.log("IS BILLS");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className=" mb-5">
        <section className="container">
          <div className="col-lg-6 col-sm-12">
            <h1 className="heading-a">Why Paytica</h1>
            Paytica delivers a unique way to unlock NFT liquidity and provides
            community access to owning parts of iconic and historic NFTs.
          </div>

          <div className="mt-5 page-card-grid">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="page-card flex-c   "
            >
              <span className="icon flex-c mb-5 mt-5">
                <img src="https://img.icons8.com/ios-filled/50/000000/pie-chart.png" />
              </span>

              <span className="text">
                <h3 className="text-center">Accessibility</h3>
                <p className="text-center">
                  Become a partial owner of collectable NFTs you otherwise could
                  not afford
                </p>
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="page-card flex-c  "
            >
              <span className="icon flex-c mb-5 mt-5">
                <img src="https://img.icons8.com/ios-glyphs/50/000000/bank.png" />{" "}
              </span>

              <span className="text">
                <h3 className="text-center">Accessibility</h3>
                <p className="text-center">
                  Become a partial owner of collectable NFTs you otherwise could
                  not afford
                </p>
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="page-card flex-c  "
            >
              <span className="icon flex-c mb-5 mt-5">
                <img src="https://img.icons8.com/ios-filled/50/000000/bitcoin.png" />{" "}
              </span>

              <span className="text">
                <h3 className="text-center">Accessibility</h3>
                <p className="text-center">
                  Become a partial owner of collectable NFTs you otherwise could
                  not afford
                </p>
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="page-card flex-c  "
            >
              <span className="icon flex-c mb-5 mt-5">
                <img src="https://img.icons8.com/ios/50/000000/stocks--v1.png" />{" "}
              </span>

              <span className="text">
                <h3 className="text-center">Accessibility</h3>
                <p className="text-center">
                  Become a partial owner of collectable NFTs you otherwise could
                  not afford
                </p>
              </span>
            </motion.div>
          </div>

          <div className="flex-r m-5">
            {/* <span className="">
              <button className="page-button">Read Faq</button>
            </span> */}
            {/* <span>
              <button className="page-button">How it works</button>
            </span> */}
          </div>
        </section>
      </div>

      <section className=" mb-5">
        <div className="container ">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-md-6 ">
              <span>
                <h1>How it works</h1>
                <p>
                  Built by NFT collectors, Fractional enables both NFT market
                  value discovery and NFT tokenization which unlocks collectable
                  access for smaller collectors and synergies with other DeFi
                  primitives.
                </p>
              </span>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                className={
                  isBills ? "flex-r sel-box sel-box-active" : "flex-r sel-box "
                }
                onClick={() => {
                  divSelector("Bills");
                }}
              >
                <span className="sel-box-icon">
                  {/* <img src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/40/000000/external-cube-graphic-design-vitaliy-gorbachev-fill-vitaly-gorbachev.png" /> */}
                  <i className="utils-icon fa fa-credit-card"></i>
                </span>
                <h5 style={{ alignSelf: "center" }}>Bill's Payment</h5>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                className={
                  isPeer ? "flex-r sel-box sel-box-active" : "flex-r sel-box "
                }
                onClick={() => {
                  divSelector("Peer2Contractor");
                }}
              >
                <span className="sel-box-icon">
                  {/* <img src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/40/000000/external-cube-graphic-design-vitaliy-gorbachev-fill-vitaly-gorbachev.png" /> */}
               <i className="utils-icon fa fa-exchange"></i>
                </span>
                <h5 style={{ alignSelf: "center" }}>Peer to Contractor</h5>
              </motion.div>
            </div>

            <>
              {isBills ? <BillsProcess /> : null}

              {isPeer ? <P2CProcess /> : null}
            </>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
