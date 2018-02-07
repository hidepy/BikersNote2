import constants from "../utils/constants"
import CommonFunc from "../utils/CommonFunc"
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

      const list = CommonFunc.obj2SortedArr(
        LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST) || [],
        "key",
        true
      )
console.log(list)
      const dispDef = {left: "type", center: "title", right: "timestamp"}

      dispatch(receiveItems(list, dispDef))
    }
  },
}
