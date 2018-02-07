import React, { Component } from 'react'
import ons from "onsenui"
import  {Page, Toolbar, BackButton, Button, Row, Col} from 'react-onsenui'

//import $ from "jquery"

import constants from "../../utils/constants"
import CommonFunc from "../../utils/CommonFunc"
import RoundButton from "../Commons/RoundButton"
import ArticleDef from "../../data-definition/Article"
import MachineDef from "../../data-definition/Machine"
import MasterDef from "../../data-definition/Machine"

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

      // LocalStorageの保存先をリストタイプから判定
      this.storageType =
        this.props.params.listType === constants.PAGE_TYPE.BIKERS_LIST ? constants.LOCAL_STORAGE_NAME.BIKERS_LIST
          : this.props.params.listType === constants.PAGE_TYPE.MACHINE_LIST ? constants.LOCAL_STORAGE_NAME.MACHINE_LIST
          : ""

      this.onEditButtonClick = this.onEditButtonClick.bind(this)
      this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
      this.setValues2InputElement = this.setValues2InputElement.bind(this)
  }

  componentWillMount(){
    // マウント直前に、詳細画面の定義情報を取得する

    const DEF_OBJ = {
      [constants.PAGE_TYPE.BIKERS_LIST]: ArticleDef,
      [constants.PAGE_TYPE.MACHINE_LIST]: MachineDef,
      [constants.PAGE_TYPE.MASTER_LIST]: MasterDef,
    }
    const defObj = DEF_OBJ[this.props.params.listType]

    this.setState({
      inputItemDef: defObj.getDefinition()
    })
  }

  componentDidUpdate(prevProps, prevState){

    // 前回更新フラグがfalseで、今回trueの場合のみ駆動
    if((prevState.isUpdateScreen === false) && (this.state.isUpdateScreen === true)){
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

      // 正常にstorageType取得できていれば
      if(this.storageType){

        // itemを組み立てる
        let item = {}
        Object.keys(this.refs || {}).forEach(key=> {
          item[key.replace(this.refPrefix, "")] = this.refs[key].value
        })

        // 値をstorageに保存する
        this.props.saveItem(this.storageType, item, this.state.item ? this.state.item.key : null)
      }
    }
  }

  onDeleteButtonClick(){
    ons.notification.confirm(constants.MESSAGES.CONFIRM_DELETE)
    .then((response) => {
      if(response){
        this.props.deleteItem(this.storageType, this.state.item.key)
      }
    })
  }

  render() {
    const screenType = this.state.isUpdateScreen ? 1 : 0; // 0参照, 1更新

    const createItem = (v)=> { // v has title,inputType, value, ref
      if(screenType == 0){
        switch(v.inputType){
          case "img": {
            const width = v.width || "320px"
            const height = v.height || "240px"
            return (<img src={this.state.item[v["propName"]]} width={width} height={height} />)
          }

          default: {
            return (<div>{this.state.item[v["propName"]]}</div>)
          }
        }
      }
      else{
        switch(v.inputType){
          case "text": {
            return (<input ref={v.ref} />)
          }
          case "date": {
            return (<input ref={v.ref} type="date" />)
          }

          case "img": {
            return (
              <div>
                <div>
                  <Button onClick={
                    ()=>
                      CommonFunc.getPicture()
                        .then(base64img=> {
                          alert("select ok!!")
                          console.log("in CommonFunc.getPicture callback")
                          v.values.push("data:image/jpeg;base64," + base64img)
                          console.log(v.values.length)
                        })
                  }>画像選択</Button>
                </div>
                <div id={"images-" + v.ref}>
                  {
                    (v.values || []).map(url=> (<img src={url} />))
                  }
                </div>
              </div>
            )
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

        <RoundButton
          onButtonClick={this.onEditButtonClick}
          iconName={this.state.isUpdateScreen ? "fa-check-circle" : "fa-edit"}
        />

        <RoundButton
          style={
            {
              display: (this.state.item && this.state.item.key) ? "inline-block" : "none",
              bottom: "84px",
              backgroundColor: "#666"
            }
          }
          onButtonClick={this.onDeleteButtonClick}
          iconName={"fa-trash"}
        />

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
