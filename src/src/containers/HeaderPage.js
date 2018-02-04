import {connect} from "react-redux"
import App from "../components/HeaderPage"
import AppActions from "../actions/HeaderPage"
import AppRootActions from "../actions/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  return {
    AppRoot: state.AppRoot,
    HeaderPage: state.HeaderPage,
  }
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    searchItems: (params)=> {
      dispatch(AppActions.searchItems(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
