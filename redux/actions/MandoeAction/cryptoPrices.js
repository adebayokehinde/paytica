import axios from "axios";
import * as actionTypes from "./action-types";

import { host } from "./constants";

// init the Reducers
export const getLivePrices = (data) => {
  return {
    type: actionTypes.GET_LIVE_PRICES,
    data,
  };
};


const NairaPrice = async () => {
  const endpoint =
    "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=NGN";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };
  const nairaRate = await axios.get(endpoint).then((res) => {
    if (res.status == 200) {
      // setNairaRate(res.data['NGN'])
      // console.log(res.data)
      // console.log('This is the Cost of a dollar to Naira',res.data['NGN'])
      return res.data["NGN"];
    } else {
      return false;
    }
  });

  return nairaRate;
};

const getPair = async (Pair) => {
  // console.log("Getting Pair", Pair);
  const LatestNairaRate = await NairaPrice();
  const endpoint = host + "/pay/get-tradingpair";
  const PairClosing = await axios
    .get(endpoint, {
      params: {
        Pair: Pair,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        // console.log("DATA FROM PAIR", res.data);
        return res.data["ClosingPrice"];
      } else {
        return 0;
      }
    });
  // Convert to Naira
  let convertPairToNaira = Math.round(PairClosing * LatestNairaRate);
  return PairClosing;
};

const CoinsObject = {
  Ethereum: "ETHUSDT",
  Bitcoin: "BTCUSDT",
  Lumen: "XLMUSDT",
  Ripple: "XRPUSDT",
  BinanceCoin : "BNBUSDT"
};

export const GetCryptoPrices = () => {
  let coinPriceChange = {
    Ethereum: 0,
    Bitcoin: 0,
    Lumen: 0,
    Ripple: 0,
  };

  if (typeof window !== "undefined") {
  }

  return async (dispatch) => {
    for (const [key, value] of Object.entries(CoinsObject)) {
      // console.log(key, value);

      if (key === "Ethereum") {
        coinPriceChange["Ethereum"] = await getPair(value);
      }

      if (key === "Bitcoin") {
        coinPriceChange["Bitcoin"] = await getPair(value);
      }

      if (key === "Lumen") {
        coinPriceChange["Lumen"] = await getPair(value);
      }

      if (key === "Ripple") {
        coinPriceChange["Ripple"] = await getPair(value);
      }
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("cryptoPrice", JSON.stringify(coinPriceChange));
    }
    dispatch(getLivePrices(coinPriceChange));
  };
};
