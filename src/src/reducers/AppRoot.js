// 初期ステート
const initialAppState = {
  selectedMachine: {},
  allMachines: [],

  toastConf: {
    isShown: false,
    msg: "",
  }
}

const app = (state = initialAppState, action)=> {
  switch(action.type){
    case "CHANGE_SELECTED_MACHINE":{
      return Object.assign({}, state, {
        selectedMachine: action.selectedMachine
      })
    }
    case "RECEIVE_MACHINES": {
      return Object.assign({}, state, {
        allMachines: action.allMachines
      })
    }
    case "RECEIVE_TOAST_CONF": {
      return Object.assign({}, state, {
        toastConf: {
          isShown: action.isShown,
          msg: action.msg,
        }
      })
    }

    default:
      return state
  }
}

export default app
