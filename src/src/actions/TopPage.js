import constants from "../utils/constants"
import CommonFunc from "../utils/CommonFunc"
import LocalStorageManager from "../utils/LocalStorageManager"

function receiveMachines(list){
  return {
    type: "RECEIVE_MACHINES",
    machines: list,
  }
}

function receiveItems(list, dispDef){
  return {
    type: "RECEIVE_NEW_ARTICLES",
    articles: list,
    articlesDispDef: dispDef,
  }
}

export default{

  searchMachines: ()=> {
    return dispatch=> {
      const list = CommonFunc.obj2Arr(
        LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.MACHINE_LIST)
      )

      dispatch(receiveMachines(list))
    }
  },

  searchNewArticles: (params)=> {
    return dispatch=> {

      const list =
        CommonFunc.obj2SortedArr(
          LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST) || [],
          "key",
          true
        )
        .map((v)=> {
          return {
            ...v,
            type_name: constants.ARTICLE_TYPE_NAME[v.type]
          }
        })

      const dispDef = {left: "type_name", center: "title", right: "timestamp"}

      dispatch(receiveItems(list, dispDef))
    }
  },
}
