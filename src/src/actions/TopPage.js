import constants from "../utils/constants"
import LocalStorageManager from "../utils/LocalStorageManager"

function receiveItems(list, dispDef){
  return {
    type: "RECEIVE_NEW_ARTICLES",
    articles: list,
    articlesDispDef: dispDef,
  }
}

export default{
  searchNewArticles: (params)=> {
    return dispatch=> {

      const list = LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST) || []
      const dispDef = {left: "type", center: "title", right: "timestamp"}

      dispatch(receiveItems(list, dispDef))
    }
  },
}
