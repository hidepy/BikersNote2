import React, { Component } from 'react'
import ons from "onsenui"
import  {Page, Toolbar, BackButton, Row, Col} from 'react-onsenui'

//import $ from "jquery"

import constants from "../../utils/constants"
import RoundButton from "../Commons/RoundButton"
import ArticleDef from "../../data-definition/Article"

export default class DetailPage extends Component {

  constructor(props){
      super(props)

      // 入力要素refについているプレフィックスを求める
      const REF_PREFIX_DEF = {
        [constants.PAGE_TYPE.BIKERS_LIST]: "article-",
        [constants.PAGE_TYPE.MACHINE_LIST]: "machine-",
        [constants.PAGE_TYPE.MASTER_LIST]: "master-",
      }
      this.refPrefix = REF_PREFIX_DEF[props.params.listType]

      this.state = {
        inputItemDef: [],
        item: props.params.selectedItem,
        isUpdateScreen: !!this.props.params.isUpdateScreen,
      }

      this.onEditButtonClick = this.onEditButtonClick.bind(this)
      this.setValues2InputElement = this.setValues2InputElement.bind(this)
  }

  componentWillMount(){
    // マウント直前に、詳細画面の定義情報を取得する
    this.setState({
      inputItemDef: ArticleDef.getDefinition()
    })
  }

  componentDidUpdate(prevProps, prevState){

    // 前回更新フラグがfalseで、今回trueの場合のみ駆動
    if((prevState.isUpdateScreen == false) && (this.state.isUpdateScreen == true)){
      // 入力要素に値をセットしていく
      this.setValues2InputElement()
    }
  }

  setValues2InputElement(){

    Object.keys(this.refs || {})
      .forEach(key=> {
        const propName = key.replace(this.refPrefix, "")
        this.refs[key].value = this.state.item[propName]
      })
  }

  onEditButtonClick(){

    // 更新画面でなければ更新モードに変更
    if(!this.state.isUpdateScreen){

      this.setState({
        isUpdateScreen: !this.state.isUpdateScreen
      })
    }
    // 更新画面でボタン押下された場合はデータ保存
    else{

console.log(this.props.params.listType)

      const storageType =
        this.props.params.listType == constants.PAGE_TYPE.BIKERS_LIST ? constants.LOCAL_STORAGE_NAME.BIKERS_LIST
          : this.props.params.listType == constants.PAGE_TYPE.MACHINE_LIST ? constants.LOCAL_STORAGE_NAME.MACHINE_LIST
          : ""

console.log(storageType)

      // 正常にstorageType取得できていれば
      if(storageType){

        // itemを組み立てる
        let item = {}
        Object.keys(this.refs || {}).forEach(key=> {
          item[key.replace(this.refPrefix, "")] = this.refs[key].value
        })

console.log("before save")
console.log(this.props)

        // 値をstorageに保存する
        this.props.saveItem(storageType, item, this.state.item ? this.state.item.key : null)
      }
    }
  }



  render() {
    const screenType = this.state.isUpdateScreen ? 1 : 0; // 0参照, 1更新

    const createItem = (v)=> { // v has title,inputType, value, ref
      if(screenType == 0){
        return (<div>{this.state.item[v["propName"]]}</div>)
      }
      else{
        switch(v.inputType){
          case "text": {
            return (<input ref={v.ref} />)
          }
          default: {
            return (<input ref={v.ref} />)
          }
        }
      }
    }

    return (
      <Page>
        <Toolbar>
          <div className="center">{this.props.title}</div>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
        </Toolbar>

        <RoundButton onButtonClick={this.onEditButtonClick} iconName={this.state.isUpdateScreen ? "fa-check-circle" : "fa-edit"} />

        <section>
          {
            // 入力要素/表示要素の定義分描画する
            (this.state.inputItemDef || []) // {title: '日付', inputType: 'text', value: mytest.val, ref: 'inp-date'}
              .map((v, i)=> {
                return (
                  <Row key={i}>
                    <Col>{v.title}</Col>
                    <Col>
                      {
                        // 定義のプロパティ名
                        //(screenType == 0) ? (<div>{v["propName"]}</div>) : (<input ref={v.ref} />)
                        createItem(v)
                      }
                    </Col>
                  </Row>
                )
              })
          }
        </section>

      </Page>
    );
  }
}
