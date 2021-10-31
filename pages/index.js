import Head from "next/head";
// import styles from "../styles/Home.module.css";
import HomePageSection from "./homePage/home";
import Drift from "react-driftjs";

const theLogo = "https://res.cloudinary.com/djhjipy7n/image/upload/v1629301903/logo_ugbfrm.png"


export default function Home() {
  return (
    <>
      <Head>
        <title> Paytica Cryptocurrency Payment Processor</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href={theLogo} />
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

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8FS168HL0V"
        ></script>
        <link rel="stylesheet"
         href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" 
         integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" 
        crossorigin="anonymous"
         referrerpolicy="no-referrer" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8FS168HL0V');
        `,
          }}
        />
      </Head>
      <div className="pagewrap">
        <Drift appId="x53rthweetwt" />
        <HomePageSection />
      </div>
    </>
  );
}
