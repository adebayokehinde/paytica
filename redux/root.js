import { combineReducers } from "redux"
import authReducer from "./reducers/auth"
import paymentDataControl from './reducers/MandoeReducer/paymentReducer'
import MandoeCryptoLivePrices from './reducers/MandoeReducer/cryptoPricesReducer'

import adminAuthReducer from './reducers/AdminReducer/adminAuthRedcuer'

import CryptoLivePrices from './reducers/cryptoPricesReducer'

import BillsProviderDataReducer from './reducers/supplierReducer'

const rootReducer = combineReducers({
  paymentData : paymentDataControl ,
  auth: authReducer,
  adminAuth : adminAuthReducer ,
  PayticaCryptoPrices : CryptoLivePrices ,
  MandoeCryptoPricesDollar : MandoeCryptoLivePrices ,
  ProviderData : BillsProviderDataReducer
})

export default rootReducer;