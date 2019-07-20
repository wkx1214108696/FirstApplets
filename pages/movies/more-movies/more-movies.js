// pages/movies/more-movies/more-movies.js
//引入公共方法
var utils = require('../../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取的电影的集合
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var totalTitle = options.totalTitle;
    console.log(totalTitle)
    wx.showNavigationBarLoading();
    //设置当前导航标题
    wx.setNavigationBarTitle({
      title: totalTitle
    });

    var dataUrl = ''
    var getMovieListData = utils.getMovieListData;
    switch (totalTitle) {
      case "正在热映":
        dataUrl = app.globalData.douBanBase + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = app.globalData.douBanBase + "/v2/movie/coming_soon"
        break;
      default:
        dataUrl = app.globalData.douBanBase + "/v2/movie/top250"
    };
    getMovieListData(dataUrl, this.callBack)
  },

  //获取数据后的回调函数
  callBack: function (data) {
    // console.log(data);
    var movies = [];
    for (var i in data.subjects) {
      var subject = data.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies
    })
  },

  // //获取电影数据 //改为公共方法
  // getMovieListData: function (url, key, totalTitle) {
  //   var that = this;
  //   wx.request({
  //     url: url,
  //     method: 'get',
  //     success: function (res) {
  //       // console.log(res)
  //       that.processData(res.data, key, totalTitle)
  //     },
  //     fail: function (error) {
  //       console.log(error);
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})