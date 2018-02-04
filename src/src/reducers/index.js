import {combineReducers} from "redux"
import AppRoot from "./AppRoot"
import TopPage from "./TopPage"
import HeaderPage from "./HeaderPage"

const reducer = combineReducers({
  AppRoot,
  TopPage,
  HeaderPage,
})

export default reducer
