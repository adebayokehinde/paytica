import axios from "axios";
import * as actionTypes from "./actionTypes";
import { host } from "../constants";

const getProviderCall = (billType, data) => {
  switch (billType) {
    case "airtime":
      return {
        type: actionTypes.GET_AIRTIME_PROVIDER,
        data,
      };
    case "electricity":
      return {
        type: actionTypes.GET_ELECTRICITY_PROVIDER,
        data,
      };
    case "cable":
      return {
        type: actionTypes.GET_CABLE_PROVIDER,
        data,
      };
    case "data":
      return {
        type: actionTypes.GET_DATA_PROVIDER,
        data,
      };
  }
};

export const getAirtimeProviders = () => {
  const endpoint = host + "/baxiRoutes/fetch-aritime-providers/";

  return async (dispatch) => {
    const dttata = await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        return res.data.providers;
      }
      return [];
    });
    dispatch(getProviderCall("airtime", dttata));
  };
};

export const getCableProviders = () => {
  const endpoint = host + "/baxiRoutes/get-cable-providers";

  return async (dispatch) => {
    const data = await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        return res.data["providers"];
      }
      return [];
    });
    dispatch(getProviderCall("cable", data));
  };
};

export const getDataProviders = () => {
  const endpoint = host + "/baxiRoutes/fetch-data-bundles/";

  return  async (dispatch) => {
    const data = await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        return res.data["providers"];
      }
      return [];
    });
    dispatch(getProviderCall("data", data));
  };
};

export const getElectricityProvider = () => {
  const endpoint = host + "/baxiRoutes/fetch-electricity-providers/";

  return async (dispatch) => {
    const data = await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        return res.data["providers"];
      }
      return [];
    });
    dispatch(getProviderCall("electricity", data));
  };
};
