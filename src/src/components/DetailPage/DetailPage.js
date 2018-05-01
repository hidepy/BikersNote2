import React, { Component } from 'react'
import ons from "onsenui"
import  {Page, Toolbar, BackButton, Button, Row, Col} from 'react-onsenui'

//import $ from "jquery"

import constants from "../../utils/constants"
import CommonFunc from "../../utils/CommonFunc"
import RoundButton from "../Commons/RoundButton"
import SelectByList from "../Commons/SelectByList"
import ArticleDef from "../../data-definition/Article"
import MachineDef from "../../data-definition/Machine"
import MasterDef from "../../data-definition/Machine"

export default class DetailPage extends Component {

  static key = "DetailPage"

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
        item: props.params.selectedItem || {},
        isUpdateScreen: !!this.props.params.isUpdateScreen,
        defClass: null,
        _updateFlg: false
      }

      // 全入力項目の定義を保存しておく
      this.inputItemDefAll = []

      // LocalStorageの保存先をリストタイプから判定
      this.storageType =
        this.props.params.listType === constants.PAGE_TYPE.BIKERS_LIST ? constants.LOCAL_STORAGE_NAME.BIKERS_LIST
          : this.props.params.listType === constants.PAGE_TYPE.MACHINE_LIST ? constants.LOCAL_STORAGE_NAME.MACHINE_LIST
          : ""

      this.onEditButtonClick = this.onEditButtonClick.bind(this)
      this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
      this.setValues2InputElement = this.setValues2InputElement.bind(this)
      this.onTypeChange = this.onTypeChange.bind(this)
      this.onStateClick = this.onStateClick.bind(this)
      this.onShareButtonClick = this.onShareButtonClick.bind(this)
  }

  componentWillMount(){
    // マウント直前に、詳細画面の定義情報を取得する

    const DEF_OBJ = {
      [constants.PAGE_TYPE.BIKERS_LIST]: ArticleDef,
      [constants.PAGE_TYPE.MACHINE_LIST]: MachineDef,
      [constants.PAGE_TYPE.MASTER_LIST]: MasterDef,
    }
    const defObj = DEF_OBJ[this.props.params.listType]

    //let inputTypeDef = {}
    let inputItemDef = defObj.getDefinition()

    inputItemDef = inputItemDef.map(v=> {
      if(v.inputType == "img"){
        v.tmpImages = this.state.item[v.propName]
      }

      return v
    })

    // 全定義を保存する
    this.inputItemDefAll = inputItemDef.slice()

    let updatedItemDef = inputItemDef

    // typeが既に決まっていれば、定義を更新
    if(this.state.item && this.state.item["type"]){
      console.log("comes type def change")
      updatedItemDef = ArticleDef.filterDefinition(this.inputItemDefAll, this.state.item["type"])
    }
    else{
      // typeなき場合は、メンテナンスの入力項目を表示しておく
      updatedItemDef = ArticleDef.filterDefinition(this.inputItemDefAll, constants.ARTICLE_TYPE.MAINTAINANCE)
    }

    this.setState({
      //inputItemDef: inputItemDef,
      inputItemDef: updatedItemDef,
      defClass: defObj,
    })
  }

  componentDidUpdate(prevProps, prevState){

    // 前回更新フラグがfalseで、今回trueの場合のみ駆動
    if((prevState.isUpdateScreen === false) && (this.state.isUpdateScreen === true)){
      // 入力要素に値をセットしていく
      this.setValues2InputElement()
    }
  }

  // storageから取得してきた値を画面項目にバインド
  setValues2InputElement(){

    this.state.inputItemDef.forEach(v=> {
      if(v.inputType == "img"){
        v.tmpImages = this.state.item[v.propName]
      }
      else if((v.inputType == "select") || (v.inputType == "input-select")){
        document.querySelector("[name=" + v.ref + "]").value = this.state.item[v.propName]
      }
      else{

        if(!this.refs[v.ref]) return

        // 値をinpuタグにコピー
        this.refs[v.ref].value = this.state.item[v.propName] || ""
      }
    })

    // 強制再描画
    this.setState({
      _updateFlg: !this.state._updateFlg
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

        // 入力定義分だけループして組み立てる
        this.state.inputItemDef.forEach(v=> {

          // imgの場合, 対象画像を全て抜き出してsrcをデータとして保存
          if(v.inputType == "img"){
            item[v.propName] =
              Array.prototype.slice.call(document.querySelectorAll("#images-" + v.ref + " img"))
                .map(elImg=> elImg.getAttribute("src"))
          }
          else if((v.inputType == "select") || (v.inputType == "input-select")){
            console.log(v.ref)

            item[v.propName] = document.querySelector("[name=" + v.ref + "]").value
          }
          else{
            // それ以外の場合は、値をそのままセット
            item[v.propName] = this.refs[v.ref].value
          }

        })

        // 値をstorageに保存する
        //   ⇒本当はもっと疎結合にしたくもあるんだが...Typeごとにね
        this.props.saveItem(this.storageType, item, this.state.item ? this.state.item.key : null)

        this.props.showToast("保存しました")

        console.log(this.props)

        // 処理後コールバックがある場合は実行
        if(this.props.params.onSaveSuccessCallback){
          this.props.params.onSaveSuccessCallback()
        }
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

  onTypeChange(definition, value){

    if(definition.propName === "type"){
      // 画面の表示項目を変更する
      const newDef = ArticleDef.filterDefinition(this.inputItemDefAll, value)

      // 強制再描画
      this.setState({
        _updateFlg: !this.state._updateFlg,
        inputItemDef: newDef,
      })
    }
  }

  onStateClick(){
    console.log(this.state)
    alert("out state")
  }

  // 共有ボタン押下
  onShareButtonClick(){

    let title = ""

    const message = (this.state.inputItemDef || [])
      .reduce((p, c)=> {

        if(c.inputType === "img"){
          /*
          Array.prototype.slice.call(document.querySelectorAll("#" + c.ref + " > img"))
            .reduce((ip, ic)=> {
              return
            }, )
          */
          return p + "IMG..." + "\n"
        }
        else{

          const text = (document.querySelector("#" + c.ref) || {innerText: ""}).innerText

          if(c.propName === "title"){
            title = text
          }

          return p + "【" + c.title + "】" + "\n" + text + "\n\n"
        }

        return ""
      }, "")

//alert(title)
//alert(message)

    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: message, // not supported on some apps (Facebook, Instagram)
      subject: title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
    };

    var onSuccess = function(result) {
      //alert("on success")
      //console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      //console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };

    var onError = function(msg) {
      alert("on error")
      console.log("Sharing failed with message: " + msg);
    };

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
  }

  render() {

    const screenType = this.state.isUpdateScreen ? 1 : 0; // 0参照, 1更新

    const defaultWidth = "160px"
    const defaultHeight = "120px"

    const createItem = (v, i)=> { // v has title,inputType, value, ref

      if(screenType == 0){
        switch(v.inputType){
          case "img": {
            const width = v.width || defaultWidth
            const height = v.height || defaultHeight

            return (
              <div id={v.ref}>
              {
                (this.state.item[v["propName"]] || []).map(imgData=> {
                  return (<img src={imgData} width={width} height={height} />)
                })
              }
              </div>
            )
          }
          case "select": {
            return (
              <div id={v.ref}>
              {
                // selectの場合は値がコードになっているので、名前として解釈する
                CommonFunc.getNameByValue(this.state.item[v["propName"]], v.selectList)
              }
              </div>
            )
          }
          case "input-select": {
            return (
              <div id={v.ref}>
              {
                // selectの場合は値がコードになっているので、名前として解釈する
                CommonFunc.getNameByValue(this.state.item[v["propName"]], v.selectList)
              }
              </div>
            )
          }
          case "custom": {
            return (
              <v.customComponent item={this.state.item[v["propName"]]} />
            )
          }
          default: {
            return (
              <div id={v.ref}>
                {this.state.item[v["propName"]]}
              </div>
            )
          }
        }
      }
      else{
        switch(v.inputType){
          case "text": {
            return (<ons-input ref={v.ref} />)
          }
          case "date": {
            return (<ons-input ref={v.ref} type="date" />)
          }
          case "textarea": {
            return (<textarea className="textarea textarea--transparent" ref={v.ref} style={{height: "5em"}} />)
          }
          case "select": {
            // 固定でonchange入れ込んじゃう
            return (
              <SelectByList defItem={v} onSelectItemChange={this.onTypeChange} />
            )
          }
          case "img": {
            return (
              <div>
                <div>
                  <Button onClick={
                    ()=>
                      CommonFunc.getPicture({targetWidth: window.screen.width * 3})
                        .then(base64img=> {
                          alert("select ok!!")
                          console.log("in CommonFunc.getPicture callback")
                          //v.values.push("data:image/jpeg;base64," + base64img)
                          //v.values.push(base64img)

                          let updatedDef = this.state.inputItemDef

                          if(!updatedDef[i].tmpImages){
                            updatedDef[i].tmpImages = []
                          }
                          updatedDef[i].tmpImages.push(base64img)

                          this.setState({
                            //temprul: updatedDef[i].tmpImages,
                            inputItemDef: updatedDef,
                            //_updateFlg: !this.state._updateFlg,
                          })
                        })
                  }>画像選択</Button>
                </div>
                <div id={"images-" + v.ref}>
                  {
                    (v.tmpImages || []).map((url, j)=> {
                    //(this.state.temprul || []).map(url=> {
                      //console.log(url)
                      return (
                        <div key={j} id={"images-" + v.ref + "-" + j} style={{position: "relative"}}>
                          <img src={url} width={v.width || defaultWidth} height={v.height || defaultHeight} />
                          <RoundButton onButtonClick={()=> {
                            console.log("RoundButton trash pushed")
                            let updatedDef = this.state.inputItemDef
                            updatedDef[i].tmpImages.splice(j, 1)
                            this.setState({
                              inputItemDef: updatedDef,
                            })
                          }} iconName="fa-trash" />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
          case "custom": {
            if(v.dispOnly){
                return (<p>is disp only</p>)
            }

            return (<p>is custom</p>)
          }
          default: {
            return (<ons-input ref={v.ref} />)
          }
        }
      }
    }

    const createItemWrapper = (v, i)=> (
      <div>
        <p className="DetailPage-itemHead">{v.title}</p>
        <div className="DetailPage-itembody">
        {
          createItem(v, i)
        }
        </div>
      </div>
    )

    return (
      <Page>
        <Toolbar>
          <div className="center">{this.props.title}</div>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
        </Toolbar>

        <section>
          {
            // 入力要素/表示要素の定義分描画する
            (this.state.inputItemDef || []) // {title: '日付', inputType: 'text', value: mytest.val, ref: 'inp-date'}
              .map((v, i)=> {
                return (
                  <Row key={i}>
                    <Col>
                      {
                        // 定義のプロパティ名
                        //(screenType == 0) ? (<div>{v["propName"]}</div>) : (<input ref={v.ref} />)
                        createItemWrapper(v, i)
                      }
                    </Col>
                  </Row>
                )
              })
          }
        </section>

        <RoundButton
          onButtonClick={this.onShareButtonClick}
          iconName={"fa-share-alt"}
          isHidden={this.state.isUpdateScreen || (this.props.params.listType !== constants.PAGE_TYPE.BIKERS_LIST)}
          customStyle={
            {
               top: "16px"
            }
          }
        />

        <RoundButton
          onButtonClick={this.onEditButtonClick}
          iconName={this.state.isUpdateScreen ? "fa-check-circle" : "fa-edit"}
        />

        <RoundButton
          customStyle={
            {
              display: (this.state.item && this.state.item.key) ? "inline-block" : "none",
              bottom: "84px",
              backgroundColor: "#666"
            }
          }
          onButtonClick={this.onDeleteButtonClick}
          iconName={"fa-trash"}
        />

      </Page>
    );
  }
}
