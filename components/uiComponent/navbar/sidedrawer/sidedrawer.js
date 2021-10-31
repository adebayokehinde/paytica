import React, { useEffect, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";

const fullLogo = "https://res.cloudinary.com/djhjipy7n/image/upload/v1629301901/logo_text_tkvppx.png"

function SideDrawer(props) {
  let drawerClasses = "side-drawer2";
  if (props.show) {
    drawerClasses = "side-drawer2 open";
  }

  return (
    <nav className={drawerClasses}>
      <div className="m-nav">
        <div className="container">
          <div className="pt-2 pb-2">
            <Link href="/">
              <img
                className="Newlogo"
                style={{ width: "120px" }}
                alt="logo"
                src={fullLogo}
              />
            </Link>
          </div>
          <ul className="m-nav-order ">
            <li className="navbar-flex-list">
              <p className="navbar-flex-list-text">
                <i className="fa fa-angle-right mr-2"></i>
                About Us
              </p>
            </li>

            <li className="navbar-flex-list">
              <p className="navbar-flex-list-text">
                <i className="fa fa-angle-right mr-2"></i>
                Contact Us
              </p>
            </li>
          </ul>
          {/* <div className="m-nav-others">
       
            <Link href="/login">
              <button className="form-button">Login</button>
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userID: state.auth.userID,
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(SideDrawer);
