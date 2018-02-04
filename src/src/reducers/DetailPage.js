// 初期ステート
const initialAppState = {
  something: [],
}

export default (state = initialAppState, action)=> {
  switch(action.type){
    case "RECEIVE_SOMETHING":{
      return Object.assign({}, state, {
        something: action.something
      })
    }

    default:
      return state
  }
}
