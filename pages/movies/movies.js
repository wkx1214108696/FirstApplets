// pages/movies/movies.js
//引入公共方法
var utils = require('../../utils/utils.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //正在
    inTheaters: {},
    //即将
    comingSoon: {},
    //前250
    top250: {},
    searchData: {},
    containerShow: true
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
      success: function (res) {
        // console.log(res)
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
        stars: utils.convertToStarsArray(subject.rating.stars),
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
    //这样写会让后续不同模块的传值不好写，所以再嵌套一层，然后使用扩展运算符之后显示的都同一的结果
    //moviesData[key] = movies;
    moviesData[key] = {
      totalTitle: totalTitle,
      movies: movies
    };
    this.setData(moviesData)
  },

  //点击更多
  onMoreTap: function (event) {
    //dataset会将所有的自定义属性中的大写字母转化成小写
    var totalTitle = event.currentTarget.dataset.totaltitle;
    // console.log(event.currentTarget.dataset,totalTitle)
    wx.navigateTo({
      url: 'more-movies/more-movies?totalTitle=' + totalTitle,
    })
  },

  //点解跳转到电影详情页
  onMovieDetailTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  //搜索部分
  onBindFocus: function (event) {
    // console.log(1);
    this.setData({
      containerShow: false
    })
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      //当点击取消时，清空搜索数据
      searchData: {} 
    });
  },

  onBindConfirm: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.douBanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchData", "");
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