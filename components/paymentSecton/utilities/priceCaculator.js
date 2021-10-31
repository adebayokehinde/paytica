import axios from "axios";
import { host } from "../../utils/constants";

const NairaToCryptoPrice = async (cryptoLivePrice, tempAmount) => {
  console.log("Tehe-fi , " ,cryptoLivePrice , tempAmount ) 
  // Gets Paytica Live USD to NGN Rate
  const endpoint = host + "/paytica-reports/get-dollar-rates";
  const NairaRate = await axios.get(endpoint).then((res) => {
    if (res.status == 200) {
      return res.data["rates"].DollarRates;
    } else {
      return false;
    }
  });
  // Converts Naira to USD
  const NairaToUsd = parseFloat(tempAmount) / parseFloat(NairaRate);
  // Convert USD to Asset Value
  const UsdAmount = NairaToUsd;
  const ConvertUSDtoCrypto = UsdAmount / cryptoLivePrice;

  return parseFloat(ConvertUSDtoCrypto);
};

// Get Selected Coin
export const SetNairaToCrypto = async (
  theCoin,
  theAmount,
  coinPricesContext
) => {

  console.log("This is the COIN",theCoin)

  if (theCoin == "Ethereum") {
    const LatestCoinPrice = coinPricesContext["EthereumInDollar"];
    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
  if (theCoin == "Lumen") {
    const LatestCoinPrice = coinPricesContext["LumenInDollar"];
    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
  if (theCoin == "Ripple") {
    const LatestCoinPrice = coinPricesContext["RipplePriceInDollar"];
    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
  if (theCoin == "Bitcoin") {
    const LatestCoinPrice = coinPricesContext["BitcoinInDollar"];
    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }

  if (theCoin == "BinanceCoin") {
    const LatestCoinPrice = coinPricesContext["BinanceCoinInDollar"];
    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }

  if (theCoin == "TetherUSDT"){
    const LatestCoinPrice = coinPricesContext["TetherUSDTinDollar"];
    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }

  if (theCoin == "BinanceUSD"){
    const LatestCoinPrice = coinPricesContext["BinanceUSDinDollar"];

    const CryptoAmount = await NairaToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }

};
