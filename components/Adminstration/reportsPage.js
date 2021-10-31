import React, { useState, useEffect } from "react";
import axios from "axios";
// import MuiVirtualizedTable from './Tables/incomeReports'

const AdminReportComponent = () => {
  const [salesData, setSalesData] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="reportSection">
              <div className="reportSection-grid">
                <div className="reportSection-content">
                    <span className="reportSection-content-icon-section">
                    <i
                className="intro-card-icon fa fa-bullseye"
                aria-hidden="true"
              ></i>
                    <p className="reportSection-content-text-small">
                    Amount Earned
                  </p>
                        </span>
                  
                  <p className="reportSection-content-text-large">140440404</p>
                </div>

                <div className="reportSection-content">
                  <p className="reportSection-content-text-small">
                    Amount Earned
                  </p>
                  <p className="reportSection-content-text-large">140440404</p>
                </div>


                <div className="reportSection-content">
                  <p className="reportSection-content-text-small">
                    Amount Earned
                  </p>
                  <p className="reportSection-content-text-large">140440404</p>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <div className="container">
          {/* <MuiVirtualizedTable/> */}
      </div>
    </>
  );
};
export default AdminReportComponent;
