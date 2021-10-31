import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  BitcoinPriceinNaira: null,
  EthereumPriceinNaira: null,
  LumenPriceinNaira: null,
  RipplePriceinNaria: null,
  BinanceCoinPriceinNaira: null,
  TetherCoinPriceinNaira: null,
  BinanceUSDPriceinNaira: null,

  BitcoinPriceinDollar: null,
  EthereumPriceinDollar: null,
  LumenPriceinDollar: null,
  RipplePriceinDollar: null,
  BinanceCoinPriceinDollar: null,
  TetherCoinPriceinDollar: null,
  BinanceUSDPriceinDollar: null,
};

const updatePairPricesInNaira = (state, action) => {
  const priceData = action.data;
  return updateObject(state, {
    BitcoinPriceinNaira: priceData["Bitcoin"],
    EthereumPriceinNaira: priceData["Ethereum"],
    LumenPriceinNaira: priceData["Lumen"],
    RipplePriceinNaria: priceData["Ripple"],
    BinanceCoinPriceinNaira: priceData["BinanceCoin"],
    TetherCoinPriceinNaira: priceData["TetherUSDT"],
    BinanceUSDPriceinNaira: priceData["BinanceUSD"],
  });
};

const updatePairPricesInDollar = (state, action) => {
  const priceData = action.data;
  return updateObject(state, {
    BitcoinPriceinDollar: priceData["Bitcoin"],
    EthereumPriceinDollar: priceData["Ethereum"],
    LumenPriceinDollar: priceData["Lumen"],
    RipplePriceinDollar: priceData["Ripple"],
    BinanceCoinPriceinDollar: priceData["BinanceCoin"],
    TetherCoinPriceinDollar: priceData["TetherUSDT"],
    BinanceUSDPriceinDollar: priceData["BinanceUSD"],
  });
};

const CryptoLivePrices = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIVE_PRICES:
      return updatePairPricesInNaira(state, action);
    case actionTypes.GET_LIVE_CRYPTO_PRICES_USD:
      return updatePairPricesInDollar(state, action);
    default:
      return state;
  }
};

export default CryptoLivePrices;
