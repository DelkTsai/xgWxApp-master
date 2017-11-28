// pages/personal/luckNine.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession:"",
    normalLotteryScore:"",//普通抽奖要的积分
    chipLotteryScore:"",//碎片抽奖的积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '九宫格抽奖'
    });
    //获取需要多少积分来抽奖
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        var senddata = {
          "tokenSession": token
        }
        that.setData({
          tokenSession: token
        })
        util.getAjax("/user/baseMsg", senddata, that.baseMsgCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
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
  // 获取需要兑换的积分回调
  baseMsgCallBack:function(json)
  {
    var pieceScore = json.data.chipLotteryScore;
    var normalScore = json.data.normalLotteryScore;
    var that = this;
    that.setData({
        normalLotteryScore: normalScore,
        chipLotteryScore: pieceScore
    });
  },
  // 转跳到抽奖页面
  choujiang:function(e)
  {
    // console.log(e);
    var index = e.currentTarget.dataset.index;
    var score = e.currentTarget.dataset.score;
    wx.navigateTo({
      url: 'luckchou?index='+index+"&score="+score,
    })
  }
})