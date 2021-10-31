import React from "react";
import { connect } from "react-redux";
import BillsTable from "./tables/bills";
import ReportsDataGridComponent from './header'

const BillsComponent = (props)=> {
  return (
    <div className="container mt-1 ">
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
      <div className="mt-3">
        <BillsTable />
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
    isAdmin: state.adminAuth.isAdmin,
    adminUsername: state.adminAuth.username,
  };
};

export default connect(mapStateToProps)(BillsComponent);
