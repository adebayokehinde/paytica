import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  airtimeData: null,
  electricityData: null,
  cableData: null,
  dataBundleData: null,
};

const updateAirtimeData = (state, theData) => {
  return updateObject(state, {
    airtimeData: theData,

  });
};

const updateElectricityData = (state, theData) => {
  return updateObject(state, {
    electricityData: theData,
  });
};

const updateCableData = (state, theData) => {
  return updateObject(state, {
    cableData: theData,
  });
};

const updateDataBundleData = (state, theData) => {
  return updateObject(state, {
    dataBundleData: theData,
  });
};

const BillsProviderDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AIRTIME_PROVIDER:
     return updateAirtimeData(state, action.data);
    case actionTypes.GET_ELECTRICITY_PROVIDER:
      return  updateElectricityData(state, action.data);
    case actionTypes.GET_CABLE_PROVIDER:
      return  updateCableData(state, action.data);
    case actionTypes.GET_DATA_PROVIDER:
     return updateDataBundleData(state, action.data);
    default:
      return state;
  }
};

export default BillsProviderDataReducer;
