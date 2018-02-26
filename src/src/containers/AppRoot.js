import {connect} from "react-redux"
import App from "../components/AppRoot"
import AppActions from "../actions/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  return state
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    showToast: (msg)=> {
      dispatch(AppActions.showToast(msg))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
