import Head from "next/head";
import PaymentDetails from "../../components/MandoePaySection/paymentDetailsPage";

const PaymentDetailPage = () => {
  return (
    <>
      <Head>
        <title> Paytica Cryptocurrency Payment Processor</title>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta
          name="description"
          content="Mandoe Pay is an online instant automated p2p system for crypto to fiat naira withdrawal"
        />
        <meta name="Mandoe Pay" content="website of Excite Enterprise" />
        <meta name="keywords" content="Cryptocurrency ,Nigeria Fiat Withdraw" />
        <meta name="address" content="Lagos Nigeria" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
        ></link>
        <link
          rel="styleSheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="pagewrap">
        <PaymentDetails />
      </div>
    </>
  );
};

export default PaymentDetailPage;
