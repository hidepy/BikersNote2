import React, { Component } from 'react'
//import ons from "onsenui"
import  {Page, Navigator, Splitter, SplitterSide, SplitterContent, List, ListItem, } from 'react-onsenui'

import constants from "../utils/constants"
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

    this.hide()

    const currentPage = this.navigator.pages.slice(-1)[0] // --- or [this.navigator.pages.length - 1]

    // Pageにname属性与えておくことが必須のようす。いや、規定であるのか...？
    /*
    if(currentPage.key != (page.name + "_" + pageType)){
      this.navigator.resetPage({ component: page, props: { key: page.name } }, { animation: 'fade' });
    }
    */

console.log("in loadpage")

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
console.log(route)
console.log(route.params)
    // 現在のページのpropsがあればpropsを代入する。
    const props = route.props || {};
    // 現在のnavigatorオブジェクトをprops.navigatorに代入する。
    props.navigator = navigator;
    // keyが無いとReactに怒られる為、routeオブジェクトに代入したtitleを一意の値として渡す。
    props.key = route.title;
    // メニュー表示切替メソッドを子供に渡しておく
    props.toggleMenu = this.toggleMenu;

    if(!!route.params && (route.listType === constants.BIKERS_LIST)){
      route.params["isSearchConditionAreaShown"] = true
    }

    // createElementで仮想DOMを作成する。
    //return React.createElement(route.component, props);
    return <route.component {...props} title={route.title} params={route.params}  />
  }

  render(){
    return (
      <Splitter>
        <SplitterSide side='right' width={220} collapse={true} swipeable={true} isOpen={this.state.isMenuOpen} onClose={this.hide.bind(this)} onOpen={this.show.bind(this)}>
          <Page>
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
      </Splitter>
    );
  }
}

export default AppRoot
