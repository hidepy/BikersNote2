
function receiveItems(list, dispDef){
  return {
    type: "RECEIVE_SOMETHING",
  }
}

export default{
  searchItems: (params)=> {
    return dispatch=> {
      // localstorageなどから値を取得

      dispatch(receiveItems(list, dispDef))
    }
  },
}
