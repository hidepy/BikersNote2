import {connect} from "react-redux"
import App from "../components/DetailPage"
import AppActions from "../actions/DetailPage"
import AppRootActions from "../actions/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  return {
    AppRoot: state.AppRoot,
    DetailPage: state.DetailPage,
  }
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
