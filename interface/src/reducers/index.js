import { combineReducers } from "redux";
import flash from "./flash"
import auth from "./auth"
import assect from "./assect"
import transaction from "./transaction"

const rootReducer = combineReducers({
  flash,
  auth,
  assect,
  transaction
})

export default rootReducer;