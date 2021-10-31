import React from "react";
import PeerTable from "./tables/p2c";

export default function PeerComponent() {
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
      <div className="mt-3">
        <PeerTable />
      </div>
    </div>
  );
}
