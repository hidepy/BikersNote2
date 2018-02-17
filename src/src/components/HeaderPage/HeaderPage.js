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

    this.state = {
      searchConditionDef: searchConditionDef,
      isSearchConditionAreaShown: true,
      list: [],
    }

    // 現在の検索条件保持用 現在選択値を保持しておくためにvalueプロパティを追加
    this.currentSearchCondition =
      searchConditionDef
        .slice()
        .map(v=>{
          let additionalProp = {
            value: ""
          }

          if(v.searchType === "date") additionalProp["value2"] = ""

          return {
            ...v,
            ...additionalProp,
          }
        })

    this.onListItemClick = this.onListItemClick.bind(this)
    this.onPlusButtonClick = this.onPlusButtonClick.bind(this)
    this.toggleSearchConditionArea = this.toggleSearchConditionArea.bind(this)
    this.onSearchConditionChange = this.onSearchConditionChange.bind(this)
  }

  // 画面表示直前に、前画面から受け取ったパラメータでリストを検索する
  componentWillMount(){

    this.props.searchItems({
      type: this.props.params.listType,
    })

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.HeaderPage.generalList == this.props.HeaderPage.generalList){
      return
    }

    this.setState({
      list: nextProps.HeaderPage.generalList
    })
  }

  onPlusButtonClick(){
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '追加',
      params: {
        listType: this.props.params.listType,
        isUpdateScreen: true
      }
    })
  }

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
        listType: this.props.params.listType,
      }
    })
  }

  toggleSearchConditionArea(){
    console.log("comes")
    this.setState({
      isSearchConditionAreaShown: !this.state.isSearchConditionAreaShown
    })
  }

  onSearchConditionChange(changedDef, val, options){

    for(var changedIndex = 0; changedIndex < this.currentSearchCondition.length; changedIndex++){
      if(this.currentSearchCondition[changedIndex].propName === changedDef.propName) break
    }
    if(changedIndex >= this.currentSearchCondition.length){
      ; // 境界外なら処理対象外
    }
    else{

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

    const filterdList =
      this.props.HeaderPage.generalList
        .filter((v)=> {
          console.log(v)

          for(let i = 0; i < this.currentSearchCondition.length; i++){
            const condVal = this.currentSearchCondition[i]
            const prop = condVal.propName

            // 種別によって判定方法を変更する
            if(condVal.searchType === "date"){
              // 日付の場合は範囲選択
              const fromCheck = !!condVal.value  ? (condVal.value  <= v[changedDef.propName]) : true
              const toCheck   = !!condVal.value2 ? (condVal.value2 <= v[changedDef.propName]) : true
              //return fromCheck && toCheck
              if(!(fromCheck && toCheck)){
                console.log("日付チェックヒットなしにつき対象外")
                return false
              }
            }
            else{
              // 絞り込み条件に値が無ければ次へ
              if((condVal["value"] === undefined) || (condVal["value"] === null) || condVal["value"] === "") continue

              if(condVal.searchType === "fuzzy"){
                // あいまい検索の場合は、文字列が存在するかを検査
                if(v[changedDef.propName].indexOf(val) < 0){
                  return false
                }
              }
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

    this.setState({
      list: filterdList
    })

  }

  render() {
console.log(this.state)
    const SEARCH_ITEM_PREFIX = "search-"

    const createSearchConditionItem = v=> {

      if(v.searchType === "selection"){
        return (
          <SelectByList prefix={SEARCH_ITEM_PREFIX} defItem={v} onSelectItemChange={this.onSearchConditionChange} />
        )
      }
      else if(v.searchType === "fuzzy"){
        return (
          <input type="text" ref={SEARCH_ITEM_PREFIX + v.ref} onChange={(event)=> this.onSearchConditionChange(v, event.target.value)} />
        )
      }
      else if(v.searchType === "date"){
        return (
          <div>
            <input type="date" ref={SEARCH_ITEM_PREFIX + v.ref + "-from"} onChange={(event)=> this.onSearchConditionChange(v, event.target.value, {fromToType: "from"})} />
            ～
            <input type="date" ref={SEARCH_ITEM_PREFIX + v.ref + "-to"  } onChange={(event)=> this.onSearchConditionChange(v, event.target.value, {fromToType: "to"})} />
          </div>
        )
      }

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

        <RoundButton onButtonClick={this.onPlusButtonClick} className={((this.props.params.withSearchCondition ? "" : "hidden"))} />

        <RoundButton iconName="fa-times" customStyle={{top: "8px"}} onButtonClick={this.toggleSearchConditionArea } />

        <section
          className={
            "animate-element searchConditionArea "
            + (this.state.isSearchConditionAreaShown ? "" : "searchConditionArea-closed ")
            + ((this.props.params.withSearchCondition ? "" : "hidden"))
            + ("searchConditionAreaState is " + this.state.isSearchConditionAreaShown)
          }
        >
          {
            // 検索による絞り込みありの場合
            (this.state.searchConditionDef || []).map((v)=> {
              return (
                <Row key={v.title}>
                  <Col>
                    {v.title}
                  </Col>
                  <Col>
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
      </Page>

    );
  }
}
