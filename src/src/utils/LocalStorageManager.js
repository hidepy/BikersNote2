export default class LocalStorageManager{

  static getDataAll(storageKey){
    let res = null
    try{
      res = JSON.parse(window.localStorage[storageKey])
    }
    catch(err){
      res = null
    }

    return res
  }

  // Hashの場合はkeyを, arrayの場合はindexをitemKeyに渡す
  static getData(storageKey, itemKey){
    const data = LocalStorageManager.getDataAll(storageKey)
    return data[itemKey]
  }

  // Hashの場合は{}をデフォルト, Arrayの場合は[]をデフォルト
  static setData(storageKey, isArr, item, itemKey){
    let data = LocalStorageManager.getDataAll(storageKey) || (isArr ? [] : {})

    if(!isArr){
      data[itemKey] = item
    }
    else{
      data.push(item)
    }

    window.localStorage[storageKey] = JSON.stringify(data)
  }
}
