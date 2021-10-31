import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
const fullLogo =
  "https://res.cloudinary.com/djhjipy7n/image/upload/v1629301901/logo_text_tkvppx.png";

import DrawerToggleButton from "../sidedrawer/drawertogglebutton";
import { host } from "../../../utils/constants";
import { useRouter } from "next/router";

// import Logo from "./EnterpriseLogo.png";
// import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";

export default function Toolbar({ drawerClickHandler, children, isAuth }) {
  const history = useRouter();

  const [formInputs, setFormInputs] = useState({
    orderIdField: "",
  });

  const handleFormChange = async (e, field) => {
    switch (field) {
      case "orderIdField":
        setFormInputs({
          ...formInputs,
          orderIdField: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const endpoint = host + "/AnonymousPayRoute/track-order";
    axios
      .get(endpoint, {
        params: {
          orderID: formInputs.orderIdField,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          history.push("/paymentSection/paymentDetails");
        }
      });
  };

  return (
    <>
      <header className="toolbar">
        <nav className="toolbar__navigation container">
          <div className="toolbar__logo">
            <Link href="/">
              <img
                className="Newlogo"
                style={{ width: "120px" }}
                src={fullLogo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li className="nav-it">
                <form
                  onSubmit={(e) => {
                    submitData(e);
                  }}
                >
                  {/* <div className="form-input-box">
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "orderIdField");
                      }}
                      className="nav-bar-form-input"
                      type="text"
                      name="orderIdField"
                      value={formInputs.orderIdField}
                      placeholder="Track Order"
                    />
                  </div> */}
                </form>
              </li>
              <li className="nav-it">
                <Link href="/events/eventlistitems">
                  Events
                </Link>
              </li>
              <li className="nav-it ">
                <Link href="#">
                  About
                </Link>
              </li>
           

              {isAuth ? (
                <>
                  <li className="">
                    <Link href="/dashboard">
                      <button className="nav-butt">My Wallet</button>
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={drawerClickHandler} />
          </div>
        </nav>
      </header>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     token: state.auth.token,
//     isAuth: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(actions.logout()),
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Toolbar)
// );
