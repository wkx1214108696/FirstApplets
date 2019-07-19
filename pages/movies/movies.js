// pages/movies/movies.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    //正在热映
    var inTheatersUrl = app.globalData.douBanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    //即将上映
    var comingSoonUrl = app.globalData.douBanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    //前250
    var top250Url = app.globalData.douBanBase + "/v2/movie/top250" + "?start=0&count=3";
    //异步的调用
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "前250");
  },

  //获取电影数据
  getMovieListData: function (url, key, totalTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'get',
      data: {
        count: 3
      },
      success: function (res) {
        console.log(res)
        that.processData(res.data, key, totalTitle)
      }
    })
  },

  //处理返回的数据
  processData: function (douDanData, key, totalTitle) {
    var movies = [];
    for (var i in douDanData.subjects) {
      var subject = douDanData.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        // stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    // this.setData({
    //   movies
    // })
    var moviesData = {};
    moviesData[key] = {
      totalTitle: totalTitle,
      movies: movies
    };
    this.setData(moviesData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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