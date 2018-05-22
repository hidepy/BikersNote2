import {connect} from "react-redux"
import App from "../components/AppRoot"
import AppActions from "../actions/AppRoot"

import constants from "../utils/constants"
import LocalStorageManager from "../utils/LocalStorageManager"
import CommonFunc from "../utils/CommonFunc"
import HeaderPage from "../containers/HeaderPage"
import MasterDataManager from "../utils/MasterDataManager"

// stateを繋ぐ
function mapStateToProps(state){
  return state
}

// actionを繋ぐ
function mapDispatchToProps(dispatch){
  return {
    showToast: (msg)=> {
      dispatch(AppActions.showToast(msg))
    },
    editRouteParameter: (pageType, selectedItem, navigator)=> {

      // selectedItemを安全にしておく
      if(!selectedItem){
        selectedItem = {}
      }

      // ページタイプにより編集内容を決定する
      if(pageType === constants.PAGE_TYPE.MACHINE_LIST){

        // 機体ダッシュボード画面に燃費, その他リストの情報を詰め込む
        /*
        selectedItem.nenpi_list = [
          {key: "1524813441112", litter: 10, distance: 240, date: "2018-04-01"},
          {key: "1524813441113", litter: 11, distance: 250, date: "2018-04-02"},
          {key: "1524813441114", litter: 12, distance: 260, date: "2018-04-03"},
          {key: "1524813441115", litter: 13, distance: 320, date: "2018-04-04"},
        ]
        */

        const articles =
          CommonFunc.obj2SortedArr(
            LocalStorageManager.getDataAll(constants.LOCAL_STORAGE_NAME.BIKERS_LIST) || [],
            "key",
            true
          )
            .filter(v=> {
              return v.target === selectedItem.name
            })

        // 燃費情報のみ抽出
        selectedItem.nenpi_list =
          articles
            .filter(v=> {
              return v.type === constants.ARTICLE_TYPE.NENPI
            })
            .map(v=>{
              return {
                ...v,
                ["nenpi"]: (v.distance || 0) / (v.litter || 1)
              }
            })

        // 記事タイプごとカウンタの初期化
        let articleCount = {
          [constants.ARTICLE_TYPE.MAINTAINANCE]: 0,
          [constants.ARTICLE_TYPE.CUSTOM]: 0,
          [constants.ARTICLE_TYPE.TOURING]: 0,
          [constants.ARTICLE_TYPE.PICTURE]: 0,
          [constants.ARTICLE_TYPE.NENPI]: 0,
          [constants.ARTICLE_TYPE.PURCHACE]: 0,
          [constants.ARTICLE_TYPE.EVENT]: 0,
          [constants.ARTICLE_TYPE.MEMO]: 0,
        }

        // 記事種別ごとにカウント
        articles
          .forEach(v=> {

            if(articleCount[v.type] === undefined) return

            articleCount[v.type] += 1
          })

        // 記事割合解析
        selectedItem.article_piechart = {
          data: [
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.MAINTAINANCE], count: articleCount[constants.ARTICLE_TYPE.MAINTAINANCE]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.CUSTOM], count: articleCount[constants.ARTICLE_TYPE.CUSTOM]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.TOURING], count: articleCount[constants.ARTICLE_TYPE.TOURING]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.PICTURE], count: articleCount[constants.ARTICLE_TYPE.PICTURE]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.NENPI], count: articleCount[constants.ARTICLE_TYPE.NENPI]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.PURCHACE], count: articleCount[constants.ARTICLE_TYPE.PURCHACE]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.EVENT], count: articleCount[constants.ARTICLE_TYPE.EVENT]},
            {name: constants.ARTICLE_TYPE_NAME[constants.ARTICLE_TYPE.MEMO], count: articleCount[constants.ARTICLE_TYPE.MEMO]},
          ],
          onPieClick: (item, index)=> {

            //this.navigator.pushPage(
            navigator.pushPage(
              {
                component: HeaderPage,
                params: {
                  listType: constants.PAGE_TYPE.BIKERS_LIST,
                  withSearchCondition: true,
                  fixSearchCondition: true,
                  searchCondition: {
                    target: selectedItem.name,
                    type: (MasterDataManager.getArticleTypeDefArr())[index],
                  }
                }
              }
            )
          }
        }

      }

      return selectedItem
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
