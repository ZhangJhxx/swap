import {EXCHANGE_RATE} from "../constants"
const initState ={
  balance:{
    cny_balance:100,
    cc_balance:0
  }
}

const Balance = (state = initState,action) => {
  switch (action.type) {
    case "buy_in":
      return {
        balance: {
          cny_balance:state.balance.cny_balance - action.amount,
          cc_balance:state.balance.cc_balance + action.amount/EXCHANGE_RATE
        }
      }
    case "withdrawal":
      return {
        balance: {
          cny_balance:state.balance.cny_balance + action.amount*EXCHANGE_RATE,
          cc_balance:state.balance.cc_balance - action.amount
        }
      }
    default:
      return state
  }
}

export default Balance