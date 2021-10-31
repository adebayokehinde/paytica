import React ,{useState ,useEffect} from "react";
import ReportsDataGridComponent from "./components/header";
import router from "next/router";
import { connect } from "react-redux";
import Router from 'next/router'
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


const AdminDashboard = (props) => {

  useEffect(()=>{
    if (props.token !== null){

    }

    if (props.token == "" || props.token == null){
      router.push('/admin/auth/login')
    }
     
  }, [props.token])

  return (
    <section className="container">
      <div className="">
        <div className="mr-auto pb-3 pt-3 flex-row">
          <span className="profile-box">
            <img
              className="profile-img"
              src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
            />
          </span>
          <p className="">Hi, {props.adminUsername}</p>
        </div>
      </div>
      <ReportsDataGridComponent />

      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="report-board mt-5 mb-5">
            <p
              className="text-left reportSection-content-text-large"
              
            >
              Permission Control{" "}
            </p>

            <div>
              <div
                onClick={() => {
                  router.push("/admin/actions/rates");
                }}
                className="report-link flex-row"
              >
                <span>
                  <i class="fa fa-credit-card" aria-hidden="true"></i>
                </span>
                <p>Rates</p>
              </div>
              {/* <div
                onClick={() => {
                  router.push("/admin/actions/transactions");
                }}
                className="report-link flex-row"
              >
                <span>
                  <i class="fa fa-bar-chart" aria-hidden="true"></i>
                </span>
                <p>Transaction costs</p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="report-board mt-5">
            <p
              className="text-left reportSection-content-text-large"
            >
              Reports{" "}
            </p>

            <div>
              <div
                onClick={() => {
                  router.push("/admin/reports/bills");
                }}
                className="report-link flex-row"
              >
                <span>
                  <i class="fa fa-pie-chart" aria-hidden="true"></i>
                </span>
                <p>Bill payments reports</p>
              </div>
              {/* <div
                onClick={() => {
                  router.push("/admin/reports/peer");
                }}
                className="report-link flex-row"
              >
                <span>
                  <i class="fa fa-btc" aria-hidden="true"></i>
                </span>
                <p>P2C Reports</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
    isAdmin: state.adminAuth.isAdmin,
    adminUsername : state.adminAuth.username
  };
};

export default connect(mapStateToProps)(AdminDashboard);
