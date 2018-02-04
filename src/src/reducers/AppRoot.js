// 初期ステート
const initialAppState = {
  selectedMachine: {},
  allMachines: [],
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

    default:
      return state
  }
}

export default app
