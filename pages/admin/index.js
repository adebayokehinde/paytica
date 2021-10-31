import Head from "next/head";
import AdminDashboard from "../../components/AdminDashboard/main";
import ThirdLayout from '../../components/AdminDashboard/components/proSidebar/layout'


const AdminReportPage = () => {
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
      <div className="">
        <ThirdLayout>
        <AdminDashboard />
        </ThirdLayout>

      </div>
    </>
  );
};

export default AdminReportPage;
