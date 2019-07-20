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
    data: {
      count: 9
    },
    success: function (res) {
      console.log(res)
      callBack(res.data)
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

module.exports = {
  convertToStarsArray,
  getMovieListData
}