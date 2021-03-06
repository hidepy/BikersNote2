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
    // keyが渡されない場合は新規として扱う
    saveItem: (storageKey, item, key)=> {
      dispatch(AppActions.saveItem(storageKey, item, key))
    },
    deleteItem: (storageKey, key)=> {
      dispatch(AppActions.deleteItem(storageKey, key))
    },
    showToast: (msg)=> {
      dispatch(AppRootActions.showToast(msg))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
