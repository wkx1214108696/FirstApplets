//将stars转化为数组
//如果是50 [1,1,1,1,1] 如果是35 [1,1,1,0,0]
function convertToStarsArray(stars) {
  // var num = stars.substring(0, 1); //num是字符串
  var num = stars.slice(0, 1); //num是字符串
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else if (i == +num+1) { //因为num是字符串，所以要先转换为数字+num，再计算
      num < stars/10 ? array.push(2) : array.push(0);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

//获取数据
function getMovieListData (url, callBack) {
  wx.request({
    url: url,
    method: 'get',
    // data: {
    //   count: 12
    // },
    success: function (res) {
      // console.log(res)
      callBack(res.data)
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

//将名字用“/”拼接
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

//将演员的图和名字放一起
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray,
  getMovieListData,
  convertToCastString,
  convertToCastInfos
}