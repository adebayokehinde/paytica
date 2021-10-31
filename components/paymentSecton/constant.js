import axios from "axios";
import { host } from "../utils/constants";

const getPair = async (Pair) => {
  console.log("Getting Pair", Pair);
  const endpoint = host + "/AnonymousPayRoute/get-tradingpair";
  const PairClosing = await axios
    .get(endpoint, {
      params: {
        tradingPair: Pair,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        console.log("DATA FROM PAIR", res.data);
        return res.data["ClosingPrice"];
      } else {
        return 0;
      }
    });
  return PairClosing;
};

export const getPairClosingPrice = async (Coin) => {
  console.log(Coin);
  if (Coin == "Ethereum") {
    const LatestPrice = await getPair("ETHUSDT");
    return LatestPrice;
  }

  if (Coin == "Bitcoin") {
    const LatestPrice = await getPair("BTCUSDT");
    return LatestPrice;
  }

  if (Coin == "Ripple") {
    const LatestPrice = await getPair("XRPUSDT");
    return LatestPrice;
  }

  if (Coin == "Lumen") {
    const LatestPrice = await getPair("XLMUSDT");
    return LatestPrice;
  }

  if (Coin == "BinanceCoin") {
    const LatestPrice = await getPair("BNBUSDT");
    return LatestPrice;
  }
};
