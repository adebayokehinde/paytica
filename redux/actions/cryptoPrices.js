import axios from "axios";
import * as actionTypes from "./actionTypes";

import { host } from "../constants";

// init the Reducers
export const getLivePrices = (data) => {
  return {
    type: actionTypes.GET_LIVE_PRICES,
    data,
  };
};

export const getPayticaUSDtoNairaRates = () => {
  return {
    type: actionTypes.GET_PAYTICA_USD_RATES,
    data,
  };
};

export const getLivePricesinDollarReduxInit = (data) => {
  return {
    type: actionTypes.GET_LIVE_CRYPTO_PRICES_USD,
    data,
  };
};

const payticaNairaRate = async () => {
  const endpoint = host + "/paytica-reports/get-dollar-rates";
  const nairaRate = await axios.get(endpoint).then((res) => {
    if (res.status == 200) {
      // getPayticaUSDtoNairaRates(res.data["rates"].DollarRates)
      return res.data["rates"].DollarRates;
    } else {
      return false;
    }
  });

  return nairaRate;
};

const convertCryptoPairToNaira = async (Pair) => {
  // Convert to Naira
  const LatestNairaRate = await payticaNairaRate();
  const endpoint = host + "/AnonymousPayRoute/get-tradingpair";
  const PairClosing = await axios
    .get(endpoint, {
      params: {
        tradingPair: Pair,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        return res.data["ClosingPrice"];
      } else {
        return 0;
      }
    });
  let convertPairToNaira = Math.round(PairClosing * LatestNairaRate);
  return convertPairToNaira;
};

const convertCryptoPairToDollar = async (Pair) => {
  const endpoint = host + "/AnonymousPayRoute/get-tradingpair";
  const PairClosingPrice = await axios
    .get(endpoint, {
      params: {
        tradingPair: Pair,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        return res.data["ClosingPrice"];
      } else {
        return 0;
      }
    });

  return parseFloat(PairClosingPrice);
};

const CoinsPairContext = {
  Ethereum: "ETHUSDT",
  Bitcoin: "BTCUSDT",
  Lumen: "XLMUSDT",
  Ripple: "XRPUSDT",
  BinanceCoin: "BNBUSDT",
  TetherUSDT: "BUSDUSDT",
  BinanceUSD: "BUSDUSDT",
};

export const GetCryptoPrices = () => {
  let tradingPairsObject = {
    Ethereum: 0,
    Bitcoin: 0,
    Lumen: 0,
    Ripple: 0,
    BinanceCoin: 0,
    TetherUSDT: 0,
    BinanceUSD: 0,
  };
  return async (dispatch) => {
    for (const [key, value] of Object.entries(CoinsPairContext)) {
      if (key === "Ethereum") {
        tradingPairsObject["Ethereum"] = await convertCryptoPairToNaira(value);
      }

      if (key === "Bitcoin") {
        tradingPairsObject["Bitcoin"] = await convertCryptoPairToNaira(value);
      }

      if (key === "Lumen") {
        tradingPairsObject["Lumen"] = await convertCryptoPairToNaira(value);
      }

      if (key === "Ripple") {
        tradingPairsObject["Ripple"] = await convertCryptoPairToNaira(value);
      }

      if (key == "BinanceCoin") {
        tradingPairsObject["BinanceCoin"] = await convertCryptoPairToNaira(
          value
        );
      }

      if (key == "TetherUSDT") {
        tradingPairsObject["TetherUSDT"] = await convertCryptoPairToDollar(
          value
        );
      }

      if (key == "BinanceUSD") {
        tradingPairsObject["BinanceUSD"] = await convertCryptoPairToDollar(
          value
        );
      }
    }
    dispatch(getLivePrices(tradingPairsObject));
  };
};

export const GetCryptoPricesInDollar = () => {
  let tradingPairsObject = {
    Ethereum: 0,
    Bitcoin: 0,
    Lumen: 0,
    Ripple: 0,
    BinanceCoin: 0,
    TetherUSDT: 0,
    BinanceUSD: 0,
  };
  return async (dispatch) => {
    for (const [key, value] of Object.entries(CoinsPairContext)) {
      if (key === "Ethereum") {
        tradingPairsObject["Ethereum"] = await convertCryptoPairToDollar(value);
      }

      if (key === "Bitcoin") {
        tradingPairsObject["Bitcoin"] = await convertCryptoPairToDollar(value);
      }

      if (key === "Lumen") {
        tradingPairsObject["Lumen"] = await convertCryptoPairToDollar(value);
      }

      if (key === "Ripple") {
        tradingPairsObject["Ripple"] = await convertCryptoPairToDollar(value);
      }

      if (key == "BinanceCoin") {
        tradingPairsObject["BinanceCoin"] = await convertCryptoPairToDollar(
          value
        );
      }

      if (key == "TetherUSDT") {
        tradingPairsObject["TetherUSDT"] = await convertCryptoPairToDollar(
          value
        );
      }

      if (key == "BinanceUSD") {
        tradingPairsObject["BinanceUSD"] = await convertCryptoPairToDollar(
          value
        );
      }
    }
    dispatch(getLivePricesinDollarReduxInit(tradingPairsObject));
  };
};
