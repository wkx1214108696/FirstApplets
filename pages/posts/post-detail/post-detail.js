var postsData = require('../../../data/posts-data.js') //导入本地数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    //暂停，播放图
    musicImg: '/images/music/music-start.png',
    //头图
    headMusic: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.setData({
      currertPostId: postId
    });
    var postData = postsData.local_database[postId];
    this.setData(postData)

    //解决头图切换未点击时的空白问题
    this.setData({
      headMusic: this.data.headImgSrc
    })

    //异步
    // wx.setStorage({
    //   key: '',
    //   data: '',
    // })
    //同步
    // wx.setStorageSync('key', 'wangkaixuan')
    
    //读取缓存
    var postsCollected = wx.getStorageSync('postsCollected');
    //判断缓存是否存在 //因为是本地缓存未考虑到用户没有浏览该页面的情况
    if (postsCollected) {
      var collected = postsCollected[postId];
      //解决报collected undefined的的小bug
      if (collected) {
        this.setData({
          collected
        })
      }
    } else {
      //不存在说明没有被浏览过
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('postsCollected', postsCollected);
    }

    //监听音乐播放
    var that = this; //回调中this指向的问题
    wx.onBackgroundAudioPlay(function () {
      that.data.isPlayingMusic = true; //加不加这句话都能运行
      that.setData({
        musicImg: '/images/music/music-stop.png',
        headMusic: that.data.music.coverImg
      })
    });
    wx.onBackgroundAudioPause(function () {
      that.data.isPlayingMusic = false;
      that.setData({
        musicImg: '/images/music/music-start.png',
        headMusic: that.data.headImgSrc
      })
    });
  },

  //音乐播放
  onMusicTap: function(event) {
    //在onLoad函数中已经将数据放到了data中
    var music = this.data.music;
    //查看音乐是否播放
    var isPlayingMusic = this.data.isPlayingMusic;

    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.data.isPlayingMusic = false; //没有更新setData中的数据
      // this.data.musicImg = '/images/music/music-stop.png'; //没有更新setData中的数据,所以页面上不会更新。
      this.setData({
        musicImg: '/images/music/music-start.png',
        headMusic: this.data.headImgSrc
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url, //音乐链接，不能使用本地的
        title: music.title, // 音乐标题
        coverImgUrl: music.coverImg //封面
      })
      
      this.data.isPlayingMusic = true;
      // this.data.musicImg = '/images/music/music-stop.png';
      this.setData({
        musicImg: '/images/music/music-stop.png',
        headMusic: music.coverImg
      })
    }
  },

  //收藏和取消收藏
  onCollectionTap: function(event) {
    //同步 小程序中业务简单最好还是用同步的方法，由业务来确定是同步还是异步
    var postsCollected = wx.getStorageSync('postsCollected');
    var collected = postsCollected[this.data.currertPostId];
    //收藏切换
    if (collected) {
      collected = !collected;
      wx.showToast({
        title: '取消收藏',
      })
    } else {
      collected = !collected;
      wx.showToast({
        title: '收藏成功',
      })
    }
    //更新缓存
    postsCollected[this.data.currertPostId] = collected;
    wx.setStorageSync('postsCollected', postsCollected);
    //更新数据绑定
    this.setData({
      collected
    })

    //异步
    //注意success中的this指向
    // var that = this;
    // wx.getStorage({
    //   key: 'postsCollected',
    //   success: function(res) {
    //     var postsCollected = res.data;
    //     var collected = postsCollected[that.data.currertPostId];
    //     //收藏切换
    //     if (collected) {
    //       collected = !collected;
    //       wx.showToast({
    //         title: '收藏成功',
    //       })
    //     } else {
    //       collected = !collected;
    //       wx.showToast({
    //         title: '取消收藏',
    //       })
    //     }
    //     //更新缓存
    //     postsCollected[that.data.currertPostId] = collected;
    //     wx.setStorageSync('postsCollected', postsCollected);
    //     //更新数据绑定
    //     that.setData({
    //       collected
    //     })
    //   },
    // })
  },

  //分享
  onShareTap: function(event) {
    // wx.removeStorageSync('key');
    var itemList = [
      '分享到微信',
      '分享到QQ',
      '分享到朋友圈'
    ]
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        //res.cancel 是否点击了取消按钮
        //res.tapIndex 被点击的元素index
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '为实现此功能',
        })
      }
    })
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