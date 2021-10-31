import * as actionTypes from "../../actions/MandoeAction/action-types"
import { updateObject } from "../../utility"

const initialState = {
  BitcoinPrice : null ,
  EthereumPrice : null ,
  LumenPrice : null ,
  RipplePrice: null
};
 

const getLivePrices = (state,action)=>{
  const priceData = action.data
  return updateObject(state, {
    BitcoinPrice : priceData['Bitcoin'] ,
    EthereumPrice : priceData['Ethereum'],
    LumenPrice : priceData['Lumen'],
    RipplePrice: priceData['Ripple']
  });
}

const MandoeCryptoLivePrices = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIVE_PRICES:
      return getLivePrices(state,action)
    default:
      return state; 
  }
};
 
export default MandoeCryptoLivePrices;
