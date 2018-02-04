import {connect} from "react-redux"
import App from "../components/TopPage"
import AppActions from "../actions/TopPage"
import AppRootActions from "../actions/AppRoot"

// stateを繋ぐ
function mapStateToProps(state){
  return {
    AppRoot: state.AppRoot,
    TopPage: state.TopPage,
  }
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    searchNewArticles: (params)=> {
      dispatch(AppActions.searchNewArticles(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
