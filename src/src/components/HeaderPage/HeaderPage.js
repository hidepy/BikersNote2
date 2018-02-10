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

    this.currentSearchCondition = []

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

  onSearchConditionChange(changedDef, val){
console.log("change comse")
console.log(changedDef)
console.log(val)

//this.currentSearchCondition てきなもので現在の検索条件を管理するのがよさそう

    this.currentSearchCondition

    const filterdList =
      this.props.HeaderPage.generalList
        .filter((v)=> {
          console.log(v[changedDef.propName])



          if(!val) return true
          return v[changedDef.propName].indexOf(val) >= 0
        })

    this.setState({
      list: filterdList
    })

  }

  render() {

    const SEARCH_ITEM_PREFIX = "search-"

    const createSearchConditionItem = v=> {

this.currentSearchCondition.push({propName: v.propName, searchType: v.searchType, value: ""})

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
            <input type="date" ref={SEARCH_ITEM_PREFIX + v.ref + "-from"} onChange={()=> this.onSearchConditionChange(v)} />
            ～
            <input type="date" ref={SEARCH_ITEM_PREFIX + v.ref + "-to"} onChange={()=> this.onSearchConditionChange(v)} />
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
{this.state.isSearchConditionAreaShown}
        <section
          className={
            "animate-element searchConditionArea "
            + (this.state.isSearchConditionAreaShown ? "" : "searchConditionArea-closed ")
            + ((this.props.params.withSearchCondition ? "" : "hidden"))
          }
        >
          {
            // 検索による絞り込みありの場合
            (this.state.searchConditionDef || []).map((v)=> {
              return (
                <Row>
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
