import React ,{useEffect, useState} from "react";
import axios from 'axios'
import { connect } from "react-redux";
import ReportsDataGridComponent from './header'
import { SemipolarLoading } from "react-loadingg";


import {host} from '../../utils/constants'


const RatesComponent =(props)=> {

  const billsTypeList = [
    {billName : "Airtime"} ,
    {billName : "Electricity"} ,
    {billName : "Databundle"} ,
    {billName : "Cable"} 
  ]

  const [isLoading,setIsLoading] = useState(false)
  const [formInputs, setFormInputs] = useState({
    rateAmount : 0 ,
      billType : "",
  });

  
  const handleFormChange = async (e, field) => {
    switch (field) {
      case "rateAmount":
        setFormInputs({ ...formInputs, rateAmount: e.target.value });
        break;
      case "billType":
        setFormInputs({ ...formInputs, billType: e.target.value });
        break;
      default:
        break;
    }
  };

 const handleSubmit = async(e)=>{
   e.preventDefault()
   setIsLoading(true)
   console.log('THe form ini',formInputs)
   const endpoint = host + "/paytica-reports/change-bills-rate"

   axios.defaults.headers = {
    "Content-Type": "multitype/form-data",
    Authorization: `Token ${props.token}`,
  };

  const fd = new FormData()
  fd.append('rateType',formInputs.billType)
  fd.append('rateAmount',formInputs.rateAmount)
    await axios.post(endpoint,fd)
    .then(res=>{
      if (res.status == 200){
        setIsLoading(false)
        console.log(res.data)
      }
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    if (props.token !== null){

    }
  } ,[props.token])
  return (

    <>
    {
      isLoading ? (
        <>
        <SemipolarLoading/>
        </>
      ) : null
    }
    <div className="container mt-1 mb-5">
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

      <ReportsDataGridComponent/>

      <div className="mt-5">
          <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="form-fitter">
              <form className="form-fitter-two">
                <div className="form-input-flex">

                  <div className="form-input-box">
                  <p className="payBox-heading">
                    Bill Type
                  </p>

                  <p className="payBox-text">
                    What bill would you like to increment  ?
                  </p>
                  <select
                    onChange={(e) => {
                      handleFormChange(e, "billType");
                    }}
                    value={formInputs.billType}
                    className="authForm"
                  >
                    <option name="Select Default" value="">
                      Select Bill Type
                    </option>
                    {billsTypeList.map((i) => (
                      <option name="Service" value={i.billName}>
                        {i.billName}
                      </option>
                    ))}
                  </select>
                </div>
                  <div className="form-input-box">
                    <p className="form-input-text">Rates Amount</p>
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "rateAmount");
                      }}
                      className="authForm"
                      type="text"
                      name="password"
                      required={true}
                      placeholder="Rates amount in percantage"
                      value={formInputs.rateAmount}
                    />
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      type="submit"
                      className="form-button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
      </div>
    </div>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
    isAdmin: state.adminAuth.isAdmin,
    adminUsername : state.adminAuth.username
  };
};

export default connect(mapStateToProps)(RatesComponent);
