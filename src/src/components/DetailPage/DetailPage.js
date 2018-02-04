import React, { Component } from 'react'
import ons from "onsenui"
import  {Page, Toolbar, BackButton, Row, Col} from 'react-onsenui'

import ArticleDef from "../../data-definition/Article"

export default class DetailPage extends Component {

  constructor(props){
      super(props)

      this.state = {
        inputItemDef: [],
        item: props.params.selectedItem,
      }
  }

  componentWillMount(){
    // マウント直前に、詳細画面の定義情報を取得する
    this.setState({
      inputItemDef: ArticleDef.getDefinition()
    })
  }

  render() {
    const screenType = this.props.params.isUpdateScreen ? 1 : 0; // 0参照, 1更新

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
