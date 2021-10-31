import React from "react";
import TransactionsTable from "./tables/transactions";

export default function TransactionsComponent() {
  return (
    <div className="container mt-1">
      <div className="">
        <div className="mr-auto pb-3 pt-3 flex-row">
          <span className="profile-box">
            <img
              className="profile-img"
              src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
            />
          </span>
          <p className="">Hi, Kehinde</p>
        </div>
      </div>
      <div className="activity-cards">
        <div className="activity-cards-items">
          <i
            className=" activity-cards-icon fa fa-bullseye"
            aria-hidden="true"
          ></i>

          <p className="activity-cards-text">Bills</p>
        </div>

        <div className="activity-cards-items">
          <i
            className=" activity-cards-icon fa fa-bullseye"
            aria-hidden="true"
          ></i>
          <p className="activity-cards-text">Income</p>
        </div>

        <div className="activity-cards-items">
          <i
            className=" activity-cards-icon fa fa-bullseye"
            aria-hidden="true"
          ></i>
          <p className="activity-cards-text">Commission</p>
        </div>
      </div>
      <div className="mt-3">
        <TransactionsTable />
      </div>
    </div>
  );
}
