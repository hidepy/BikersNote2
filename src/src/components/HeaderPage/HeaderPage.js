import React, { Component } from 'react'
//import ons from "onsenui"
import  {Page, Toolbar, BackButton, Row, Col} from 'react-onsenui'

import BikersList from "../Commons/BikersList"
import RoundButton from "../Commons/RoundButton"
import SelectByList from "../Commons/SelectByList"
import DetailPage from "../../containers/DetailPage"
import constants from "../../utils/constants"
import ArticleDef from "../../data-definition/Article"
import MachineDef from "../../data-definition/Machine"
import MasterDef from "../../data-definition/Machine"

import $ from "jquery"

export default class HeaderPage extends Component {

  static key = "HeaderPage"

  constructor(props){
    super(props)

    const DEF_OBJ = {
      [constants.PAGE_TYPE.BIKERS_LIST]: ArticleDef,
      [constants.PAGE_TYPE.MACHINE_LIST]: MachineDef,
      [constants.PAGE_TYPE.MASTER_LIST]: MasterDef,
    }
    const defObj = DEF_OBJ[this.props.params.listType]

    const searchConditionDef =
      defObj.getDefinition()
        .filter(v=> !!v.searchType)
        .filter(v=> {
          // 固定検索フラグがfalseの場合はfilter1個で終了
          if(!this.props.params.fixSearchCondition || !this.props.params.searchCondition){
            return true
          }

          // 固定検索の場合は、指定されている内容のみ画面表示するように絞り込み
          return this.props.params.searchCondition[v.propName] !== undefined
        })

    this.state = {
      searchConditionDef: searchConditionDef,
      isSearchConditionAreaShown: true,
      list: [],
      loopcnt: 0
    }

    // 現在の検索条件保持用 現在選択値を保持しておくためにvalueプロパティを追加
    this.currentSearchCondition =
      searchConditionDef
        .slice()
        .map(v=>{

          let additionalProp = {
            value: !!this.props.params.searchCondition && this.props.params.searchCondition[v.propName] ? this.props.params.searchCondition[v.propName] : ""
          }

          if(v.searchType === "date") additionalProp["value2"] = ""

          return {
            ...v,
            ...additionalProp,
          }
        })

console.log(this.currentSearchCondition)

    this.onListItemClick = this.onListItemClick.bind(this)
    this.onPlusButtonClick = this.onPlusButtonClick.bind(this)
    this.toggleSearchConditionArea = this.toggleSearchConditionArea.bind(this)
    this.onSearchConditionChange = this.onSearchConditionChange.bind(this)
    this.onDetailPageSaveSuccessCallback = this.onDetailPageSaveSuccessCallback.bind(this)
  }

  // 画面表示直前に、前画面から受け取ったパラメータでリストを検索する
  componentWillMount(){
    console.log("【componentWillMount】")
    // リストを検索する
    this.props.searchItems({
      type: this.props.params.listType,
    })
  }

  componentDidMount(){
console.log("【componentDidMount】")
    if(this.props.params.searchCondition){

      const SEARCH_ITEM_PREFIX = "search-"

      this.state.searchConditionDef.forEach(v=> {

        // 検索条件に値がセットされていなければ次へ
        if(!this.props.params.searchCondition[v.propName]) return

        const condVal = this.props.params.searchCondition[v.propName]

        if(v.searchType === "selection"){
          document.querySelector("[name=" + SEARCH_ITEM_PREFIX + v.ref + "]").value = condVal

          $("[name=" + SEARCH_ITEM_PREFIX + v.ref + "]").trigger("onchage")
        }
        // 検索タイプがあいまい検索の場合
        else if(v.searchType === "fuzzy"){
          document.querySelector("#" + SEARCH_ITEM_PREFIX + v.ref).value = condVal
        }
        // 検索タイプが日付の場合
        else if(v.searchType === "date"){
          // 特に考慮なし...いまのところ 大変なんで
        }

      })
    }
  }

  componentWillReceiveProps(nextProps){
console.log("【componentWillReceiveProps】")
    if(nextProps.HeaderPage.generalList == this.props.HeaderPage.generalList){
      return
    }

    this.setState({
      list: nextProps.HeaderPage.generalList
    })

    this.filterList(nextProps.HeaderPage.generalList)
  }


  // 詳細ページの保存成功時コールバック
  onDetailPageSaveSuccessCallback(){

    // 再検索実行
    this.props.searchItems({
      type: this.props.params.listType,
    })

    // 検索終了後にpoppage
    this.props.navigator.popPage()
  }

