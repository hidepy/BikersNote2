// 初期ステート
const initialAppState = {
  newArticles: [],
  newArticlesDispDef: {},
}

export default (state = initialAppState, action)=> {
  switch(action.type){
    case "RECEIVE_NEW_ARTICLES":{
      return Object.assign({}, state, {
        newArticles: action.articles,
        newArticlesDispDef: action.articlesDispDef,
      })
    }

    default:
      return state
  }
}
