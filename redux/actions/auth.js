import axios from "axios";
import { message } from "antd";
import * as actionTypes from "./actionTypes";

import {host} from "../constants"


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user,
  };
};

export const authFail = (error) => {
  message.error("Invalid Username or password", 10);
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  //this.props.history.push('login')
  // message.success('Logout successfull')
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const loginEndpoint = host + `/auth/login/`;
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
          const user = {
            token: res.data.token,
            username: res.data.username,
            userID: res.data.userID,
            //is_buyer: res.data.user_type.is_buyer,
            //is_seller: res.data.user_type.is_seller,
            expirationDate: new Date(new Date().getTime() + 36000 * 10000),
          };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

const signUpEndpoint = host + `/auth/register`;

export const authSignup = (
  username,
  email,
  password1,
  password2
  // is_buyer
) => {
  return (dispatch) => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password1,
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
        // const user = {
        //   token: res.data.key,
        //   username,
        //   userId: res.data.userID,
        // //  is_buyer,
        // //  is_seller: !is_buyer,
        //   expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        // };
        // localStorage.setItem("user", JSON.stringify(user));
        // dispatch(authSuccess(user));
        // //dispatch(fetchCart())
        // dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        message.error("Account Creation  Failed");
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
