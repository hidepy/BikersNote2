import React, { Component } from 'react'
import ons from "onsenui"
import  {Page, Button, Navigator} from 'react-onsenui'

import HeaderPage from "../containers/HeaderPage"
import TopPage from "../containers/TopPage"

class AppRoot extends Component {

  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this)
    this.renderPage = this.renderPage.bind(this)
  }

  onClick(){
    ons.notification.alert("Hello, World!!")
  }

  renderPage(route, navigator) {

    // 現在のページのpropsがあればpropsを代入する。
    const props = route.props || {};
    // 現在のnavigatorオブジェクトをprops.navigatorに代入する。
    props.navigator = navigator;
    // keyが無いとReactに怒られる為、routeオブジェクトに代入したtitleを一意の値として渡す。
    props.key = route.title;

    props.mytest = "testdesu"

    // createElementで仮想DOMを作成する。
    //return React.createElement(route.component, props);
    return <route.component {...props} title={route.title} params={route.params}  />
  }

  render(){
    return (
      <Navigator
        animation="slide"
        swipeable
        renderPage={this.renderPage}
        initialRoute={{
          title: 'First page',
          component: TopPage//HeaderPage
        }}
      />
    );
  }
}

export default AppRoot
