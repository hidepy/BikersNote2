export default class CommonFunc{

  static obj2Arr(obj){
      const arr = Object.keys(obj).map(key=> obj[key])
      return arr
  }

  static sortObjArr(arr, compKey, isDesc){
    const adj = isDesc ? -1 : 1
    return (arr || []).sort(function(a, b){
      return a[compKey] < b[compKey] ? -1 * adj
        : a[compKey] > b[compKey] ? 1 * adj : 0
    })
  }

  static obj2SortedArr(obj, compKey, isDesc){
    return CommonFunc.sortObjArr(CommonFunc.obj2Arr(obj), compKey, isDesc)
  }

  //

  // NVリストから、valueに一致するlistのnameを返却する
  static getNameByValue(value, list){

    if(!list) return value

    for(let i = 0; i < list.length; i++){
      if(list[i].value === value){
        return list[i].name
      }
    }

    return value
  }

  // 写真をストレージから取得する
  static getPicture(params){
    return new Promise(function(resolve, reject){
      try{

        if(!params){
          params = {
            destinationType: window.Camera.DestinationType.FILE_URI
          }
        }

        navigator.camera.getPicture(
          (base64img)=> {
            //this.state.testImgSrc = "data:image/jpeg;base64," + base64img;

            // base64の場合は、それを示すプレフィックスをつけておく
            if((params.destinationType || window.Camera.DestinationType.DATA_URL) == window.Camera.DestinationType.DATA_URL){
              base64img = "data:image/jpeg;base64," + base64img
            }

            resolve(base64img)
          },
          function(err){
              reject(err)
          },
          {
              quality: params.quality || 85,
              destinationType: params.destinationType || window.Camera.DestinationType.DATA_URL,
              //destinationType: params.destinationType || window.Camera.DestinationType.FILE_URI,
              sourceType: params.sourceType || navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
              targetWidth: params.targetWidth || window.screen.width,
          }
        )
      }
      catch(e){
        alert("error...")
        console.log(e)
        reject(e)
      }
    })

  }





/*
  static getPicture(){
    navigator.camera.getPicture(function(base64img){
                console.log("success");

                var canvas = document.getElementById("myCanvas");
                var context = canvas.getContext("2d");

                var imageObj = new Image();

                imageObj.onload = function() {
                    context.drawImage(imageObj, 0, 0, 100, 100);
                    var base64= canvas.toDataURL('image/jpg');

                    $scope.sf_picture = base64;
                };

                imageObj.src = base64img;

            },
            function(){
                console.log("error");
            },
            {
                quality: 50,
                //destinationType: Camera.DestinationType.DATA_URL,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
            }
            );
          }
          */
}
