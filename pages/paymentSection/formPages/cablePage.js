import React from "react";
import Head from "next/head";
import NavbarTwo from "../../../components/uiComponent/navbar/navbar";
import FooterComponent from "../../../components/uiComponent/footerSection/footerB";
import CablePaymentForm from "../../../components/paymentSecton/paymentForms/CablePaymentForm";

export default function PaymentPage() {
  return (
    <>
      <Head>
        <title> Paytica Cryptocurrency Payment Processor</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
        ></link>
        <link
          rel="apple-touch-icon"
          href="https://cryptoapp-getti.s3.eu-west-2.amazonaws.com/Paytica+Images/paytica-logo.png"
        />
        <link
          rel="styleSheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <div className="pagewrap">
        <NavbarTwo />
        <div className="container page-margin">
          <div className="">
            <p className="text-center payment-header-text">
              Purchase Cable Subsciption
            </p>
          </div>
          <div className="m-3">
            <CablePaymentForm />
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