  // プラス(追加)ボタン押下時ハンドら
  onPlusButtonClick(){
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '追加',
      params: {
        listType: this.props.params.listType,
        isUpdateScreen: true,
        onSaveSuccessCallback: this.onDetailPageSaveSuccessCallback,
      }
    })
  }

  // リスト要素クリック時ハンドラ
  onListItemClick(event, i){

    // 選択された要素を取得
    //const item = this.props.HeaderPage.generalList[i]
    const item = this.state.list[i]

    // 詳細画面へ遷移する. paramsには選択された情報を渡す
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '詳細',
      params: {
        selectedItem: item,
        mytestparam: "yes",
        listType: this.props.params.listType,
        onSaveSuccessCallback: this.onDetailPageSaveSuccessCallback,
      }
    })
  }

  // 検索エリアの表示/非表示切り替え
  toggleSearchConditionArea(){
    console.log("comes")
    this.setState({
      isSearchConditionAreaShown: !this.state.isSearchConditionAreaShown
    })
  }

  // 検索条件変更時
  onSearchConditionChange(changedDef, val, options){
    // 変更された要素のインデックスを取得する
    for(var changedIndex = 0; changedIndex < this.currentSearchCondition.length; changedIndex++){
      if(this.currentSearchCondition[changedIndex].propName === changedDef.propName) break
    }
    if(changedIndex >= this.currentSearchCondition.length){
      ; // 境界外なら処理対象外
    }
    else{

      // 正常インデックスなら
      let updPropName = "value"

      // 検索種別がtypeの場合で、toを指している場合は、value2側に値を更新
      if((changedDef.searchType === "date") && (options && (options.fromToType === "to"))){
        updPropName = "value2"
      }

      // 絞り込み条件の値を更新
      this.currentSearchCondition[changedIndex] = {
        ...this.currentSearchCondition[changedIndex],
        [updPropName]: val
      }

    }

    // 要素の絞込みを行う
    this.filterList(this.props.HeaderPage.generalList)

  }

  // targetListに画面表示用のリストをセットする
  filterList(targetList){

    const filterdList =
      (targetList || [])
        .filter((v)=> {
          // 検索条件全てチェック
          for(let i = 0; i < this.currentSearchCondition.length; i++){
            const condVal = this.currentSearchCondition[i]
            const prop = condVal.propName

            // 種別によって判定方法を変更する
            // 種別がdateの場合、from-toのbetween検索する
            if(condVal.searchType === "date"){
              // 日付の場合は範囲選択
              //const fromCheck = !!condVal.value  ? (condVal.value  <= v[changedDef.propName]) : true
              //const toCheck   = !!condVal.value2 ? (condVal.value2 <= v[changedDef.propName]) : true
              const fromCheck = !!condVal.value  ? (condVal.value  <= v[condVal.propName]) : true
              const toCheck   = !!condVal.value2 ? (condVal.value2 <= v[condVal.propName]) : true

              //return fromCheck && toCheck
              if(!(fromCheck && toCheck)){
                console.log("日付チェックヒットなしにつき対象外")
                return false
              }
            }
            // 種別がdate以外の場合
            else{
              // 絞り込み条件に値が無ければ次へ
              if((condVal["value"] === undefined) || (condVal["value"] === null) || condVal["value"] === "") continue

              // あいまい検索
              if(condVal.searchType === "fuzzy"){
                // あいまい検索の場合は、文字列が存在するかを検査
                if(v[condVal.propName].indexOf(condVal["value"]) < 0){
                  return false
                }
              }
              // それ以外
              else{
                // それ以外の場合は、単に値比較
                if(v[prop] != condVal.value){
                  return false
                }
              }
            }
          }

          return true
        })

    // 絞込み後リストをセット
    this.setState({
      list: filterdList
    })
  }

  render() {
    const SEARCH_ITEM_PREFIX = "search-"

    // 検索条件部分を作成する
    const createSearchConditionItem = v=> {
      // 検索タイプが選択肢の場合
      if(v.searchType === "selection"){
        return (
          <SelectByList prefix={SEARCH_ITEM_PREFIX} defItem={v} onSelectItemChange={this.onSearchConditionChange} />
        )
      }
      // 検索タイプがあいまい検索の場合
      else if(v.searchType === "fuzzy"){
        return (
          <ons-input type="text" id={SEARCH_ITEM_PREFIX + v.ref} ref={SEARCH_ITEM_PREFIX + v.ref} onChange={(event)=> this.onSearchConditionChange(v, event.target.value)} />
        )
      }
      // 検索タイプが日付の場合
      else if(v.searchType === "date"){
        return (
          <div>
            <ons-input type="date" ref={SEARCH_ITEM_PREFIX + v.ref + "-from"} onChange={(event)=> this.onSearchConditionChange(v, event.target.value, {fromToType: "from"})} />
            ～
            <ons-input type="date" ref={SEARCH_ITEM_PREFIX + v.ref + "-to"  } onChange={(event)=> this.onSearchConditionChange(v, event.target.value, {fromToType: "to"})} />
          </div>
        )
      }

      // 全て引っ掛からない場合は、検索コンポーネント無し
      return null
    }

    return (
      <Page>
        <Toolbar>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
          <div className="center">{this.props.title}</div>
        </Toolbar>

        <section
          className={
            "animate-element searchConditionArea "
            + (this.state.isSearchConditionAreaShown ? "" : "searchConditionArea-closed ")
            + ((this.props.params.withSearchCondition ? "" : "searchConditionArea-closed "))
            + ((this.props.params.fixSearchCondition ? " searchConditionArea-disabled" : ""))
          }
        >
          {
            // 検索による絞り込みありの場合
            (this.state.searchConditionDef || []).map((v)=> {
              return (
                <Row key={v.title}>
                  <Col width="80px" className="HeaderPage-itemHead">
                    {v.title}
                  </Col>
                  <Col className="HeaderPage-itembody">
                    {createSearchConditionItem(v)}
                  </Col>
                </Row>
              )
            })
          }
        </section>

        <section>
          <BikersList
            items={this.state.list || []}
            dispDef={this.props.HeaderPage.generalListDispDef}
            onItemClick={this.onListItemClick}
           />
        </section>


        <RoundButton
          onButtonClick={this.onPlusButtonClick}
          className={((this.props.params.withSearchCondition ? "" : "hidden"))}
        />

        <RoundButton
          iconName={(this.props.params.withSearchCondition && this.state.isSearchConditionAreaShown) ? "fa-angle-up" : "fa-angle-down"}
          customStyle={{
            top: "8px",
            display: (!!this.props.params.fixSearchCondition || ((this.state.searchConditionDef || []).length <= 0) ? "none" : "inherit"),
          }}
          onButtonClick={this.toggleSearchConditionArea }
        />

      </Page>

    )
  }
}
