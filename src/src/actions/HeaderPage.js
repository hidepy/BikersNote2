import LocalStorageManager from "../utils/LocalStorageManager"
import constants from "../utils/constants"
import CommonFunc from "../utils/CommonFunc"

function receiveItems(list, dispDef){
  return {
    type: "RECEIVE_GENERAL_LIST",
    generalList: list,
    generalListDispDef: dispDef,
  }
}

export default{
  searchItems: (params)=> {
    return dispatch=> {
      // localstorageなどから値を取得

      let list = []
      let dispDef = {}

      if(params.type === constants.PAGE_TYPE.BIKERS_LIST){
        //list = CommonFunc.obj2SortedArr(LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST), )
        //list = CommonFunc.obj2Arr(LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST))
        //list = LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST) || []
        list = CommonFunc.obj2SortedArr(
          LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST) || [],
          "key",
          true
        )

        // type, title, date, comment, img(multi), url, place, price, tag, part, time, spots, distance, litter, litter_price
        dispDef = {left: "type", center: "title", right: "timestamp"}
      }
      else if(params.type === constants.PAGE_TYPE.MACHINE_LIST){
        //list = LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.MACHINE_LIST)
        list = CommonFunc.obj2SortedArr(
          LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.MACHINE_LIST) || [],
          "key",
          true
        )

        dispDef = {left: "img:IMG", center: "name", right: "purchace_date"}
      }
      else if(params.type === constants.PAGE_TYPE.MASTER_LIST){
        list = constants.MASTER_SETTINGS
      }

      dispatch(receiveItems(list, dispDef))
    }
  },
}
