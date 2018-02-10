import LocalStorageManager from "./LocalStorageManager"
import constants from "./constants"
import CommonFunc from "./CommonFunc"

export default class MasterDataManager{

  static BLANK_VALUE = { value: "", name: "" }

  // asArrがtrueなら配列として返却, compKeyは比較用のキー, isDescは降順の場合にtrue
  static getMachines(params, asArr, compKey, isDesc){
    const hash = LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.MACHINE_LIST)
    return asArr ? CommonFunc.obj2SortedArr(hash, compKey, isDesc) : hash
  }

  static getMachinesNVPair(){
    let arr = MasterDataManager.getMachines({}, true, "timestamp", true)
    arr = arr.map(v=> {
      return {
        value: v.name,
        name: v.name,
      }
    })

    arr.unshift(MasterDataManager.BLANK_VALUE)

    return arr
  }

  // ArticleTypeをNameValuePairの配列として取得する
  static getArticleTypeNVPair(){

    let arr = [
      constants.ARTICLE_TYPE.MAINTAINANCE,
      constants.ARTICLE_TYPE.CUSTOM,
      constants.ARTICLE_TYPE.TOURING,
      constants.ARTICLE_TYPE.PICTURE,
      constants.ARTICLE_TYPE.NENPI,
      constants.ARTICLE_TYPE.PURCHACE,
      constants.ARTICLE_TYPE.EVENT,
      constants.ARTICLE_TYPE.MEMO
    ]
      .map(type=> {
        return {
          value: type,
          name: constants.ARTICLE_TYPE_NAME[type]
        }
      })

    arr.unshift(MasterDataManager.BLANK_VALUE)

    return arr
  }
  static getParts(params){
    let arr = (constants.PARTS_TYPE || []).slice()
    arr.unshift(MasterDataManager.BLANK_VALUE)

    return arr
  }
  static getTags(params){

  }
}
