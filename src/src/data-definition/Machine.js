import constants from "../utils/constants"

//name, img, purchace_date, maker, current_distance

export default class Machine{

  // 使用することは無いと思うが, プロパティ一覧を把握するため
  constructor(){
    this.name = ""
    this.img = ""
    this.purchase_date = ""
    this.maker = ""
    this.current_distance = 0
  }

  // DetailPageで使用する型定義情報を取得する
  static getDefinition(type){
    const def = [
      { propName: "name", title: "名前", inputType: "text", ref: "article-name"},
      { propName: "img", title: "画像", inputType: "img", ref: "article-img" },
      { propName: "purchase_date", title: "乗り始めた日", inputType: "date", ref: "article-purchase_date"},
      { propName: "maker", title: "メーカー", inputType: "text", ref: "article-maker"},
      { propName: "first_distance", title: "乗り始めた時の走行距離", inputType: "number", ref: "article-first_distance"},
      { propName: "current_distance", title: "現在の走行距離", inputType: "number", ref: "article-current_distance"},
    ]

    return def
  }
}