// pages/posts/posts.js
var postsData = require('../../data/posts-data.js') //导入本地数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },
  //新闻点击切换到详情页
  onPostTap: function(event) {
    // console.log(event)
    //获取到对应的index
    // var index = event.currentTarget.dataset.index;
    var postId = event.currentTarget.dataset.postIde;
    // console.log(index)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId //把postId传给详情页面
    })
  },
  //轮播点击切换到详情页，使用到了事件冒泡给父元素添加事件
  // target当前点击的组件image currentTarget事件捕获的组件swiper,所以此时应使用target
  onSwiperTap: function(event) {
    // var postId = event.currentTarget.dataset.postIde;
    var postId = event.target.dataset.postIde;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //拉取本地模拟的数据
    this.setData({ postKey: postsData.local_database })

    //测试1
    // var post_cpmtent1 = {
    //   date: "Sep 18 2016",
    //   title: "正是虾肥蟹壮时",
    //   imgSrc: "/images/post/crab.png",
    //   avatar: "/images/avatar/1.png",
    //   content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满",
    //   reading: "112",
    //   collection: "96"
    // }
    // this.setData(post_cpmtent1)

    //测试2
    // var postKey = [
    //   {
    //     date: "Sep 18 2016",
    //     title: "正是虾肥蟹壮时",
    //     imgSrc: "/images/post/crab.png",
    //     avatar: "/images/avatar/1.png",
    //     content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满",
    //     reading: "112",
    //     collection: "96"
    //   },
    //   {
    //     title: "比利·林恩的中场故事",
    //     content: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。",
    //     imgSrc: "/images/post/bl.png",
    //     reading: 62,
    //     collection: 92
    //   },
    // ]
    // this.setData(post_cpmtent) //外部无法访问到post_cpmtent
    // this.setData({ postKey: postKey})
    // this.setData({ postKey }) //ES6中的语法

    this.onReadNum();
    
  },

  onReadNum: function() {
    //读取缓存
    var readsNum = wx.getStorageSync('readsNum');
    //判断缓存是否存在 //因为是本地缓存未考虑到用户没有浏览该页面的情况
    if (readsNum) {
      this.setData({
        readsNum
      })
    } else {
      //不存在说明没有被浏览过
      var readsNum = [
        { num: 0 },
        { num: 0 },
        { num: 0 },
        { num: 0 },
        { num: 0 },
        { num: 0 }
      ]
      this.setData({
        readsNum
      })
      wx.setStorageSync('readsNum', readsNum);
    }
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
    // console.log('show');
    this.onReadNum();
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