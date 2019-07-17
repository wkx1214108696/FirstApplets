// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js') //导入本地数据
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    // console.log(postId)
    var postData = postsData.local_database[postId];
    console.log(postData)
    this.setData(postData)
    //异步
    // wx.setStorage({
    //   key: '',
    //   data: '',
    // })
    //同步
    wx.setStorageSync('key', 'wangkaixuan')
  },
  onCollectionTap: function(event) {
    var a = wx.getStorageSync('key');
    console.log(a)
  },
  onShareTap: function(event) {
    wx.removeStorageSync('key');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})