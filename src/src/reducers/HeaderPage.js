// 初期ステート
const initialAppState = {
  generalList: [],
  generalListDispDef: {},
}

export default (state = initialAppState, action)=> {
  switch(action.type){
    case "RECEIVE_GENERAL_LIST":{
      return Object.assign({}, state, {
        generalList: action.generalList,
        generalListDispDef: action.generalListDispDef,
      })
    }

    default:
      return state
  }
}
