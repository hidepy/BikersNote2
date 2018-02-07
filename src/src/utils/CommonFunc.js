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

  static obj2SortedArr(obj, compKey, isDesc){console.log()
    return CommonFunc.sortObjArr(CommonFunc.obj2Arr(obj), compKey, isDesc)
  }

  static getPicture(){
    return new Promise(function(resolve, reject){
      try{
        navigator.camera.getPicture(
          (base64img)=> {
            //this.state.testImgSrc = "data:image/jpeg;base64," + base64img;
            resolve(base64img)
          },
          function(err){
              alert("error");
              console.log(err)
              reject(err)
          },
          {
              quality: 50,
              destinationType: 0,//Camera.DestinationType.DATA_URL,
              //destinationType: window.Camera.DestinationType.FILE_URI,
              sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
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
