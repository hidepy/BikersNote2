import LocalStorageManager from "./LocalStorageManager"
import constants from "./constants"
import CommonFunc from "./"

export default class MasterDataManager{

  // asArrがtrueなら配列として返却, compKeyは比較用のキー, isDescは降順の場合にtrue
  static getMachines(params, asArr, compKey, isDesc){
    const hash = LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.MACHINE_LIST)
    return asArr ? CommonFunc.obj2SortedArr(hash, compKey, isDesc) : hash
  }

  // ArticleTypeをNameValuePairの配列として取得する
  static getArticleTypeNVPair(){

    const arr = [
      constants.ARTICLE_TYPE.MAINTAINANCE,
      constants.ARTICLE_TYPE.CUSTOM,
      constants.ARTICLE_TYPE.TOURING,
      constants.ARTICLE_TYPE.PICTURE,
      constants.ARTICLE_TYPE.NENPI,
      constants.ARTICLE_TYPE.PURCHACE,
      constants.ARTICLE_TYPE.EVENT,
      constants.ARTICLE_TYPE.MEMO]
    ]
      .map(type=> {
        return {
          value: type,
          name: constants.ARTICLE_TYPE_NAME[type]
        }
      })

    return arr
  }
  static getParts(params){

  }
  static getTags(params){

  }
}
