import React, { Component } from 'react'
import ons from "onsenui"
import  {Page, Button, List, ListItem, Toolbar, BackButton} from 'react-onsenui'

import BikersList from "../Commons/BikersList"
import RoundButton from "../Commons/RoundButton"
import DetailPage from "../../containers/DetailPage"

export default class HeaderPage extends Component {

  constructor(props){
    super(props)

    this.onListItemClick = this.onListItemClick.bind(this)
  }

  // 画面表示直前に、前画面から受け取ったパラメータでリストを検索する
  componentWillMount(){

    this.props.searchItems({
      type: this.props.params.listType,
    })
  }

  onListItemClick(event, i){

    // 選択された要素を取得
    const item = this.props.HeaderPage.generalList[i]

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

  render() {
    return (
      <Page>
        <Toolbar>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
          <div className="center">{this.props.title}</div>
        </Toolbar>

        <RoundButton onButtonClick={this.onPlusButtonClick} />

        <section>
          <BikersList
            items={this.props.HeaderPage.generalList || []}
            dispDef={this.props.HeaderPage.generalListDispDef}
            onItemClick={this.onListItemClick}
           />
        </section>
      </Page>

    );
  }
}
