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

  // Arrayはサポートしない. 複数条件でソートしたりすんで...hashでいく
  static setData(storageKey, item, itemKey){
    let data = LocalStorageManager.getDataAll(storageKey) || {}

    data[itemKey] = item

    window.localStorage[storageKey] = JSON.stringify(data)
  }

  static delData(storageKey, itemKey){
    let data = LocalStorageManager.getDataAll(storageKey) || {}

    delete data[itemKey]

    window.localStorage[storageKey] = JSON.stringify(data)
  }
}
