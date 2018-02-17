// 初期ステート
const initialAppState = {
  newArticles: [],
  newArticlesDispDef: {},
  machines: [],
}

export default (state = initialAppState, action)=> {
  switch(action.type){

    case "RECEIVE_MACHINES": {
      return Object.assign({}, state, {
        machines: action.machines,
      })
    }

    case "RECEIVE_NEW_ARTICLES": {
      return Object.assign({}, state, {
        newArticles: action.articles,
        newArticlesDispDef: action.articlesDispDef,
      })
    }

    default:
      return state
  }
}
