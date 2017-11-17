// myscore.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    scorep:0,//积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        var sendScore = {
          "tokenSession": token
        }
        that.setData({
          "tokenSession": token
        })
        util.getAjax("user/getJF", sendScore, that.scoreCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    wx.setNavigationBarTitle({
      title: '我的积分'
    })
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
  
  },
  // 获取积分的回调
  scoreCallBack:function(json)
  {
    var s = json.data.score;
    var that = this;
    that.setData({
      scorep:s
    });
  },
  //转跳到可兑换优惠券列表
  changeCouponList:function(event)
  {
    var score = event.currentTarget.dataset.score;
    wx.navigateTo({
      url: 'changeCouponList?score='+score
    })
  },
  //转跳到可兑换碎片列表页
  changePieceList:function(event)
  {
    var score = event.currentTarget.dataset.score;
    wx.navigateTo({
      url: 'changePieceList?score=' + score
    })
  }
})