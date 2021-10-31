import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authLogin } from '../../../redux/actions/auth'
import router from "next/router";
import NavbarTwo from "../uiComponent/navbar/navbar";


const LoginComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });

  const handleFormData = (e, field) => {
    switch (field) {
      case "username":
        setFormInputs({ ...formInputs, username: e.target.value });
        break;
      case "password":
        setFormInputs({ ...formInputs, password: e.target.value });
        break;
    default:
        break;
    }
    return true;
  };

  const handleLogin = (e)=>{
      e.preventDefault()
      const username = formInputs.username
      const password = formInputs.password
      props.login(username, password)
  }


  useEffect(() => {
    if (props.token !== null) {
      router.push("/admin");
    }
  }, [props.token]);

  return (
    <>
    <NavbarTwo/>
      <div style={{ marginTop: 150, marginBottom: 150 }} className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="form-fitter">
              <form className="">
                <div>
                  <p style={{ textAlign: "center" }} className="heading-text">
                    Welcome Back Admin
                  </p>
                  <p className="heading-text-2">Log in to the dashboard.</p>
                </div>
                <div className="form-input-flex">
                  <div className="form-input-box">
                    <p className="form-input-text">Username</p>
                    <input
                      onChange={(e) => {
                        handleFormData(e, "username");
                      }}
                      className="authForm"
                      type="text"
                      name="username"
                    required={true}
                      value={formInputs.username}
                    />
                  </div>
                  <div className="form-input-box">
                    <p className="form-input-text">Password</p>
                    <input
                      onChange={(e) => {
                        handleFormData(e, "password");
                      }}
                      className="authForm"
                      type="password"
                      name="password"
                      required={true}
                      value={formInputs.password}
                    />
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        handleLogin(e);
                      }}
                      type="submit"
                      className="form-button"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
  
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
