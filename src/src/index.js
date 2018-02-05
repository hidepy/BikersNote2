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

  ons.ready(function() {

    ReactDOM.render(
      <Provider store={store}>
        <AppRoot />
      </Provider>,
      document.getElementById("root")
    );
  })
})
