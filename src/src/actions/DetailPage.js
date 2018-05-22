import LocalStorageManager from "../utils/LocalStorageManager"

export default{
  saveItem: (storageKey, item, key)=> {
    return dispatch=> {

      if(!key){
        // 新規登録の場合はkeyを発番
        key = Date.now()
      }

      item.key = key

      item.update_timestamp = (new Date()).toLocaleString()

      LocalStorageManager.setData(storageKey, item, item.key)

      //dispatch(receiveItems(list, dispDef))
    }
  },
  deleteItem: (storageKey, key)=> {
    return dispatch=> {
      LocalStorageManager.delData(storageKey, key)
    }
  }
}
