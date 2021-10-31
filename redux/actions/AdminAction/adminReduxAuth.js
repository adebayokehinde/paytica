import axios from "axios";
import { message } from "antd";
import * as actionTypes from "./actionTypes";

import { host } from "../../constants";


// ---------------- ///////////////

export const authStart = () => {
  return {
    type: actionTypes.ADMIN_AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.ADMIN_AUTH_SUCCESS,
    user, 
  };
};

export const authFail = (error) => {
  // message.error("Invalid Username or password", 10);
  return {
    type: actionTypes.ADMIN_AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
  return {
    type: actionTypes.ADMIN_AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const loginEndpoint = host + `/paytica-admin/admin-login`;
export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(loginEndpoint, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status == 200) {
          if (typeof window !== "undefined") {
            const user = {
              token: res.data.adminAuthData.token,
              username: res.data.adminAuthData.username,
              userID: res.data.adminAuthData.userID,
              email : res.data.adminAuthData.email ,
              isAdmin: res.data.adminAuthData.isAdmin,
              expirationDate: new Date(new Date().getTime() + 36000 * 10000),
            };
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
          }
        }
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

const signUpEndpoint = host + `/auth/register`;

export const authSignup = (username, email, password, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password,
      password2,
      //    is_buyer,
      //  is_seller: !is_buyer
    };
    axios
      .post(signUpEndpoint, user)
      .then((res) => {
        if (res.status == 200) {
          message.success("Account Creation  Successfully");
          dispatch(authSuccess(user));
        }

        if (typeof window !== "undefined") {
          const user = {
            token: res.data.key,
            username,
            userId: res.data.userID,
            isAdmin: res.data.isAdmin,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }
      })
      .catch((err) => {
        message.error("Account Creation  Failed");
        dispatch(authFail(err));
      });
  };
};

export const adminAuthCheckLoginState = () => {
  return (dispatch) => {
    let user = null;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));

      if (user === undefined || user === null) {
        dispatch(logout());
        // router.push('/admin/auth/login')
      } else {
        const expirationDate = new Date(user.expirationDate);
        if (expirationDate <= new Date()) {
          // router.push('/admin/auth/login')
          dispatch(logout());
        } else {
          dispatch(authSuccess(user));
       
        }
      }  
      }
  };
};
