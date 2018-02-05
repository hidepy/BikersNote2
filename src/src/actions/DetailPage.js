import LocalStorageManager from "../utils/LocalStorageManager"

function receiveItems(list, dispDef){
  return {
    type: "RECEIVE_SOMETHING",
  }
}

export default{
  saveItem: (storageKey, item, key)=> {
    return dispatch=> {

//static setData(storageKey, isArr, item, itemKey){

      if(!key){
        // 新規登録
        key = Date.now()
      }

      item.key = key

      LocalStorageManager.setData(storageKey, true, item)

      //dispatch(receiveItems(list, dispDef))
    }
  },
}
