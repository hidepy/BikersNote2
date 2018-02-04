export default class CommonFunc{

  static obj2Arr(obj){
    return
      Object.keys(obj)
        .map(key=> obj[key])
  }

  static sortObjArr(arr, compKey){
    return arr.sort(function(a, b){
      a[compKey] < b[compKey] ? -1
        : a[compKey] > b[compKey] ? 1 : 0
    })
  }

  static obj2SortedArr(obj, compKey){
    return CommonFunc.sortObjArr(CommonFunc.obj2Arr(obj), compKey)
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
