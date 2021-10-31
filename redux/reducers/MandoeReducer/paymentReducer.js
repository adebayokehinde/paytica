import * as actionTypes from "../../actions/MandoeAction/action-types"
import { updateObject } from "../../utility"

const initialState = {
    AccountNumber : null,
    BankName : null ,
    BankCode : null ,
    AmountInNaira : null ,
    AmountInUsd : null  ,
    AccountName : null ,
    CoinType : null ,
}

const updatePaymentState =(prevState ,payload)=>{
    const data = payload['data']
    return updateObject(prevState ,{
        AccountNumber : data['theAccountNumber'] ,
        BankName : data['theBankName'] ,
        AmountInNaira : data['theAmountInNaria'] ,
        AmountInUsd : data['theAmountInUsd'],
        AccountName : data['theAccountName'],
        CoinType : data['theCoinType']
    })
}



const paymentDataControl = (state = initialState ,action)=>{
    switch(action.type){
        case actionTypes.PAYMENT_DETAILS_ADDED:
            return updatePaymentState(state,action)
        default:
            return state; 
    }
}


export default paymentDataControl