import constants from "../utils/constants"

import NenpiChart from "../components/Commons/NenpiChart"
import ArticlePieChart from "../components/Commons/ArticlePieChart"

export default class Machine{

  // 使用することは無いと思うが, プロパティ一覧を把握するため
  constructor(initObj = {}){
    this.name = initObj.name || ""
    this.img = initObj.img || ""
    this.purchase_date = initObj.purchase_date || ""
    this.maker = initObj.maker || ""
    this.first_distance = initObj.first_distance || 0
    this.current_distance = initObj.current_distance || 0
  }

  // DetailPageで使用する型定義情報を取得する
  static getDefinition(type){
    const def = [
      { propName: "maker", title: "メーカー", inputType: "select", ref: "machine-maker", selectList: constants.BIKE_MAKER},
      { propName: "name", title: "名前", inputType: "text", ref: "machine-name"},
      { propName: "img", title: "画像", inputType: "img", ref: "machine-img" },
      { propName: "nenpi_list", title: "燃費", inputType: "custom", ref: "machine-nenpilist", dispOnly: true, customComponent: NenpiChart},
      { propName: "article_piechart", title: "記録", inputType: "custom", ref: "machine-nenpilist", dispOnly: true, customComponent: ArticlePieChart},
      { propName: "first_distance", title: "乗り始めた時の走行距離", inputType: "number", ref: "machine-first_distance"},
      { propName: "current_distance", title: "現在の走行距離", inputType: "number", ref: "machine-current_distance"},
      { propName: "memo", title: "メモ", inputType: "textarea", ref: "machine-memo"},
      { propName: "purchase_date", title: "乗り始めた日", inputType: "date", ref: "machine-purchase_date"},
      { propName: "sold_date", title: "手放した日", inputType: "date", ref: "machine-sold_date"},
    ]

    return def
  }

}
