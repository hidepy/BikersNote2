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

function receiveToastConf(isShown, msg){
  return {
    type: "RECEIVE_TOAST_CONF",
    isShown: isShown,
    msg: msg
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
  },
  showToast: (msg, timespan)=> {
    return dispatch=> {
      // Toast表示する
      dispatch(receiveToastConf(true, msg))

      // 一定時間後に非表示する
      setTimeout(()=> {
        dispatch(receiveToastConf(false, ""))
      }, timespan || 3000)
    }
  }
}
