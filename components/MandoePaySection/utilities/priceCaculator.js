const DollarToCryptoPrice = async (cryptoLivePrice, UsdAmount) => {

  const ConvertUSDtoCrypto = parseFloat(UsdAmount) / parseFloat(cryptoLivePrice);

  return parseFloat(ConvertUSDtoCrypto);
};

// Get Selected Coin
export const SetDollarToCrypto = async (
  theCoin,
  theAmount,
  coinPricesContext
) => {

  if (theCoin == "Ethereum") {
    const LatestCoinPrice = coinPricesContext["EthereumInDollar"];
    const CryptoAmount = await DollarToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
  if (theCoin == "Lumen") {
    const LatestCoinPrice = coinPricesContext["LumenInDollar"];
    const CryptoAmount = await DollarToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
  if (theCoin == "Ripple") {
    const LatestCoinPrice = coinPricesContext["RipplePriceInDollar"];
    const CryptoAmount = await DollarToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
  if (theCoin == "Bitcoin") {
    const LatestCoinPrice = coinPricesContext["BitcoinInDollar"];
    const CryptoAmount = await DollarToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }

  if (theCoin == "BinanceCoin") {
    const LatestCoinPrice = coinPricesContext["BinanceCoinInDollar"];
    const CryptoAmount = await DollarToCryptoPrice(LatestCoinPrice, theAmount);
    return CryptoAmount;
  }
};
