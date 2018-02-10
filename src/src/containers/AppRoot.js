import {connect} from "react-redux"
import App from "../components/AppRoot"
//import AppActions from "../actions/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  return state
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
