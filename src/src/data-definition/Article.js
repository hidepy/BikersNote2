import constants from "../utils/constants"
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
  static getDefinition(){

    const exceptNenpi = [
      constants.ARTICLE_TYPE.MAINTAINANCE, constants.ARTICLE_TYPE.CUSTOM, constants.ARTICLE_TYPE.TOURING, constants.ARTICLE_TYPE.PICTURE, constants.ARTICLE_TYPE.PURCHACE, constants.ARTICLE_TYPE.EVENT, constants.ARTICLE_TYPE.MEMO
    ]

    const commonDef = [
      { propName: "type", title: "タイプ", inputType: "select", ref: "article-type", selectList: MasterDataManager.getArticleTypeNVPair(), searchType: "selection"},
      { propName: "target", title: "機体", inputType: "select", ref: "article-target", selectList: MasterDataManager.getMachinesNVPair(), searchType: "selection"},
      { propName: "part", title: "部位", inputType: "select", ref: "article-part", useType: [
        constants.ARTICLE_TYPE.MAINTAINANCE, constants.ARTICLE_TYPE.CUSTOM
      ], selectList: MasterDataManager.getParts(), searchType: "selection"},
      { propName: "title", title: "タイトル", inputType: "text", ref: "article-title", searchType: "fuzzy"},
      { propName: "date", title: "日付", inputType: "date", ref: "article-date", searchType: "date"},
      { propName: "comment", title: "コメント", inputType: "textarea", ref: "article-comment"},
      { propName: "img", title: "画像", inputType: "img", ref: "article-img", multi: true, tmpImages: [], useType: exceptNenpi},
      { propName: "url", title: "参考URL", inputType: "text", ref: "article-url", useType: [
        constants.ARTICLE_TYPE.MAINTAINANCE, constants.ARTICLE_TYPE.CUSTOM, constants.ARTICLE_TYPE.TOURING, constants.ARTICLE_TYPE.PURCHACE, constants.ARTICLE_TYPE.EVENT
      ]},
      { propName: "place", title: "場所", inputType: "map", ref: "article-place", multi: true, useType: [
        constants.ARTICLE_TYPE.TOURING, constants.ARTICLE_TYPE.EVENT
      ]},
      { propName: "price", title: "かかった費用", inputType: "number", ref: "article-price", useType: [
        constants.ARTICLE_TYPE.MAINTAINANCE, constants.ARTICLE_TYPE.CUSTOM, constants.ARTICLE_TYPE.TOURING, constants.ARTICLE_TYPE.PURCHACE, constants.ARTICLE_TYPE.EVENT
      ]},
      { propName: "tag", title: "タグ", inputType: "tag", ref: "article-tag", multi: true, selectList: [], searchType: "selection", useType: exceptNenpi},
      { propName: "distance", title: "前回給油からの走行距離", inputType: "number", ref: "article-distance", useType: [
        constants.ARTICLE_TYPE.NENPI
      ], defaultNoDisp: true},
      { propName: "litter", title: "給油量(L)", inputType: "number", ref: "article-litter", useType: [
        constants.ARTICLE_TYPE.NENPI
      ], defaultNoDisp: true},
      { propName: "litter_price", title: "1Lあたりの価格", inputType: "number", ref: "article-litter_price", useType: [
        constants.ARTICLE_TYPE.NENPI
      ], defaultNoDisp: true},

    ]

    //return Article.filterDefinition(commonDef, null, true)
    return commonDef
  }

  static filterDefinition(definitions, type){

    // typeなき場合は、defaultNoDisp以外のものを返却する
    if(!type){
      return definitions.filter(v=> !v.defaultNoDisp)
      //return definitions
    }

    const res =
      (definitions || [])
        .filter(v=> {
          return (!v.useType || (v.useType.filter(s=> {return s === type}).length >= 1 ))
        })

    return res
  }
}
