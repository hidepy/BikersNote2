function receiveSomething(data){
  return {
    type: "RECEIVE_SOMETHING",
    somethingdata: data
  }
}

function receiveItems(data){
  return {
    type: ""
  }
}

export default{
  setSomething: (something)=> {
    return {
      type: "THIS IS COMMON SOMETHING ACTION",
      somevalue: something
    }
  },
  searchItems: (params)=> {
    return dispatch=> {
      // localstorageなどから値を取得
      dispatch(receiveItems({}))
    }
  },
  getSomething: ()=> {
    return dispatch=> {
      return fetch("somewhere.com")
        .then(response=> response.json())
        .then(data=> dispatch(receiveSomething(data)))
    }
  }
}
