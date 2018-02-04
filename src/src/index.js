import React from 'react';
import ReactDOM from 'react-dom';
import ons from "onsenui"
import {compose, applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import Thunk from "redux-thunk"
import Logger from "redux-logger"

import LocalStorageManager from "./utils/LocalStorageManager"
import constants from "./utils/constants"

// Combine済のreducer(index.js)をimport
import reducer from "./reducers"
// 描画するAppRootコンポーネント(reduxとconnect済)
import AppRoot from './containers/AppRoot';

// OnsenUI用css読込(node_modules参照するんで(=publicでない), このタイミングで読込)
import './../node_modules/onsenui/css/onsenui.css'
import './../node_modules/onsenui/css/onsen-css-components.css'

// Middlewareを通してcreateStoreする(非同期requestと, debug用にstateのloggerを通す)
const finalCreateStore = compose(applyMiddleware(Thunk, Logger))(createStore)

// Middleware通したstoreを使用してreducerからstoreを生成する
const store = finalCreateStore(reducer)

// OnDeviceReadyしてからons-readyする
document.addEventListener(window.device ? 'deviceready' : 'DOMContentLoaded', function(){
  // 色々終わったらonsenのロード待ちしてからAppRootを生成(reduxでラップされた)

//alert("before ons ready")

  ons.ready(function() {

    /*
    window.localStorage[constants.LOCAL_STORAGE_NAME.BIKERS_LIST] = JSON.stringify([
      {
        type: constants.ARTICLE_TYPE.MAINTAINANCE,
        title: "たいとる1",
        date: "2018/02/04",
        comment: "これはコメント",
        img: [],
        url: "",
        place: "",
        price: 1980,
        tag: [],
        part: "",
      },
      {
        type: constants.ARTICLE_TYPE.MAINTAINANCE,
        title: "たいとる2",
        date: "2018/02/03",
        comment: "これはコメント2",
        img: [],
        url: "",
        place: "",
        price: 1980,
        tag: [],
        part: "",
      },
      {
        type: constants.ARTICLE_TYPE.MAINTAINANCE,
        title: "たいとる3",
        date: "2018/02/02",
        comment: "これはコメント3",
        img: [],
        url: "",
        place: "",
        price: 1980,
        tag: [],
        part: "",
      },
    ])*/

//alert("in ons ready")

    ReactDOM.render(
      <Provider store={store}>
        <AppRoot />
      </Provider>,
      document.getElementById("root")
    );
  })
})
