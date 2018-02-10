import constants from "../utils/constants"
import CommonFunc from "../utils/CommonFunc"
import MasterDataManager from "../utils/MasterDataManager"

export default class Article{

  // 使用することは無いと思うが, プロパティ一覧を把握するため
  constructor(){
    this.type = ""
    this.part = ""
    this.title = ""
    this.date = ""
    this.comment = ""
    this.img = []
    this.url = ""
    this.place = []
    this.price = 0
    this.tag = []
    this.distance = 0
    this.litter = 0
    this.litter_price = 0
  }

  // DetailPageで使用する型定義情報を取得する
  static getDefinition(type){

    const commonDef = [
      { propName: "target", title: "機体", inputType: "select", ref: "article-target", selectList: MasterDataManager.getMachinesNVPair(), searchType: "selection"},
      { propName: "type", title: "タイプ", inputType: "select", ref: "article-type", selectList: MasterDataManager.getArticleTypeNVPair(), searchType: "selection"},
      { propName: "part", title: "部位", inputType: "select", ref: "article-part", useType: [
        constants.ARTICLE_TYPE.MAINTAINANCE, constants.ARTICLE_TYPE.CUSTOM
      ], selectList: MasterDataManager.getParts(), searchType: "selection"},
      { propName: "title", title: "タイトル", inputType: "text", ref: "article-title", searchType: "fuzzy"},
      { propName: "date", title: "日付", inputType: "date", ref: "article-date", searchType: "date"},
      { propName: "comment", title: "コメント", inputType: "textarea", ref: "article-comment"},
      { propName: "img", title: "画像", inputType: "img", ref: "article-img", multi: true, tmpImages: [] },
      { propName: "url", title: "参考URL", inputType: "text", ref: "article-url"},
      { propName: "place", title: "場所", inputType: "map", ref: "article-place", multi: true, useType: [
        constants.ARTICLE_TYPE.TOURING, constants.ARTICLE_TYPE.EVENT
      ]},
      { propName: "price", title: "かかった費用", inputType: "number", ref: "article-price"},
      { propName: "tag", title: "タグ", inputType: "tag", ref: "article-tag", multi: true, selectList: [], searchType: "selection"},

      { propName: "distance", title: "前回給油からの走行距離", inputType: "number", ref: "article-distance", useType: [
        constants.ARTICLE_TYPE.NENPI
      ]},
      { propName: "litter", title: "給油量(L)", inputType: "number", ref: "article-litter", useType: [
        constants.ARTICLE_TYPE.NENPI
      ]},
      { propName: "litter_price", title: "1Lあたりの価格", inputType: "number", ref: "article-litter_price", useType: [
        constants.ARTICLE_TYPE.NENPI
      ]},

    ]

    // 取得対象のtypeが絞られていない場合は全件返却
    /*
    if(!type){
      return commonDef
    }

    // useTypeが無い(=共通), または, useTypeが自身のTypeと一致するレコードのみを返却
    return
      commonDef
        .filter(v=> {
          return (!v.useType || (v.useType.filter(s=> s == type).length > 1 ))
        })
    */
    return Article.filterDefinition(commonDef, type)
  }

  static filterDefinition(definitions, type){

console.log(definitions)
console.log(type)

    if(!type){
      return definitions
    }

    const res =
      (definitions || [])
        .filter(v=> {
          return (!v.useType || (v.useType.filter(s=> s == type).length > 1 ))
        })

    console.log(res)

    return res
  }
}
