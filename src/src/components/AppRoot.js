import React, { Component } from 'react'
//import ons from "onsenui"
import  { Button, Page, Navigator, Splitter, SplitterSide, SplitterContent, List, ListItem, Toast } from 'react-onsenui'

import constants from "../utils/constants"
import MasterDataManager from "../utils/MasterDataManager"
import HeaderPage from "../containers/HeaderPage"
import TopPage from "../containers/TopPage"

// [参考]Navigator & SplitterMenu：https://onsen.io/playground/?framework=react&category=common%20patterns&module=splitter_navigator

class AppRoot extends Component {

  constructor(props){
    super(props)

    this.state = {
      isMenuOpen: false,
    }

    this.renderPage = this.renderPage.bind(this)
    this.loadPage = this.loadPage.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  hide() {
    this.setState({ isMenuOpen: false });
  }

  show() {
    this.setState({ isMenuOpen: true });
  }

/*
  loadPage(page) {
    this.hide();
    const currentPage = this.navigator.pages.slice(-1)[0] // --- or [this.navigator.pages.length - 1]
    if(currentPage.key != page.name){
      this.navigator.resetPage({ component: page, props: { key: page.name } }, { animation: 'fade' });
    }
  }
  */

  loadPage(pageType) {

    //this.hide()

    const currentPage = this.navigator.pages.slice(-1)[0] // --- or [this.navigator.pages.length - 1]

    // Pageにname属性与えておくことが必須のようす。いや、規定であるのか...？
    /*
    if(currentPage.key != (page.name + "_" + pageType)){
      this.navigator.resetPage({ component: page, props: { key: page.name } }, { animation: 'fade' });
    }
    */


    this.navigator.pushPage(
      {
        component: HeaderPage,
        params: {
          listType: pageType,
        }
      }
    )

    // 直接DetailPageに入ることないので
    /*
    this.navigator.resetPage(
      {
        component: HeaderPage,
        props: {
          //key: page.name,
        },
        params: {
          listType: pageType
        }
      },
      {
        animation: 'fade'
      },
    )
    */

  }

  toggleMenu(nextState){
    console.log("in toggleMenu")
    this.setState({
      isMenuOpen: (nextState === undefined ? !this.state.isMenuOpen : nextState)
    })
  }

  renderPage(route, navigator) {
console.log("Components-> AppRoot-> renderPage")
//console.log(route)
//console.log(route.params)
    // 現在のページのpropsがあればpropsを代入する。
    const props = route.props || {};
    // 現在のnavigatorオブジェクトをprops.navigatorに代入する。
    props.navigator = navigator;
    // keyが無いとReactに怒られる為、routeオブジェクトに代入したtitleを一意の値として渡す。
    props.key = route.title;
    // メニュー表示切替メソッドを子供に渡しておく
    props.toggleMenu = this.toggleMenu;

    if(!!route.params){

      route.params["pageType"] = route.component.key


      // 記事ページの場合
      if(route.params.listType === constants.BIKERS_LIST){
        route.params["isSearchConditionAreaShown"] = true
      }

      // 機体ページの場合 かつ 詳細ページの場合
      if(
        /*(route.params.listType === constants.PAGE_TYPE.MACHINE_LIST)
        && */(route.component.key === "DetailPage")
        && (route.params.selectedItem)
      ){

        // パラメータを編集するeditorを挟む
        this.props.editRouteParameter(constants.PAGE_TYPE.MACHINE_LIST, route.params.selectedItem, navigator)
/*
        // 機体ダッシュボード画面に燃費, その他リストの情報を詰め込む
        route.params.selectedItem.nenpi_list = [
          {key: "1524813441112", litter: 10, distance: 240, date: "2018-04-01"},
          {key: "1524813441113", litter: 11, distance: 250, date: "2018-04-02"},
          {key: "1524813441114", litter: 12, distance: 260, date: "2018-04-03"},
          {key: "1524813441115", litter: 13, distance: 320, date: "2018-04-04"},
        ]
        route.params.selectedItem.nenpi_list =
          route.params.selectedItem.nenpi_list.map(v=>{
            return {
              ...v,
              ["nenpi"]: (v.distance || 0) / (v.litter || 1)
            }
          })

        route.params.selectedItem.article_piechart = {
          data: [
            {name: "メンテナンス", count: 5},
            {name: "カスタム", count: 4},
            {name: "ツーリング", count: 12},
            {name: "写真", count: 1},
            {name: "燃費", count: 3},
            {name: "購入品", count: 3},
            {name: "イベント", count: 1},
            {name: "メモ", count: 1},

          ],
          onPieClick: (item, index)=> {

            this.navigator.pushPage(
              {
                component: HeaderPage,
                params: {
                  listType: constants.PAGE_TYPE.BIKERS_LIST,
                  withSearchCondition: true,
                  fixSearchCondition: true,
                  searchCondition: {
                    target: route.params.selectedItem.name,
                    type: (MasterDataManager.getArticleTypeDefArr())[index],
                  }
                }
              }
            )
          }
        }
*/
      }
    }

    // createElementで仮想DOMを作成する。
    //return React.createElement(route.component, props);
    return <route.component key={route.component.key} {...props} title={route.title} params={route.params}  />
  }

  render(){
    return (
      <Splitter>
        <SplitterSide side='left' width={220} collapse={true} swipeable={true} isOpen={this.state.isMenuOpen} onClose={this.hide.bind(this)} onOpen={this.show.bind(this)}>
          <Page>
            <div onClick={()=> this.toggleMenu()} style={{height: "44px"}} className="left toolbar__left">
              <span className="toolbar-button">
                <i className="fa fa-times"></i>
              </span>
            </div>
            <List>
              <ListItem key={HeaderPage.name + "_" + constants.PAGE_TYPE.BIKERS_LIST } onClick={this.loadPage.bind(HeaderPage, constants.PAGE_TYPE.BIKERS_LIST)}  tappable>記事一覧</ListItem>
              <ListItem key={HeaderPage.name + "_" + constants.PAGE_TYPE.MACHINE_LIST} onClick={this.loadPage.bind(HeaderPage, constants.PAGE_TYPE.MACHINE_LIST)} tappable>機体一覧</ListItem>
              <ListItem key={HeaderPage.name + "_" + constants.PAGE_TYPE.MASTER_LIST } onClick={this.loadPage.bind(HeaderPage, constants.PAGE_TYPE.MASTER_LIST)}  tappable>マスタ設定</ListItem>
            </List>
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Navigator
            initialRoute={{ component: TopPage, title: "TopPage" }}
            renderPage={this.renderPage}
            ref={(navigator) => { this.navigator = navigator; }}
          />
        </SplitterContent>

        <Toast isOpen={this.props.AppRoot.toastConf.isShown}>
          <div className="message">
            {this.props.AppRoot.toastConf.msg}
          </div>
          <button >
            Dismiss
          </button>
        </Toast>

      </Splitter>
    );
  }
}

export default AppRoot
