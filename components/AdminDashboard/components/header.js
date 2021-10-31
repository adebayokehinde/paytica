import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { host } from "../../utils/constants";

const ReportsDataGridComponent = (props) => {


  const [billsSummaryCount,setBillsSummaryCount] = useState(0)
  const [incomeSummaryCount ,setIncomeSummaryCount] =  useState(0)
  const [commisionRate, setComssionRate] = useState(0)

  const getIncomeSummary = async () => {
    const endpoint = host + "/paytica-reports/income-statement";

    axios.defaults.headers = {
      "Content-Type": "multitype/form-data",
      Authorization: `Token ${props.token}`,
    };
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        let incomeData = res.data["data"];

        let incomeArray = [];
        incomeData.map((i) => {
          if (
            parseFloat(i["Amount"]) !== null ||
            parseFloat(i["Amount"]) !== undefined
          ) {
            incomeArray.push(parseFloat(i["Amount"]));
          }
        });

        console.log(incomeArray);
        const summary = incomeArray.reduce((a, b) => a + b, 0);
        console.log('tHE sUMMARY',summary);

        setIncomeSummaryCount(Math.round(summary))
      
      }
    });
  };

  const getBillsCount = async () => {
    const endpoint = host + "/paytica-reports/anonymous-payment-records";
    axios.defaults.headers = {
      "Content-Type": "multitype/form-data",
      Authorization: `Token ${props.token}`,
    };
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        console.log(res.data['data'])
        setBillsSummaryCount(res.data['data'].length)
      }
    });
  };

  const getComissionRate = async()=>{
    const endpoint = host + "/paytica-reports/get-comission-rates"
    axios.defaults.headers = {
      "Content-Type": "multitype/form-data",
      Authorization: `Token ${props.token}`,
    };
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        console.log(res.data)
        // const comissionData = res.data['data'].AirtimeCommission
        setComssionRate(4)
      }
    });

  }

  useEffect( async() => {
    if (props.token !== null) {
     await getIncomeSummary();
     await  getBillsCount()
      await getComissionRate()


    }
  }, [props.token]);

  return (
    <>
      <div className="activity-cards">
        <div className="activity-cards-items">
          <div className="activity-cards-info-flex">
            {/* <i
              className="mt-1 activity-cards-icon fa fa-bullseye"
              aria-hidden="true"
            ></i> */}
            <p className="activity-cards-text-small">Bills</p>
          </div>

          <p className="activity-cards-text-large">
            +{billsSummaryCount}
          </p>
        </div>

        <div className="activity-cards-items">
          <div className="activity-cards-info-flex">
            {/* <i
              className="mt-1 activity-cards-icon fa fa-bullseye"
              aria-hidden="true"
            ></i> */}
            <p className="activity-cards-text-small">
              Income
            </p>
          </div>
          <p className="activity-cards-text-large">
          ₦{incomeSummaryCount}
          </p>
        </div>

        <div className="activity-cards-items">
          <div className="activity-cards-info-flex">
            {/* <i
              className="mt-1 activity-cards-icon fa fa-bullseye"
              aria-hidden="true"
            ></i> */}
            <p className="activity-cards-text-small">
          Profit  Commission
            </p>
          </div>
          <p className="activity-cards-text-large">
            {commisionRate}%
          </p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
    isAdmin: state.adminAuth.isAdmin,
    adminUsername: state.adminAuth.username,
  };
};

export default connect(mapStateToProps)(ReportsDataGridComponent);
