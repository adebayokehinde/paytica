import React, { useState } from "react";
import FooterC from "../uiComponent/footerSection/footerc";
import NavbarTwo from "../uiComponent/navbar/navbar";
import PayTypeboxes from "../paymentSecton/paymentTypeComponent";

import Router from 'next/router'
import Content from "./sections/contents";

import Nprogress from 'nprogress'
Router.onRouteChangeStart = url=>{
  Nprogress.start()
}

Router.onRouteChangeComplete =()=>{
  Nprogress.done()
}

Router.onRouteChangeError = ()=>{
  Nprogress.done()
}

const cutSection ="https://res.cloudinary.com/blood4bones/image/upload/v1632660770/Intro_Image_uysvja.png"

const HomePageComponent = () => {
  return (
    <>
      <NavbarTwo />

      <section className="container">
        <div className="row proper-padding ">

          <div className="col-lg-8 col-sm-12 some-bg">
            <div className="home-box-card">
              <h1 className="home-heading ">
                <span className="heading-a">Bills payment &amp; </span>
                <br />
                <span className="heading-b">cryptocurrency</span> <br />
                <span className="heading-a"> p2c trade for Nigeria</span>
              </h1>
              <p className="home-heading-text">
                <span className="heading-a">
                  {" "}
                  Use ETH, BTC, XRP &amp; XLM to Pay Bills, <br /> buy airtime
                  and purchase data.{" "}
                </span>
              </p>
            </div>
          </div>


          <div className="col-lg-4 col-md-12 col-sm-12 ">
            
            <PayTypeboxes />
            
          </div>
        </div>
      </section>

      <Content />

      <section className="container proper-padding-c mt-5 sec-bg">

        <span>
          <h1
            className="text-center"
            style={{ color: "#f5a623", fontSize: "1.5rem" }}
          >
            Make payments in these simple steps
          </h1>
        </span>

        <div className="row ">
          <div className="col-sm-12 col-lg-4 mt-5">
            <div className="intro-card flex-col-center">
              <span></span>

              <i
                className="intro-card-icon fa fa-bullseye"
                aria-hidden="true"
              ></i>

              <span>
                <h1 className="text-center">Click on Bill</h1>
              </span>
              <span>
                <p className="text-center">
                  Click on the find contractor button at the top to find a
                  contractor, then enter your deposit information
                </p>
              </span>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mt-5">
            <div className="intro-card flex-col-center">
              <i
                className="intro-card-icon fa fa-credit-card-altfa fa-credit-card-alt"
                aria-hidden="true"
              ></i>

              <span></span>
              <span>
                <h1 className="text-center">Input your Amount</h1>
              </span>
              <span>
                <p className="text-center">
                  Click on the find contractor button at the top to find a
                  contractor, then enter your deposit information
                </p>
              </span>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mt-5">
            <div className="intro-card flex-col-center">
              <i
                className="intro-card-icon fa fa-qrcode"
                aria-hidden="true"
              ></i>

              <span></span>
              <span>
                <h1 className="text-center">Scan qr & make payment</h1>
              </span>
              <span>
                <p className="text-center">
                  Click on the find contractor button at the top to find a
                  contractor, then enter your deposit information
                </p>
              </span>
            </div>
          </div>
        </div>
      </section> 

       <section className="container ">
        <div className="row mt-5 mb-5">
          <div className="col-lg-6 col-sm-12">

            <div className="successPage-box">
              <div className="succesPage-image-section">
                <img src={cutSection} className="successPage-image-file" />
              </div>
            </div>

          </div>

          <div className="col-lg-6 col-sm-12">

            <div className="flex-col">
              <span className="intro-text">
                <p className="text-dark">Bills Payment</p>
              </span>
              <span>
                <h2 className="text-dark">Make Payments</h2>
              </span>
              <span>
                <p>
                  Payments just became simpler with Paytica. Make instant
                  payments directly from your Crypto wallet
                </p>
              </span>
              <span>
                <p className="about-link">Learn more.</p>
              </span>
            </div>

          </div>
        </div>
      </section>

      <section className="container ">
        <div className="row mt-5 mb-5">
          <div className="col-lg-6 col-sm-12">

            <div className="flex-col">
              <span className="intro-text">
                <p className="text-dark">P2C</p>
              </span>
              <span>
                <h2 className="text-dark">Automated Peer to Contractor</h2>
              </span>
              <span>
                <p>
                  Make Instant, Safe and Automated Peer to Contractor Payment
                  with Paytica
                  <br />
                  to Exchange Crypto to Naira in less than a Minute
                </p>
              </span>
              <span>
                <p className="about-link">Learn more.</p>
              </span>
            </div>

          </div>

          <div className="col-lg-6 col-sm-12">

            <div className="successPage-box">
              <div className="succesPage-image-section">
                <img src={cutSection} className="successPage-image-file" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="container">
          <CustomizedAccordions/>
        </div>
      </section> */}

      <FooterC />
    
    </>
  );
};

export default HomePageComponent;
