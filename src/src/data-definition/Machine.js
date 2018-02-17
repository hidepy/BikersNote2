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
      { propName: "name", title: "名前", inputType: "text", ref: "machine-name"},
      { propName: "img", title: "画像", inputType: "img", ref: "machine-img" },
      { propName: "purchase_date", title: "乗り始めた日", inputType: "date", ref: "machine-purchase_date"},
      { propName: "maker", title: "メーカー", inputType: "text", ref: "machine-maker"},
      { propName: "first_distance", title: "乗り始めた時の走行距離", inputType: "number", ref: "machine-first_distance"},
      { propName: "current_distance", title: "現在の走行距離", inputType: "number", ref: "machine-current_distance"},
    ]

    return def
  }
}
