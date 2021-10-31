const bitcoinImage = "https://cryptologos.cc/logos/thumbs/bitcoin.png?v=013";
const etheruemImage = "https://cryptologos.cc/logos/thumbs/ethereum.png?v=013";
const binanceCoinImage =
  "https://cryptologos.cc/logos/thumbs/binance-coin.png?v=013";
const tetherusdtImage = "https://cryptologos.cc/logos/thumbs/tether.png?v=013";
const busdLogo = "https://cryptologos.cc/logos/thumbs/binance-usd.png?v=013"

export const coinList = [
  {
    CoinName: "Bitcoin",
    ShortName: "BTC",
    CoinImage: bitcoinImage,
    isSelected: false,
  },
  {
    CoinName: "BinanceCoin",
    ShortName: "BNB",
    CoinImage: binanceCoinImage,
    isSelected: true,
  },
  {
    CoinName: "Ethereum",
    ShortName: "ETH",
    CoinImage: etheruemImage,
    isSelected: false,
  },
  {
    CoinName: "TetherUSDT",
    ShortName: "USDT",
    CoinImage: tetherusdtImage,
    isSelected: false,
  },
  {
    CoinName: "BinanceUSD",
    ShortName: "BUSD",
    CoinImage: busdLogo,
    isSelected: false,
  },
  
];
