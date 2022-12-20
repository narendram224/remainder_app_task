import { combineReducers } from "redux"
import noteReducer from "./note"
export default combineReducers({
  invoice: noteReducer,
})
